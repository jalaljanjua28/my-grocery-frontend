<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Barcode Scan"> </el-page-header>
    </router-link>
    <el-main class="main-content">
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:8081/api/image-process-upload"
        ref="fileInput"
        :auto-upload="false"
        :on-change="onFileChange"
        accept="image/*"
      >
        <el-button slot="trigger" size="small" type="primary" plain>
          Select File
        </el-button>
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          plain
          @click="checkProccessedImage"
          >Compare Results</el-button
        >

        <div class="el-upload__tip" slot="tip">
          <p style="color: red; font-size: 14px">
            Use Microsoft Lens for best image quality
          </p>
        </div>
      </el-upload>
      <div style="display: flex">
        <!-- Display Captured Image -->
        <div v-if="imageSrc" class="image-preview">
          <h style="color: red">Captured Image:</h>
          <img
            :src="imageSrc"
            alt="Captured Image"
            style="max-width: 100%; height: 100%"
          />
        </div>

        <!-- Display OCR Extracted Text -->
        <div v-if="ocrText" class="ocr-result">
          <h style="color: red">OCR Extracted Text:</h>
          <pre style="color: black">{{ ocrText }}</pre>
          <!-- Using <pre> to preserve line breaks -->
        </div>
      </div>
      <div v-if="showStatus" class="status">
        Image Text-OCR/Upload Processing...
      </div>
      <div v-if="checkStatus" class="status">
        <strong
          >Compare the result of the image and the extracted OCR and choose the
          best possible image</strong
        >
        <el-button
          style="margin-left: 10px; margin-top: 10px"
          size="small"
          type="success"
          plain
          @click="uploadImageProcess"
        >
          Upload to Server
        </el-button>
      </div>
      <div v-if="completionStatus" class="status">
        <strong>Image Uploaded Successfully</strong>
      </div>
    </el-main>
  </div>
</template>

<script>
import axios from "axios";
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file

// Create a custom Axios instance with a progress event
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "http://127.0.0.1:8081/api"; // Set your API base URL

export default {
  data() {
    return {
      selectedFile: null,
      imageSrc: null, // To store the image URL
      ocrText: "", // To store the OCR extracted text
      showStatus: false,
      checkStatus: false,
      completionStatus: false,
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
        this.imageSrc = URL.createObjectURL(this.selectedFile);
      } else {
        console.error("Invalid file object:", file);
      }
    },
    async checkProccessedImage() {
      if (this.selectedFile) {
        this.showStatus = true;
        this.uploadProgress = 0;
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);

        try {
          const response = await axiosInstance.post("/check-image", formData, {
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
          });
          // Handle the response and display the OCR text
          this.ocrText = response.data.ocrText || "OCR text not found.";
          console.log("OCR Text:", this.ocrText);
        } catch (error) {
          console.error("Error processing image:", error);
        } finally {
          this.showStatus = false;
          this.checkStatus = true;
        }
      } else {
        this.$message.error("Please select a file to upload.");
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
  },
};
</script>

<style scoped>
h {
  display: flex;
  font-weight: bolder;
  font-size: 25px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  color: black;
}
strong {
  font-size: 16px;
  font-weight: bolder;
  color: black;
  margin-top: 10px;
}
.el-button--small {
  padding: 9px 25px;
  font-size: 12px;
  border-radius: 10px;
}
</style>
