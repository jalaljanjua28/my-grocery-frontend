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
            action="http://localhost:8081/api/image-process-upload"
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
axiosInstance.defaults.baseURL = "http://localhost:8081/api"; // Set your API base URL

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

<style scoped>
/* Main container styling */
.receipt-scan-container {
  animation: fadeIn 0.5s ease-in-out;
  position: relative;
  padding: 20px 0;
  min-height: 100vh;
}

/* Background pattern - fixed z-index and positioning */
.receipt-scan-container:before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.6;
  z-index: -1;
  pointer-events: none; /* Ensures clicks pass through */
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
}

/* Header section styling - improved animation performance */
.scan-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  width: 100%;
  max-width: 800px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  will-change: transform; /* Performance optimization */
}

.scan-icon-container {
  display: inline-block;
  padding: 20px;
  background-color: #409eff;
  border-radius: 50%;
  margin-bottom: 15px;
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.4);
  animation: pulse 2s infinite;
  will-change: transform; /* Performance optimization */
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

.scan-icon {
  font-size: 40px;
  color: white;
}

.scan-title {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 10px;
}

.scan-subtitle {
  font-size: 16px;
  color: #606266;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Upload container styling - improved visual feedback */
.upload-container {
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
}

.upload-area {
  padding: 30px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 2px dashed #c0c4cc;
  transition: all 0.3s ease;
  position: relative;
}

.upload-area:hover {
  border-color: #409eff;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

/* Add a subtle background pattern to the upload area */
.upload-area:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f0f2f5' fill-opacity='0.5' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  border-radius: 13px;
  opacity: 0.3;
  z-index: 0;
  pointer-events: none;
}

.upload-icon {
  font-size: 50px;
  color: #c0c4cc;
  margin-bottom: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.upload-area:hover .upload-icon {
  color: #409eff;
  transform: translateY(-5px);
}

.el-upload__text {
  font-size: 16px;
  color: #606266;
  margin: 10px 0;
  position: relative;
  z-index: 1;
}

.browse-text {
  color: #409eff;
  font-weight: 600;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.browse-text:hover {
  color: #66b1ff;
}

.tip-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  padding: 10px;
  background-color: #f0f9eb;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.tip-container:hover {
  background-color: #e1f3d8;
  transform: translateY(-2px);
}

.tip-icon {
  color: #67c23a;
  margin-right: 8px;
  font-size: 16px;
}

/* Action buttons styling - improved visual feedback */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  position: relative;
  z-index: 1;
}

.action-button {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Add a subtle shine effect on hover */
.action-button:after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.action-button:hover:after {
  opacity: 1;
  animation: shine 1.5s ease;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.compare-button {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
}

.upload-button {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  border: none;
}

/* Status indicators styling - improved visual distinction */
.status-container {
  margin-top: 20px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.status-indicator {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  animation: fadeIn 0.5s ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.status-indicator:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.status-indicator i {
  font-size: 20px;
  margin-right: 10px;
}

.processing {
  background-color: #e6f7ff;
  border-left: 4px solid #1890ff;
  color: #1890ff;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
}

.compare {
  background-color: #f0f9eb;
  border-left: 4px solid #67c23a;
  color: #67c23a;
  box-shadow: 0 2px 8px rgba(103, 194, 58, 0.1);
}

.success {
  background-color: #f0f9eb;
  border-left: 4px solid #67c23a;
  color: #67c23a;
  box-shadow: 0 2px 8px rgba(103, 194, 58, 0.1);
}

/* Preview section styling - improved image handling */
.preview-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.preview-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ebeef5;
}

.preview-title i {
  margin-right: 10px;
  color: #409eff;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.image-preview-container,
.ocr-preview-container {
  flex: 1;
  min-width: 300px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.image-preview-container:hover,
.ocr-preview-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.preview-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.preview-header i {
  font-size: 18px;
  margin-right: 10px;
  color: #409eff;
}

.preview-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.image-frame {
  position: relative;
  padding: 15px;
  height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.image-frame:hover .preview-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 0.1) 100%
  );
  pointer-events: none;
  border-radius: 8px;
}

.ocr-frame {
  padding: 15px;
  height: 400px;
  position: relative;
}

/* Continuing from previous code */
.ocr-text {
  height: calc(100% - 40px);
  overflow-y: auto;
  white-space: pre-wrap;
  font-family: "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  margin: 0;
  scrollbar-width: thin;
  scrollbar-color: #c0c4cc #f8f9fa;
}

/* Custom scrollbar for webkit browsers */
.ocr-text::-webkit-scrollbar {
  width: 8px;
}

.ocr-text::-webkit-scrollbar-track {
  background: #f8f9fa;
  border-radius: 4px;
}

.ocr-text::-webkit-scrollbar-thumb {
  background-color: #c0c4cc;
  border-radius: 4px;
  border: 2px solid #f8f9fa;
}

.ocr-text::-webkit-scrollbar-thumb:hover {
  background-color: #909399;
}

.ocr-controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.copy-button {
  color: #409eff;
  font-weight: 600;
  transition: all 0.3s ease;
}

.copy-button:hover {
  color: #66b1ff;
  transform: translateY(-2px);
}

.copy-button i {
  margin-right: 5px;
  transition: transform 0.3s ease;
}

.copy-button:hover i {
  transform: translateY(-1px);
}

/* Instructions section styling - improved visual hierarchy */
.instructions-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.instructions-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.instructions-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #303133;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ebeef5;
  position: relative;
}

.instructions-title:after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background-color: #409eff;
  transition: width 0.3s ease;
}

.instructions-section:hover .instructions-title:after {
  width: 100px;
}

.instructions-title i {
  margin-right: 10px;
  color: #409eff;
}

.instructions-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.instruction-step {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.instruction-step:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background-color: #ecf5ff;
}

/* Add a subtle pattern to instruction steps */
.instruction-step:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 0;
  pointer-events: none;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #409eff;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border-radius: 50%;
  margin-right: 15px;
  flex-shrink: 0;
  box-shadow: 0 3px 8px rgba(64, 158, 255, 0.3);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.instruction-step:hover .step-number {
  transform: scale(1.1);
  box-shadow: 0 5px 12px rgba(64, 158, 255, 0.4);
}

.step-content {
  position: relative;
  z-index: 1;
}

.step-content h4 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #303133;
  transition: color 0.3s ease;
}

.instruction-step:hover .step-content h4 {
  color: #409eff;
}

.step-content p {
  margin: 0;
  color: #606266;
  line-height: 1.5;
}

/* Upload progress indicator */
.el-progress {
  margin-top: 15px;
}

.el-progress-bar__inner {
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Improved upload component styling */
.upload-demo {
  width: 100%;
}

.el-upload-dragger {
  width: fit-content;
  height: auto;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #d9d9d9;
  border-radius: 10px;
  background-color: #fafafa;
  transition: all 0.3s;
}

.el-upload-dragger:hover {
  border-color: #409eff;
  background-color: #f5f7fa;
}

.el-upload-dragger.is-dragover {
  background-color: rgba(64, 158, 255, 0.1);
  border-color: #409eff;
}

/* Responsive adjustments - improved breakpoints */
@media screen and (max-width: 992px) {
  .scan-title {
    font-size: 26px;
  }

  .scan-subtitle {
    font-size: 15px;
  }

  .instructions-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .scan-title {
    font-size: 24px;
  }

  .scan-subtitle {
    font-size: 14px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 300px;
    margin: 20px auto 0;
  }

  .action-button {
    width: 100%;
  }

  .preview-container {
    flex-direction: column;
  }

  .image-frame,
  .ocr-frame {
    height: 300px;
  }

  .instructions-container {
    grid-template-columns: 1fr;
  }

  /* Reduce animations for better performance on mobile */
  .scan-icon-container {
    animation: pulse 3s infinite;
  }

  .action-button:after {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .main-content {
    padding: 15px 10px;
  }

  .scan-header {
    padding: 20px 15px;
  }

  .scan-icon-container {
    padding: 15px;
  }

  .scan-icon {
    font-size: 30px;
  }

  .scan-title {
    font-size: 20px;
  }

  .scan-subtitle {
    font-size: 13px;
  }

  .upload-area {
    padding: 20px 15px;
  }

  .upload-icon {
    font-size: 40px;
  }

  .image-frame,
  .ocr-frame {
    height: 250px;
  }

  .instruction-step {
    padding: 15px;
  }

  .step-number {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }

  .step-content h4 {
    font-size: 16px;
  }

  .step-content p {
    font-size: 13px;
  }

  .preview-title,
  .instructions-title {
    font-size: 18px;
  }

  .preview-header h4 {
    font-size: 14px;
  }

  /* Disable animations for better performance on low-end devices */
  @media (prefers-reduced-motion: reduce) {
    .receipt-scan-container,
    .preview-section,
    .status-indicator {
      animation: none;
    }

    .scan-icon-container {
      animation: none;
    }

    .instruction-step:hover,
    .image-preview-container:hover,
    .ocr-preview-container:hover,
    .instructions-section:hover,
    .upload-area:hover,
    .status-indicator:hover {
      transform: none;
    }

    .instruction-step:hover .step-number {
      transform: none;
    }

    .image-frame:hover .preview-image {
      transform: none;
    }
  }
}

/* Print styles */
@media print {
  .receipt-scan-container:before {
    display: none;
  }

  .scan-header,
  .upload-container,
  .action-buttons,
  .status-container {
    display: none;
  }

  .preview-section {
    width: 100%;
    margin: 0;
    animation: none;
  }

  .preview-container {
    display: block;
  }

  .image-preview-container,
  .ocr-preview-container {
    width: 100%;
    margin-bottom: 20px;
    box-shadow: none;
    border: 1px solid #ddd;
  }

  .image-frame,
  .ocr-frame {
    height: auto;
  }

  .preview-image {
    max-height: 300px;
  }

  .ocr-controls {
    display: none;
  }

  .instructions-section {
    page-break-before: always;
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
</style>
