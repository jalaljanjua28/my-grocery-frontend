<template>
  <div class="footer-container">
    <footer class="footer1">
      <div class="footer-decoration top-left">
        <div class="food-icon apple"></div>
        <div class="food-icon carrot"></div>
      </div>

      <div class="container">
        <el-row :gutter="20" style="margin-left: 12px; margin-top: 18px">
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
          action="http://127.0.0.1:8081/api/image-process-upload"
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
axiosInstance.defaults.baseURL = "http://127.0.0.1:8081/api";

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

<style scoped></style>
