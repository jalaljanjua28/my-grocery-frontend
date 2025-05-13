<template>
  <div class="account-page-container">
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Account Page" class="custom-page-header">
        <template slot="content">
          <div class="page-title">
            <i class="el-icon-user"></i>
            <span>My Account</span>
          </div>
        </template>
      </el-page-header>
    </router-link>

    <el-main class="main-content">
      <!-- Animated header section -->
      <div class="account-header">
        <div class="account-icon-container">
          <i class="el-icon-user account-icon"></i>
        </div>
        <h2 class="account-title">My Account</h2>
        <p class="account-subtitle">
          Manage your account information and preferences
        </p>
      </div>

      <!-- Decorative food-themed header -->
      <div class="decorative-food-header">
        <div class="food-icon apple"></div>
        <div class="food-icon banana"></div>
        <div class="food-icon carrot"></div>
        <div class="food-icon broccoli"></div>
        <div class="food-icon orange"></div>
      </div>

      <el-row :gutter="20" class="account-content">
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          class="account-column"
        >
          <el-card class="account-info-card">
            <div class="card-header">
              <i class="el-icon-user"></i>
              <h3>Account Information</h3>
            </div>
            <div class="card-body">
              <el-form
                class="account-form"
                :model="form"
                ref="form"
                :rules="formRules"
              >
                <el-form-item label="Username" prop="username">
                  <el-input
                    v-model="form.username"
                    placeholder="Enter your username"
                  >
                    <i slot="prefix" class="el-icon-user-solid"></i>
                  </el-input>
                </el-form-item>

                <el-form-item label="Email" prop="email">
                  <el-input v-model="form.email" placeholder="Enter your email">
                    <i slot="prefix" class="el-icon-message"></i>
                  </el-input>
                </el-form-item>

                <el-form-item label="Password" prop="password">
                  <el-input
                    type="password"
                    v-model="form.password"
                    placeholder="Enter your password"
                    show-password
                  >
                    <i slot="prefix" class="el-icon-lock"></i>
                  </el-input>
                </el-form-item>

                <el-form-item class="form-actions">
                  <el-button
                    type="primary"
                    @click="updateAccount"
                    class="update-button"
                  >
                    <i class="el-icon-refresh"></i>
                    Update Account
                  </el-button>

                  <div v-if="updateSuccess" class="update-success-message">
                    <i class="el-icon-success"></i>
                    <span>Account updated successfully!</span>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>

        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          class="account-column"
        >
          <el-card class="account-preferences-card">
            <div class="card-header">
              <i class="el-icon-setting"></i>
              <h3>Account Preferences</h3>
            </div>
            <div class="card-body">
              <div class="preferences-section">
                <h4 class="preferences-title">
                  <i class="el-icon-bell"></i>
                  Notifications
                </h4>

                <div class="preference-item">
                  <span class="preference-label">Email Notifications</span>
                  <el-switch
                    v-model="preferences.emailNotifications"
                  ></el-switch>
                </div>

                <div class="preference-item">
                  <span class="preference-label">Expiry Alerts</span>
                  <el-switch v-model="preferences.expiryAlerts"></el-switch>
                </div>

                <div class="preference-item">
                  <span class="preference-label">Weekly Reports</span>
                  <el-switch v-model="preferences.weeklyReports"></el-switch>
                </div>
              </div>

              <div class="preferences-section">
                <h4 class="preferences-title">
                  <i class="el-icon-view"></i>
                  Display Settings
                </h4>

                <div class="preference-item">
                  <span class="preference-label">Dark Mode</span>
                  <el-switch v-model="preferences.darkMode"></el-switch>
                </div>

                <div class="preference-item">
                  <span class="preference-label">Compact View</span>
                  <el-switch v-model="preferences.compactView"></el-switch>
                </div>
              </div>

              <div class="preferences-actions">
                <el-button
                  type="primary"
                  @click="savePreferences"
                  class="save-button"
                >
                  <i class="el-icon-check"></i>
                  Save Preferences
                </el-button>
              </div>
            </div>
          </el-card>

          <el-card class="account-data-card">
            <div class="card-header">
              <i class="el-icon-document"></i>
              <h3>Account Data</h3>
            </div>
            <div class="card-body">
              <div class="data-stats">
                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="el-icon-shopping-cart-2"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">24</span>
                    <span class="stat-label">Items Tracked</span>
                  </div>
                </div>

                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="el-icon-camera"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">8</span>
                    <span class="stat-label">Receipts Scanned</span>
                  </div>
                </div>

                <div class="stat-item">
                  <div class="stat-icon">
                    <i class="el-icon-chat-dot-round"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">12</span>
                    <span class="stat-label">Prompts Generated</span>
                  </div>
                </div>
              </div>

              <div class="data-actions">
                <el-button
                  type="danger"
                  plain
                  @click="showDeleteConfirm"
                  class="delete-button"
                >
                  <i class="el-icon-delete"></i>
                  Delete Account
                </el-button>

                <el-button
                  type="warning"
                  plain
                  @click="exportData"
                  class="export-button"
                >
                  <i class="el-icon-download"></i>
                  Export Data
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- Decorative food-themed footer -->
      <div class="decorative-food-footer">
        <div class="food-icon apple"></div>
        <div class="food-icon banana"></div>
        <div class="food-icon carrot"></div>
        <div class="food-icon broccoli"></div>
        <div class="food-icon orange"></div>
      </div>
    </el-main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
      formRules: {
        username: [
          {
            required: true,
            message: "Please enter your username",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "Length should be 3 to 20 characters",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please enter your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please enter a valid email address",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please enter your password",
            trigger: "blur",
          },
          {
            min: 6,
            message: "Password must be at least 6 characters",
            trigger: "blur",
          },
        ],
      },
      preferences: {
        emailNotifications: true,
        expiryAlerts: true,
        weeklyReports: false,
        darkMode: false,
        compactView: false,
      },
      updateSuccess: false,
    };
  },
  methods: {
    async updateAccount() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            await axios.post(
              "https://us-central1-my-grocery-home.cloudfunctions.net/addUser",
              {
                username: this.form.username,
                email: this.form.email,
                password: this.form.password,
              }
            );
            this.$message({
              message: "Account updated successfully!",
              type: "success",
            });
            this.updateSuccess = true;

            // Hide success message after 5 seconds
            setTimeout(() => {
              this.updateSuccess = false;
            }, 5000);
          } catch (error) {
            console.error("Error updating account: ", error);
            this.$message({
              message: "Error updating account",
              type: "error",
            });
          }
        }
      });
    },

    savePreferences() {
      // Simulate saving preferences
      this.$message({
        message: "Preferences saved successfully!",
        type: "success",
      });
    },

    showDeleteConfirm() {
      this.$confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          // Simulate account deletion
          this.$message({
            type: "success",
            message: "Account deleted successfully",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },

    exportData() {
      // Simulate data export
      this.$message({
        message: "Your data is being prepared for download",
        type: "success",
      });

      // Simulate download after 2 seconds
      setTimeout(() => {
        this.$message({
          message: "Data export complete",
          type: "success",
        });
      }, 2000);
    },
  },
};
</script>

<style scoped></style>
