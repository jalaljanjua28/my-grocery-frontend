<template>
  <div class="login-signup-container">
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Login/SignUp" class="custom-page-header">
        <template slot="content">
          <div class="page-title">
            <i class="el-icon-user"></i>
            <span>Login/SignUp</span>
          </div>
        </template>
      </el-page-header>
    </router-link>
    <el-main class="main-content">
      <div class="auth-card">
        <div class="auth-header">
          <h2>{{ isLogin ? "Login" : "Sign Up" }}</h2>
          <p class="auth-toggle">
            {{
              isLogin ? "Don't have an account?" : "Already have an account?"
            }}
            <span @click="isLogin = !isLogin">{{
              isLogin ? "Sign Up" : "Login"
            }}</span>
          </p>
        </div>

        <div v-if="!currentUser" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <el-input
              id="email"
              v-model="email"
              placeholder="Enter your email"
              prefix-icon="el-icon-message"
            ></el-input>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <el-input
              id="password"
              v-model="password"
              placeholder="Enter your password"
              show-password
              prefix-icon="el-icon-lock"
            ></el-input>
            <small v-if="!isLogin" class="password-hint"
              >Password should be at least 6 characters</small
            >
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div class="auth-buttons">
            <el-button
              @click="
                isLogin ? signInWithEmailPassword() : signUpWithEmailPassword()
              "
              type="success"
              :loading="isLoading"
              class="auth-button primary-button"
            >
              {{ isLogin ? "Login with Email" : "Sign up with Email" }}
            </el-button>

            <div class="divider">
              <span>OR</span>
            </div>

            <el-button
              @click="signInWithGoogle"
              type="primary"
              class="auth-button google-button"
              :loading="isGoogleLoading"
            >
              <i class="el-icon-s-promotion"></i>
              {{ isLogin ? "Login with Google" : "Sign Up with Google" }}
            </el-button>
          </div>
        </div>

        <div v-if="users.length > 0 && currentUser" class="user-info">
          <div class="success-message">
            <i class="el-icon-success"></i>
            <span>Successfully signed in!</span>
          </div>

          <div class="user-profile">
            <div class="user-avatar">
              <img
                :src="
                  currentUser.photoURL ||
                  'https://ui-avatars.com/api/?name=' +
                    currentUser.email.charAt(0)
                "
                alt="User avatar"
              />
            </div>
            <div class="user-details">
              <h3>{{ currentUser.displayName || currentUser.email }}</h3>
              <p>{{ currentUser.email }}</p>
            </div>
          </div>

          <el-button
            @click="signOut"
            type="danger"
            plain
            class="sign-out-button"
          >
            <i class="el-icon-switch-button"></i> Sign Out
          </el-button>

          <el-button
            @click="$router.push('/')"
            type="info"
            plain
            class="home-button"
          >
            <i class="el-icon-s-home"></i> Go to Home
          </el-button>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
const baseUrl = "https://my-grocery-app-888361723877.us-central1.run.app/api";

import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../Firebase.js";

export default {
  name: "LoginSignup",
  data() {
    return {
      email: "",
      password: "",
      users: JSON.parse(localStorage.getItem("users")) || [],
      currentUser: null,
      isLogin: false,
      errorMessage: "",
      isLoading: false,
      isGoogleLoading: false,
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.currentUser = user;
          console.log("User is logged in:", user);
        } else {
          console.log("No user is logged in");
        }
      });
    },
    async signUpWithEmailPassword() {
      if (!this.validateForm()) return;

      this.isLoading = true;
      this.errorMessage = "";

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log("User signed up:", user);

        if (!this.users.some((u) => u.uid === user.uid)) {
          this.users.push(user);
          localStorage.setItem("users", JSON.stringify(this.users));
        }

        const idToken = await user.getIdToken();
        await fetch(baseUrl + "/set-email-create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
          },
          body: JSON.stringify({ email: user.email, idToken }),
        });
        this.currentUser = user;
        this.$message.success("Account created successfully!");
      } catch (error) {
        console.error("Error signing up:", error);
        this.handleAuthError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async signInWithEmailPassword() {
      if (!this.validateForm()) return;

      this.isLoading = true;
      this.errorMessage = "";

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log("User signed in:", user);

        if (!this.users.some((u) => u.uid === user.uid)) {
          this.users.push(user);
          localStorage.setItem("users", JSON.stringify(this.users));
        }

        this.currentUser = user;
        this.$message.success("Logged in successfully!");
      } catch (error) {
        console.error("Error signing in:", error);
        this.handleAuthError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async signInWithGoogle() {
      this.isGoogleLoading = true;
      this.errorMessage = "";

      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in with Google:", user);

        if (!this.users.some((u) => u.uid === user.uid)) {
          this.users.push(user);
          localStorage.setItem("users", JSON.stringify(this.users));
        }

        const idToken = await user.getIdToken();
        await fetch(baseUrl + "/set-email-create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
          },
          body: JSON.stringify({ email: user.email, idToken }),
        });
        this.currentUser = user;
        this.$message.success("Signed in with Google successfully!");
      } catch (error) {
        console.error("Error signing in with Google:", error);
        this.handleAuthError(error);
      } finally {
        this.isGoogleLoading = false;
      }
    },
    async signOut() {
      try {
        await firebaseSignOut(auth);
        this.currentUser = null;
        this.$message.success("Signed out successfully");
      } catch (error) {
        console.error("Error signing out:", error);
        this.$message.error("Error signing out");
      }
    },
    validateForm() {
      if (!this.email) {
        this.errorMessage = "Email is required";
        return false;
      }

      if (!this.validateEmail(this.email)) {
        this.errorMessage = "Please enter a valid email address";
        return false;
      }

      if (!this.password) {
        this.errorMessage = "Password is required";
        return false;
      }

      if (!this.isLogin && this.password.length < 6) {
        this.errorMessage = "Password must be at least 6 characters";
        return false;
      }

      return true;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    handleAuthError(error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          this.errorMessage = "This email is already in use";
          break;
        case "auth/invalid-email":
          this.errorMessage = "Invalid email format";
          break;
        case "auth/weak-password":
          this.errorMessage = "Password is too weak";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          this.errorMessage = "Invalid email or password";
          break;
        case "auth/too-many-requests":
          this.errorMessage =
            "Too many failed login attempts. Please try again later";
          break;
        case "auth/popup-closed-by-user":
          this.errorMessage = "Sign in was cancelled";
          break;
        default:
          this.errorMessage = "An error occurred during authentication";
      }
    },
  },
};
</script>

<style scoped></style>
