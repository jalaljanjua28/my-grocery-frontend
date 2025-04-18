<template>
  <div class="footer-container">
    <footer class="footer1">
      <div class="footer-decoration top-left">
        <div class="food-icon apple"></div>
        <div class="food-icon carrot"></div>
      </div>

      <div class="container">
        <el-row :gutter="20" style="margin-left: 0px; margin-top: 18px">
          <el-col :span="8" class="footer-column">
            <div class="column-header">
              <div class="food-icon tomato"></div>
              <h3>About Us</h3>
            </div>
            <p>
              We are a leading company in the field of technology, providing
              innovative solutions for our clients.
            </p>
          </el-col>
          <el-col :span="8" class="footer-column">
            <div class="column-header">
              <div class="food-icon broccoli"></div>
              <h3>Contact</h3>
            </div>
            <p>House 553, Street 10, F10/2</p>
            <p>Cell: 0334-9553387</p>
          </el-col>
          <el-col :span="8" class="footer-column">
            <div class="column-header">
              <div class="food-icon orange"></div>
              <h3>Follow Us</h3>
            </div>
            <div class="social-links">
              <a
                href="https://www.linkedin.com/company/your-company"
                target="_blank"
                class="social-link"
                ><i class="fab fa-linkedin"></i> LinkedIn</a
              >
              <a
                href="https://twitter.com/your_handle"
                target="_blank"
                class="social-link"
                ><i class="fab fa-twitter"></i> Twitter</a
              >
              <a
                href="https://www.facebook.com/your.page"
                target="_blank"
                class="social-link"
                ><i class="fab fa-facebook"></i> Facebook</a
              >
              <a
                href="https://www.instagram.com/your_account"
                target="_blank"
                class="social-link"
                ><i class="fab fa-instagram"></i> Instagram</a
              >
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="footer-decoration top-right">
        <div class="food-icon banana"></div>
        <div class="food-icon strawberry"></div>
      </div>
    </footer>

    <footer class="footer2">
      <div class="footer-decoration bottom-left">
        <div class="food-icon pineapple"></div>
      </div>

      <div class="footer-actions-container">
        <el-upload
          class="upload-demo"
          action="https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/image-process-upload"
          ref="fileInput"
          :auto-upload="false"
          :on-change="onFileChange"
          accept="image/*"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
            plain
            class="footer-button camera-button"
          >
            <i class="el-icon-camera-solid"></i>
          </el-button>
        </el-upload>
        <el-button
          class="footer-button upload-button"
          size="small"
          type="success"
          plain
          @click="uploadImageProcess"
        >
          <i class="el-icon-upload"></i>
        </el-button>
      </div>

      <div class="status-container">
        <div v-if="showStatus" class="status processing">
          <div class="status-icon"></div>
          <span class="status-text">Image Text-OCR/Upload Processing...</span>
        </div>
        <div v-if="completionStatus" class="status success">
          <div class="status-icon"></div>
          <span class="status-text">Image Uploaded Successfully</span>
        </div>
      </div>

      <div class="footer-decoration bottom-right">
        <div class="food-icon grapes"></div>
      </div>

      <!-- Floating food icons background -->
      <div class="floating-food-icons">
        <div class="floating-icon watermelon"></div>
        <div class="floating-icon peach"></div>
        <div class="floating-icon mango"></div>
        <div class="floating-icon cherry"></div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file

// Create a custom Axios instance with a progress event
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL =
  "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api";

export default {
  components: {},
  data() {
    return {
      showStatus: false,
      completionStatus: false,
      selectedFile: null,
      uploadProgress: 0,
    };
  },
  methods: {
    onFileChange(file) {
      // Verify the structure of the 'file' object
      console.log("File object:", file);
      // Access the file name and store it in 'selectedFile'
      if (file && file.raw && file.raw.name) {
        this.selectedFile = file.raw;
        console.log("File name:", this.selectedFile.name);
        // Generate a URL for the selected file and store it in 'imageSrc'
      } else {
        console.error("Invalid file object:", file);
      }
    },
    async uploadImageProcess() {
      if (this.selectedFile) {
        this.showStatus = true;
        this.completionStatus = false;
        this.uploadProgress = 0;
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        console.log("FormData before sending:", formData.get("file"));
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
        console.log("idToken", idToken);

        // Use the custom Axios instance with a progress event
        axiosInstance
          .post("/image-process-upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${idToken}`,
              "Access-Control-Allow-Origin": "*", // This is not required on client-side normally, server should handle this
              "Access-Control-Allow-Methods": "POST,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type,Authorization",
            },
            onUploadProgress: (progressEvent) => {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            },
          })
          .then((response) => {
            console.log(response.data);
            this.showStatus = false;
            this.completionStatus = true;
            location.reload();
          })
          .catch((error) => {
            console.log(error);
            this.showStatus = false;
            this.completionStatus = false;
            if (error.response) {
              console.log("Response Status:", error.response.status);
              console.log("Response Data:", error.response.data);
            } else {
              console.log("Error Message:", error.message);
            }
          });
      } else {
        this.$message.error("Please select a file to upload.");
      }
    },
    addProduct() {
      // Code to add product
    },
    scanToAdd() {
      // Code to scan and add product
    },
    removeProduct() {
      // Code to remove product
    },
    searchProduct() {
      // Code to search for product
    },
  },
};
</script>

<style scoped>
/* Remove overrides that conflict with global styles */
.el-button--primary.is-plain,
.el-button--success.is-plain {
  width: auto !important;
}

.footer-container {
  position: relative;
}

