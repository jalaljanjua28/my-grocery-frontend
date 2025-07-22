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

          <!-- Show initialization status -->
          <div v-if="initializationStatus" class="initialization-status">
            <div v-if="initializationStatus.loading" class="loading-status">
              <i class="el-icon-loading"></i>
              <span>Setting up your account...</span>
            </div>
            <div
              v-else-if="initializationStatus.success"
              class="success-status"
            >
              <i class="el-icon-check"></i>
              <span>Account setup completed!</span>
              <p>{{ initializationStatus.message }}</p>
            </div>
            <div v-else-if="initializationStatus.error" class="error-status">
              <i class="el-icon-warning"></i>
              <span>Setup encountered issues</span>
              <p>{{ initializationStatus.error }}</p>
              <el-button
                @click="retryInitialization"
                size="small"
                type="warning"
              >
                Retry Setup
              </el-button>
            </div>
          </div>

          <!-- Show file check results -->
          <div v-if="fileCheckResults" class="file-check-results">
            <div class="file-summary">
              <h4>Account Status</h4>
              <p>
                <el-tag
                  :type="
                    fileCheckResults.setup_complete ? 'success' : 'warning'
                  "
                >
                  {{
                    fileCheckResults.setup_complete
                      ? "Setup Complete"
                      : "Setup Incomplete"
                  }}
                </el-tag>
              </p>
              <p>Total Files: {{ fileCheckResults.total_files }}</p>
              <p
                v-if="fileCheckResults.missing_files.count > 0"
                class="warning-text"
              >
                Missing Files: {{ fileCheckResults.missing_files.count }}
              </p>
              <p
                v-if="fileCheckResults.categories.Improper_Location.count > 0"
                class="error-text"
              >
                Files in Wrong Location:
                {{ fileCheckResults.categories.Improper_Location.count }}
              </p>
            </div>
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

          <!-- Main action buttons -->
          <div class="main-buttons">
            <el-button
              @click="$router.push('/')"
              type="primary"
              class="home-button"
            >
              <i class="el-icon-s-home"></i> Go to Home
            </el-button>

            <el-button
              @click="signOut"
              type="danger"
              plain
              class="sign-out-button"
            >
              <i class="el-icon-switch-button"></i> Sign Out
            </el-button>
          </div>

          <!-- Debug/Admin buttons -->
          <div class="admin-section">
            <el-button
              @click="showDebugOptions = !showDebugOptions"
              type="text"
              size="small"
              class="debug-toggle"
            >
              {{ showDebugOptions ? "Hide" : "Show" }} Advanced Options
            </el-button>

            <div v-if="showDebugOptions" class="admin-buttons">
              <div class="button-group">
                <h4>File Management</h4>
                <el-button
                  @click="checkUserFiles"
                  type="info"
                  size="small"
                  plain
                >
                  <i class="el-icon-document"></i> Check Files
                </el-button>
                <el-button
                  @click="createMissingFiles"
                  type="warning"
                  size="small"
                  plain
                >
                  <i class="el-icon-plus"></i> Create Missing Files
                </el-button>
                <el-button
                  @click="initializeComplete"
                  type="primary"
                  size="small"
                  plain
                >
                  <i class="el-icon-refresh"></i> Complete Setup
                </el-button>
                <el-button
                  @click="cleanupUserFiles"
                  type="danger"
                  size="small"
                  plain
                >
                  <i class="el-icon-delete"></i> Cleanup Files
                </el-button>
              </div>
            </div>
          </div>
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
      initializationStatus: null,
      showDebugOptions: false,
      fileCheckResults: null,
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
          // Automatically check files when user is logged in
          this.checkUserFiles();
        } else {
          console.log("No user is logged in");
          this.fileCheckResults = null;
        }
      });
    },

    validateForm() {
      if (!this.email || !this.password) {
        this.errorMessage = "Please fill in all fields";
        return false;
      }
      if (this.password.length < 6) {
        this.errorMessage = "Password must be at least 6 characters";
        return false;
      }
      return true;
    },

    handleAuthError(error) {
      switch (error.code) {
        case "auth/user-not-found":
          this.errorMessage = "No account found with this email";
          break;
        case "auth/wrong-password":
          this.errorMessage = "Incorrect password";
          break;
        case "auth/email-already-in-use":
          this.errorMessage = "Email is already registered";
          break;
        case "auth/weak-password":
          this.errorMessage = "Password is too weak";
          break;
        case "auth/invalid-email":
          this.errorMessage = "Invalid email address";
          break;
        default:
          this.errorMessage = error.message;
      }
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

        // Initialize user account
        await this.initializeUserAccount(user);

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

        // Check if user needs initialization (for existing users)
        await this.checkAndInitializeUser(user);

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

        // Initialize user account
        await this.initializeUserAccount(user);

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
        this.users = [];
        this.fileCheckResults = null;
        this.initializationStatus = null;
        localStorage.removeItem("users");
        this.$message.success("Signed out successfully!");
      } catch (error) {
        console.error("Error signing out:", error);
        this.$message.error("Error signing out");
      }
    },

    async initializeUserAccount(user) {
      this.initializationStatus = {
        loading: true,
        success: false,
        error: null,
        message: "",
      };

      try {
        const idToken = await user.getIdToken();

        // Call the backend to create user folders and files
        const response = await fetch(baseUrl + "/set-email-create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ email: user.email, idToken }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("User initialization result:", result);

        // Ensure complete initialization
        await this.ensureCompleteInitialization(idToken);

        this.initializationStatus = {
          loading: false,
          success: true,
          error: null,
          message: result.message || "Account setup completed successfully!",
        };

        // Check files after initialization
        await this.checkUserFiles();
      } catch (error) {
        console.error("Error initializing user account:", error);
        this.initializationStatus = {
          loading: false,
          success: false,
          error: error.message,
          message: "",
        };
      }
    },

    async checkAndInitializeUser(user) {
      try {
        const idToken = await user.getIdToken();

        // Check if user files exist
        const checkResponse = await fetch(baseUrl + "/check-user-files", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (checkResponse.ok) {
          const checkResult = await checkResponse.json();
          console.log("User files check:", checkResult);
          this.fileCheckResults = checkResult;

          // If user has very few files or setup is incomplete, initialize
          if (checkResult.total_files < 20 || !checkResult.setup_complete) {
            console.log("User needs initialization");
            await this.ensureCompleteInitialization(idToken);
          }
        }
      } catch (error) {
        console.error("Error checking user initialization:", error);
      }
    },

    async ensureCompleteInitialization(idToken) {
      try {
        const response = await fetch(baseUrl + "/initialize-user-complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Complete initialization failed: ${response.status}`);
        }

        const result = await response.json();
        console.log("Complete initialization result:", result);
        return result;
      } catch (error) {
        console.error("Error in complete initialization:", error);
        throw error;
      }
    },

    async retryInitialization() {
      if (this.currentUser) {
        await this.initializeUserAccount(this.currentUser);
      }
    },

    // Debug/Admin methods
    async checkUserFiles() {
      try {
        if (!this.currentUser) return;

        const idToken = await this.currentUser.getIdToken();
        const response = await fetch(baseUrl + "/check-user-files", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log("User files:", result);
          this.fileCheckResults = result;

          const statusMessage = result.setup_complete
            ? `✅ Setup complete! Found ${result.total_files} files`
            : `⚠️ Setup incomplete. ${result.missing_files.count} missing files, ${result.categories.Improper_Location.count} misplaced files`;

          this.$message({
            message: statusMessage,
            type: result.setup_complete ? "success" : "warning",
            duration: 5000,
          });
        } else {
          throw new Error("Failed to check files");
        }
      } catch (error) {
        console.error("Error checking files:", error);
        this.$message.error("Failed to check files");
      }
    },

    async createMissingFiles() {
      try {
        const idToken = await this.currentUser.getIdToken();
        const response = await fetch(
          baseUrl + "/create-missing-chatgpt-files",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Missing files creation result:", result);
          this.$message.success(
            `Created ${result.created_files.length} missing files`
          );
          // Refresh file check
          await this.checkUserFiles();
        } else {
          throw new Error("Failed to create missing files");
        }
      } catch (error) {
        console.error("Error creating missing files:", error);
        this.$message.error("Failed to create missing files");
      }
    },

    async initializeComplete() {
      try {
        const idToken = await this.currentUser.getIdToken();
        const response = await fetch(baseUrl + "/initialize-user-complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Complete initialization result:", result);
          this.$message.success(
            `Setup completed! Created ${result.summary.created} files`
          );
          // Refresh file check
          await this.checkUserFiles();
        } else {
          throw new Error("Failed to complete initialization");
        }
      } catch (error) {
        console.error("Error completing initialization:", error);
        this.$message.error("Failed to complete initialization");
      }
    },

    async cleanupUserFiles() {
      try {
        // Show confirmation dialog
        await this.$confirm(
          "This will delete files that are outside the proper folder structure (ItemsList and ChatGPT folders). Continue?",
          "Cleanup Files",
          {
            confirmButtonText: "Yes, Cleanup",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        );

        const idToken = await this.currentUser.getIdToken();
        const response = await fetch(baseUrl + "/cleanup-user-files", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Cleanup result:", result);
          this.$message.success(
            `Cleanup completed! Deleted ${result.summary.files_deleted} files`
          );
          // Refresh file check
          await this.checkUserFiles();
        } else {
          throw new Error("Failed to cleanup files");
        }
      } catch (error) {
        if (error === "cancel") {
          this.$message.info("Cleanup cancelled");
        } else {
          console.error("Error cleaning up files:", error);
          this.$message.error("Failed to cleanup files");
        }
      }
    },
  },
};
</script>
