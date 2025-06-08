<template>
  <div class="receipt-scan-container">
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Receipt Scan" class="custom-page-header">
        <template slot="content">
          <div class="page-title">
            <i class="el-icon-camera"></i>
            <span>Receipt Scan</span>
          </div>
        </template>
      </el-page-header>
    </router-link>
    <el-main class="main-content">
      <!-- Animated header section -->
      <div class="scan-header">
        <div class="scan-icon-container">
          <i class="el-icon-camera scan-icon"></i>
        </div>
        <h2 class="scan-title">Scan Your Receipt</h2>
        <p class="scan-subtitle">
          Upload a clear image of your receipt to extract items automatically
        </p>
      </div>

      <!-- Upload container with visual enhancements -->
      <div class="upload-container">
        <div class="upload-area">
          <el-upload
            class="upload-demo"
            action="https://my-grocery-app-888361723877.us-central1.run.app/api/image-process-upload"
            ref="fileInput"
            :auto-upload="false"
            :on-change="onFileChange"
            accept="image/*"
            drag
          >
            <i class="el-icon-upload upload-icon"></i>
            <div class="el-upload__text">
              <span>Drop your receipt image here or </span>
              <el-button type="text" class="browse-text">browse</el-button>
            </div>
            <div class="el-upload__tip" slot="tip">
              <div class="tip-container">
                <i class="el-icon-warning-outline tip-icon"></i>
                <span>Use Microsoft Lens for best image quality</span>
              </div>
            </div>
          </el-upload>

          <div class="action-buttons">
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-view"
              class="action-button compare-button"
              @click="checkProccessedImage"
              :loading="isLoading"
            >
              Compare Results
            </el-button>

            <el-button
              v-if="checkStatus"
              size="medium"
              type="success"
              icon="el-icon-upload"
              class="action-button upload-button"
              @click="uploadImageProcess"
            >
              Upload to Server
            </el-button>
          </div>

          <!-- Status indicators -->
          <div class="status-container">
            <div v-if="showStatus" class="status-indicator processing">
              <i class="el-icon-loading"></i>
              <span>Processing image...</span>
            </div>

            <div
              v-if="checkStatus && !showStatus"
              class="status-indicator compare"
            >
              <i class="el-icon-check"></i>
              <span
                >Compare the result of the image and the extracted OCR and
                choose the best possible image</span
              >
            </div>

            <div v-if="completionStatus" class="status-indicator success">
              <i class="el-icon-success"></i>
              <span>Image Uploaded Successfully!</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview section with enhanced styling -->
      <div v-if="imageSrc || ocrText" class="preview-section">
        <h3 class="preview-title">
          <i class="el-icon-document-checked"></i>
          Preview Results
        </h3>

        <div class="preview-container">
          <!-- Image preview with decorative elements -->
          <div v-if="imageSrc" class="image-preview-container">
            <div class="preview-header">
              <i class="el-icon-picture-outline"></i>
              <h4>Captured Image</h4>
            </div>
            <div class="image-frame">
              <img :src="imageSrc" alt="Captured Image" class="preview-image" />
              <div class="image-overlay"></div>
            </div>
          </div>

          <!-- OCR text preview with enhanced styling -->
          <div v-if="ocrText" class="ocr-preview-container">
            <div class="preview-header">
              <i class="el-icon-document"></i>
              <h4>OCR Extracted Text</h4>
            </div>
            <div class="ocr-frame">
              <pre class="ocr-text">{{ ocrText }}</pre>
              <div class="ocr-controls">
                <el-button
                  type="text"
                  icon="el-icon-copy-document"
                  class="copy-button"
                  @click="copyOcrText"
                >
                  Copy Text
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions section -->
      <div class="instructions-section">
        <h3 class="instructions-title">
          <i class="el-icon-info"></i>
          How to get the best results
        </h3>

        <div class="instructions-container">
          <div class="instruction-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Take a clear photo</h4>
              <p>
                Use good lighting and make sure the receipt is flat and fully
                visible
              </p>
            </div>
          </div>

          <div class="instruction-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Use Microsoft Lens</h4>
              <p>
                This app helps to enhance receipt images for better OCR results
              </p>
            </div>
          </div>

          <div class="instruction-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Compare results</h4>
              <p>
                Check the extracted text against your receipt to ensure accuracy
              </p>
            </div>
          </div>

          <div class="instruction-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Upload to server</h4>
              <p>
                When satisfied with the results, upload to add items to your
                inventory
              </p>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import axios from "axios";
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file

// Create a custom Axios instance with a progress event
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL =
  "https://my-grocery-app-888361723877.us-central1.run.app/api"; // Set your API base URL

export default {
  data() {
    return {
      selectedFile: null,
      imageSrc: null, // To store the image URL
      ocrText: "", // To store the OCR extracted text
      showStatus: false,
      checkStatus: false,
      completionStatus: false,
      isLoading: false,
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

        // Reset statuses when new file is selected
        this.checkStatus = false;
        this.completionStatus = false;
        this.ocrText = "";
      } else {
        console.error("Invalid file object:", file);
      }
    },

    copyOcrText() {
      if (this.ocrText) {
        navigator.clipboard
          .writeText(this.ocrText)
          .then(() => {
            this.$message({
              message: "Text copied to clipboard!",
              type: "success",
              duration: 2000,
            });
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
            this.$message.error("Failed to copy text");
          });
      }
    },

    async checkProccessedImage() {
      if (this.selectedFile) {
        this.showStatus = true;
        this.isLoading = true;
        this.uploadProgress = 0;
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
        try {
          const response = await axiosInstance.post(
            "/compare-image",
            formData,
            {
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
            }
          );
          // Handle the response and display the OCR text
          this.ocrText = response.data.ocrText || "OCR text not found.";
          console.log("OCR Text:", this.ocrText);

          // Show success message
          this.$message({
            message: "Image processed successfully!",
            type: "success",
            duration: 2000,
          });
        } catch (error) {
          console.error("Error processing image:", error);
          this.$message.error("Error processing image. Please try again.");
        } finally {
          this.showStatus = false;
          this.checkStatus = true;
          this.isLoading = false;
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

            // Show success message
            this.$message({
              message:
                "Receipt uploaded successfully! Items added to your inventory.",
              type: "success",
              duration: 3000,
            });

            // Redirect to inventory page after successful upload
            setTimeout(() => {
              this.$router.push("/items-inventory");
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
            this.showStatus = false;
            this.completionStatus = false;

            // Show error message
            this.$message.error("Failed to upload receipt. Please try again.");

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

<style scoped></style>