/* Footer 1 - Main footer with information */
.footer1 {
  position: relative;
  background-color: #f9f9f9;
  padding: 30px 20px;
  border-top: 1px solid #e6e6e6;
  overflow: hidden;
}

/* Add a subtle food pattern background */
.footer1::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.6;
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

/* Footer columns */
.footer-column {
  padding: 0 15px;
}

.column-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.column-header h3 {
  margin: 0 0 0 10px;
  color: #303133;
  font-size: 18px;
}

/* Social links */
.social-links {
  display: flex;
  flex-direction: column;
}

.social-link {
  display: flex;
  align-items: center;
  color: #606266;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #67c23a;
}

.social-link i {
  margin-right: 8px;
}

/* Footer 2 - Action footer */
.footer2 {
  position: relative;
  background-color: #f0f9eb;
  padding: 15px 20px;
  border-top: 1px solid #e1f3d8;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

/* New container for footer actions */
.footer-actions-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 200px; /* Limit the width for better appearance */
  margin: 0 auto;
}

/* Status container */
.status-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Footer buttons */
.footer-button {
  margin: 0 10px;
  border-radius: 50%;
  width: 50px !important;
  height: 50px !important;
  min-width: 50px !important; /* Ensure minimum width */
  max-width: 50px !important; /* Ensure maximum width */
  flex: 0 0 50px !important; /* Fixed width, don't grow or shrink */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0 !important; /* Remove padding to ensure consistent size */
}

.footer-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.camera-button {
  background-color: #ecf5ff;
  border-color: #b3d8ff;
}

.camera-button:hover {
  background-color: #409eff;
  color: white;
}

.upload-button {
  background-color: #f0f9eb;
  border-color: #c2e7b0;
}

.upload-button:hover {
  background-color: #67c23a;
  color: white;
}

/* Status indicators */
.status {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  animation: fadeIn 0.5s ease;
  max-width: 100%;
}

.status-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.processing {
  background-color: #e6a23c1a;
  color: #e6a23c;
  border: 1px solid #e6a23c;
}

.success {
  background-color: #67c23a1a;
  color: #67c23a;
  border: 1px solid #67c23a;
}

.status-icon {
  min-width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}

.processing .status-icon {
  background-color: #e6a23c;
  animation: pulse 1.5s infinite;
}

.success .status-icon {
  background-color: #67c23a;
}

/* Footer decorations */
.footer-decoration {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1;
}

.top-left {
  top: 20px;
  left: 20px;
}

.top-right {
  top: 20px;
  right: 20px;
}

.bottom-left {
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}

.bottom-right {
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

/* Food icons */
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

/* Floating food icons in background */
.floating-food-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.1;
}

/* Position the floating icons */
.watermelon {
  top: 20%;
  left: 30%;
  animation: float 8s ease-in-out infinite;
}

.peach {
  top: 60%;
  left: 40%;
  animation: float 10s ease-in-out infinite;
}

.mango {
  top: 30%;
  left: 70%;
  animation: float 9s ease-in-out infinite;
}

.cherry {
  top: 50%;
  left: 80%;
  animation: float 11s ease-in-out infinite;
}

/* Animations */
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Food icon images */
.apple {
  background-image: url("https://cdn-icons-png.flaticon.com/512/415/415682.png");
}

.banana {
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143693.png");
}

.orange {
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143645.png");
}

.carrot {
  background-image: url("https://cdn-icons-png.flaticon.com/512/1147/1147801.png");
}

.broccoli {
  background-image: url("https://cdn-icons-png.flaticon.com/512/1147/1147809.png");
}

.tomato {
  background-image: url("https://cdn-icons-png.flaticon.com/512/590/590772.png");
}

.strawberry {
  background-image: url("https://cdn-icons-png.flaticon.com/512/2965/2965567.png");
}

.pineapple {
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143640.png");
}

.grapes {
  background-image: url("https://cdn-icons-png.flaticon.com/512/2909/2909761.png");
}

.watermelon {
  background-image: url("https://cdn-icons-png.flaticon.com/512/3143/3143665.png");
}

.peach {
  background-image: url("https://cdn-icons-png.flaticon.com/512/2909/2909838.png");
}

.mango {
  background-image: url("https://cdn-icons-png.flaticon.com/512/1625/1625099.png");
}

.cherry {
  background-image: url("https://cdn-icons-png.flaticon.com/512/590/590775.png");
}

/* Text styling */
p {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 10px;
}

/* Icon styling */
[class*=" el-icon-"],
[class^="el-icon-"] {
  font-size: 24px;
}

/* Upload component styling */
.upload-demo {
  display: inline-block;
}

.el-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.el-upload-list {
  margin: 10px 0;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .footer-decoration {
    display: none;
  }

  .footer1 {
    padding: 20px 15px;
  }

  .footer2 {
    padding: 10px 15px;
  }

  .column-header {
    justify-content: center;
  }

  .footer-column {
    text-align: center;
  }

  .social-links {
    align-items: center;
  }

  .status {
    max-width: 90%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 550px) {
  .floating-food-icons {
    display: none;
  }

  .footer-button {
    width: 45px !important;
    height: 45px !important;
    min-width: 45px !important;
    max-width: 45px !important;
    flex: 0 0 45px !important;
    margin: 0 8px;
  }

  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-size: 20px;
  }

  .status {
    font-size: 12px;
    padding: 6px 10px;
  }

  .status-text {
    max-width: 200px;
  }
  .footer1 {
    display: none;
  }
}

@media screen and (max-width: 350px) {
  .footer-button {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
    max-width: 40px !important;
    flex: 0 0 40px !important;
    margin: 0 5px;
  }

  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-size: 18px;
  }

  .status-text {
    max-width: 150px;
  }
}
</style>
