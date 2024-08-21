<template>
  <div>
    <footer class="footer1">
      <div class="container">
        <el-row :gutter="20" style="margin-left: 0px; margin-top: 18px">
          <el-col :span="8">
            <h>About Us</h>
            <p>
              We are a leading company in the field of technology, providing
              innovative solutions for our clients.
            </p>
          </el-col>
          <el-col :span="8">
            <h>Contact</h>
            <p>House 553, Street 10, F10/2</p>
            <p>Cell: 0334-9553387</p>
          </el-col>
          <el-col :span="8">
            <h>Follow Us</h>
            <p>
              <a
                href="https://www.linkedin.com/company/your-company"
                target="_blank"
                >LinkedIn</a
              >
            </p>
            <p>
              <a href="https://twitter.com/your_handle" target="_blank"
                >Twitter</a
              >
            </p>
            <p>
              <a href="https://www.facebook.com/your.page" target="_blank"
                >Facebook</a
              >
            </p>
            <p>
              <a href="https://www.instagram.com/your_account" target="_blank"
                >Instagram</a
              >
            </p>
            <div class="social-icons">
              <a href="https://www.facebook.com/your.page" target="_blank"
                ><i class="fab fa-facebook"></i
              ></a>
              <a href="https://twitter.com/your_handle" target="_blank"
                ><i class="fab fa-twitter"></i
              ></a>
              <a href="https://www.instagram.com/your_account" target="_blank"
                ><i class="fab fa-instagram"></i
              ></a>
            </div>
          </el-col>
        </el-row>
      </div>
    </footer>
    <footer class="footer2">
      <el-row class="el-button-footer">
        <el-upload
          class="upload-demo"
          action="https://my-grocery-app-hlai3cv5za-uc.a.run.app/api/image-process-upload"
          ref="fileInput"
          :auto-upload="false"
          :on-change="onFileChange"
          accept="image/*"
        >
          <el-button slot="trigger" size="small" type="primary" plain>
            <i class="el-icon-camera-solid"></i>
          </el-button>
        </el-upload>
        <el-button
          style="margin-left: 30px"
          size="small"
          type="success"
          plain
          @click="uploadImageProcess"
        >
          <i class="el-icon-upload"></i>
        </el-button>
        <div v-if="showStatus" class="status">
          Image Text-OCR/Upload Processing...
        </div>
        <div v-if="completionStatus" class="status">
          Image Uploaded Successfully
        </div>
      </el-row>
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
p {
  color: black;
}
[class*=" el-icon-"],
[class^="el-icon-"] {
  font-size: 38px;
}
</style>
