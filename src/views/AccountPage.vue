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

<style scoped>
/* Main container styling */
.account-page-container {
  animation: fadeIn 0.5s ease-in-out;
  position: relative;
  min-height: 100vh;
}

/* Background pattern */
.account-page-container:before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.6;
  z-index: -1;
  pointer-events: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Page header styling */
.custom-page-header {
  margin-bottom: 20px;
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.custom-page-header:hover {
  transform: translateY(-2px);
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
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffffc9 !important;
}

/* Header section styling */
.account-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  width: 100%;
  max-width: 800px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.account-icon-container {
  display: inline-block;
  padding: 20px;
  background-color: #409eff;
  border-radius: 50%;
  margin-bottom: 15px;
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.account-icon {
  font-size: 40px;
  color: white;
}

.account-title {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 10px;
}

.account-subtitle {
  font-size: 16px;
  color: #606266;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Decorative food header and footer */
.decorative-food-header,
.decorative-food-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto 30px;
  max-width: 800px;
}

.decorative-food-footer {
  margin: 30px auto 10px;
}

.food-icon {
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.food-icon:hover {
  transform: rotate(15deg) scale(1.2);
  opacity: 1;
}

.apple {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23e74c3c" d="M70,30c0-15-10-25-20-25s-20,10-20,25c-15,0-25,10-25,20s10,20,25,20c0,15,10,25,20,25s20-10,20-25c15,0,25-10,25-20S85,30,70,30z"/><path fill="%2327ae60" d="M50,5c0,0,5,10,0,25h20C70,15,50,5,50,5z"/></svg>');
}

.banana {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23f1c40f" d="M70,20c-20-10-40,0-50,20s-10,40,0,50s40,10,50,0s20-30,10-50S90,30,70,20z"/></svg>');
}

.carrot {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23e67e22" d="M30,10L10,30c20,20,40,40,60,60l20-20C70,50,50,30,30,10z"/><path fill="%2327ae60" d="M30,10c0,0-10,5-10,15s10,15,10,15S40,30,30,10z"/></svg>');
}

.broccoli {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%232ecc71" d="M50,20c-15,0-30,15-30,30h60C80,35,65,20,50,20z"/><path fill="%2327ae60" d="M50,20c0,0-10,10-10,30h20C60,30,50,20,50,20z"/><path fill="%23795548" d="M45,50v40h10V50H45z"/></svg>');
}

.orange {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="%23e67e22" cx="50" cy="50" r="40"/><path fill="%2327ae60" d="M50,10c0,0,5,10,0,20h10C60,15,50,10,50,10z"/></svg>');
}

/* Account content styling */
.account-content {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 30px;
}

.account-column {
  margin-bottom: 20px;
}

/* Card styling */
.account-info-card,
.account-preferences-card,
.account-data-card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 30px;
  border: none;
}

.account-info-card:hover,
.account-preferences-card:hover,
.account-data-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(to right, #ecf5ff, #d7ebff);
  border-bottom: 2px dashed #409eff;
  margin-bottom: 20px;
}

.card-header i {
  font-size: 24px;
  color: #409eff;
  margin-right: 10px;
}

.card-header h3 {
  margin: 0;
  color: #409eff;
  font-size: 20px;
  font-weight: 600;
}

.card-body {
  padding: 0 20px 20px;
}

/* Form styling */
.account-form {
  padding: 0;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input__inner {
  border-radius: 8px;
}

.el-input__prefix {
  color: #409eff;
}

.form-actions {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.update-button {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
}

.update-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.update-button i {
  margin-right: 8px;
}

.update-success-message {
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: #67c23a;
  animation: fadeIn 0.5s ease-in-out;
}

.update-success-message i {
  font-size: 20px;
  margin-right: 8px;
}

/* Preferences styling */
.preferences-section {
  margin-bottom: 25px;
}

.preferences-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}

.preferences-title i {
  font-size: 18px;
  color: #409eff;
  margin-right: 8px;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.preference-item:hover {
  background-color: #ecf5ff;
}

.preference-label {
  font-size: 14px;
  color: #606266;
}

.preferences-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.save-button {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  border: none;
}

.save-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.save-button i {
  margin-right: 8px;
}

/* Data stats styling */
.data-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 25px;
}

.stat-item {
  display: flex;
  align-items: center;
  width: 30%;
  min-width: 120px;
  margin-bottom: 15px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #ecf5ff;
  border-radius: 50%;
  margin-right: 15px;
}

.stat-icon i {
  font-size: 24px;
  color: #409eff;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  line-height: 1;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

.data-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.delete-button,
.export-button {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.delete-button:hover,
.export-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.delete-button i,
.export-button i {
  margin-right: 8px;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .account-title {
    font-size: 24px;
  }

  .account-subtitle {
    font-size: 14px;
  }

  .card-header h3 {
    font-size: 18px;
  }

  .card-header i {
    font-size: 20px;
  }

  .update-button,
  .save-button {
    padding: 10px 20px;
    font-size: 14px;
  }

  .stat-item {
    width: 45%;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
  }

  .stat-icon i {
    font-size: 20px;
  }

  .stat-value {
    font-size: 20px;
  }
}

@media screen and (max-width: 480px) {
  .main-content {
    padding: 15px 10px;
  }

  .account-header {
    padding: 20px 15px;
  }

  .account-icon-container {
    padding: 15px;
  }

  .account-icon {
    font-size: 30px;
  }

  .account-title {
    font-size: 20px;
  }

  .account-subtitle {
    font-size: 13px;
  }

  .card-header {
    padding: 12px 15px;
  }

  .card-header h3 {
    font-size: 16px;
  }

  .card-header i {
    font-size: 18px;
  }

  .card-body {
    padding: 0 15px 15px;
  }

  .update-button,
  .save-button {
    padding: 8px 15px;
    font-size: 13px;
  }

  .update-success-message {
    font-size: 13px;
  }

  .update-success-message i {
    font-size: 16px;
  }

  .preferences-title {
    font-size: 15px;
  }

  .preferences-title i {
    font-size: 16px;
  }

  .preference-item {
    padding: 8px 12px;
  }

  .preference-label {
    font-size: 13px;
  }

  .stat-item {
    width: 100%;
    margin-bottom: 12px;
  }

  .stat-icon {
    width: 35px;
    height: 35px;
  }

  .stat-icon i {
    font-size: 18px;
  }

  .stat-value {
    font-size: 18px;
  }

  .stat-label {
    font-size: 11px;
  }

  .data-actions {
    flex-direction: column;
    gap: 10px;
  }

  .delete-button,
  .export-button {
    width: 100%;
    padding: 8px 15px;
    font-size: 13px;
  }
}

/* Print styles */
@media print {
  .account-page-container:before {
    display: none;
  }

  .account-header,
  .decorative-food-header,
  .decorative-food-footer,
  .account-preferences-card,
  .account-data-card {
    display: none;
  }

  .account-info-card {
    width: 100%;
    margin: 0;
    box-shadow: none;
    page-break-inside: avoid;
  }

  .card-header {
    background: none;
    border-bottom: 1px solid #ddd;
  }

  .card-header i,
  .card-header h3 {
    color: #000;
  }

  .update-button {
    display: none;
  }
}
</style>
