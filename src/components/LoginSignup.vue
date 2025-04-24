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
const baseUrl = "http://127.0.0.1:8081/api";

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

<style scoped>
/* .custom-page-header {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.page-title {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #303133;
}

.page-title i {
  margin-right: 10px;
  color: #409eff;
  font-size: 28px;
} */
.login-signup-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.login-signup-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.6;
  z-index: -1;
}
.auth-card {
  max-width: 450px;
  margin: 20px auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 30px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.auth-header {
  text-align: center;
  margin-bottom: 25px;
}

.auth-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.auth-toggle {
  color: #666;
  font-size: 14px;
}

.auth-toggle span {
  color: #409eff;
  cursor: pointer;
  font-weight: bold;
  margin-left: 5px;
}

.auth-toggle span:hover {
  text-decoration: underline;
}

.auth-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  text-align: left;
}

.password-hint {
  display: block;
  margin-top: 5px;
  color: #909399;
  font-size: 12px;
  text-align: left;
}

.error-message {
  background-color: #fef0f0;
  color: #f56c6c;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: left;
  font-size: 14px;
  border-left: 3px solid #f56c6c;
}

.auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.auth-button {
  height: 45px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  width: 100%;
}

.primary-button {
  background: linear-gradient(145deg, #67c23a, #4caf50);
  border: none;
  color: white;
}

.primary-button:hover {
  background: linear-gradient(145deg, #4caf50, #67c23a);
  transform: translateY(-2px);
}

.google-button {
  background: white;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.google-button:hover {
  background: #f5f7fa;
  color: #409eff;
  border-color: #c6e2ff;
}

.google-button i {
  margin-right: 8px;
  font-size: 18px;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 5px 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ebeef5;
}

.divider span {
  padding: 0 10px;
  color: #909399;
  font-size: 14px;
}

.user-info {
  text-align: center;
}

.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #67c23a;
  font-size: 16px;
}

.success-message i {
  font-size: 24px;
  margin-right: 8px;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.user-avatar {
  margin-right: 15px;
}

.user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #409eff;
}

.user-details {
  text-align: left;
}

.user-details h3 {
  margin: 0 0 5px 0;
  color: #303133;
  font-size: 18px;
}

.user-details p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.sign-out-button,
.home-button {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  border-radius: 8px;
}

.sign-out-button {
  margin-bottom: 10px;
}

.sign-out-button i,
.home-button i {
  margin-right: 8px;
}

/* Responsive styles */
@media screen and (max-width: 500px) {
  .auth-card {
    margin: 10px;
    padding: 20px;
    width: calc(100% - 20px);
  }

  .auth-header h2 {
    font-size: 24px;
  }

  .user-profile {
    flex-direction: column;
    text-align: center;
  }

  .user-avatar {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .user-details {
    text-align: center;
  }
}

/* Animation for card */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-card {
  animation: fadeIn 0.5s ease-out;
}
</style>
