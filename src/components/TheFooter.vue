<template>
  <div class="footer-wrap">

    <!-- Main footer -->
    <footer class="footer-main">
      <div class="footer-grid">

        <!-- About -->
        <div class="footer-col">
          <div class="col-header">
            <span class="col-icon">🍅</span>
            <h4>About Us</h4>
          </div>
          <p class="col-text">
            A smart grocery management app helping you track, reduce waste, and eat better — powered by AI and built with care.
          </p>
        </div>

        <!-- Contact -->
        <div class="footer-col">
          <div class="col-header">
            <span class="col-icon">📍</span>
            <h4>Contact</h4>
          </div>
          <p class="col-text">House 553, Street 10, F10/2</p>
          <p class="col-text">📞 0334-9553387</p>
        </div>

        <!-- Follow -->
        <div class="footer-col">
          <div class="col-header">
            <span class="col-icon">🌐</span>
            <h4>Follow Us</h4>
          </div>
          <div class="social-links">
            <a href="https://www.linkedin.com/company/your-company" target="_blank" class="social-link linkedin">
              <i class="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="https://twitter.com/your_handle" target="_blank" class="social-link twitter">
              <i class="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://www.facebook.com/your.page" target="_blank" class="social-link facebook">
              <i class="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://www.instagram.com/your_account" target="_blank" class="social-link instagram">
              <i class="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>

      </div>
    </footer>

    <!-- Upload footer -->
    <footer class="footer-upload">
      <div class="upload-area">
        <div class="upload-label">
          <span class="upload-icon">📷</span>
          <span>Upload Receipt Image (OCR)</span>
        </div>

        <div class="upload-controls">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            ref="fileInput"
            :auto-upload="false"
            :on-change="onFileChange"
            accept="image/*"
            :show-file-list="false"
          >
            <el-button slot="trigger" size="small" type="primary" plain class="upload-btn">
              <i class="el-icon-camera-solid"></i> Select Image
            </el-button>
          </el-upload>

          <el-button class="upload-btn" size="small" type="success" plain @click="uploadImageProcess">
            <i class="el-icon-upload2"></i> Upload & Process
          </el-button>
        </div>

        <div class="status-area">
          <div v-if="showStatus" class="status-pill processing">
            <span class="status-dot"></span>
            <span>Processing image via OCR…</span>
          </div>
          <div v-if="completionStatus" class="status-pill success">
            <span class="status-dot"></span>
            <span>Image uploaded successfully ✓</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span class="copyright">© {{ new Date().getFullYear() }} My Grocery Home</span>
        <div class="footer-food-icons">
          <span>🍓</span><span>🍍</span><span>🍇</span><span>🍉</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import axios from "axios";
import { auth } from "../Firebase.js";
import { API_BASE_URL } from "@/config.js";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = API_BASE_URL;

export default {
  data() {
    return {
      showStatus: false,
      completionStatus: false,
      selectedFile: null,
      uploadProgress: 0,
      uploadUrl: API_BASE_URL + "/image-process-upload",
    };
  },
  methods: {
    onFileChange(file) {
      if (file && file.raw && file.raw.name) {
        this.selectedFile = file.raw;
      } else {
        console.error("Invalid file object:", file);
      }
    },
    async uploadImageProcess() {
      if (!this.selectedFile) {
        this.$message.error("Please select a file to upload.");
        return;
      }
      this.showStatus = true;
      this.completionStatus = false;
      this.uploadProgress = 0;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      const currentUser = auth.currentUser;
      if (!currentUser) { this.$message.error("Please log in first."); this.showStatus = false; return; }
      const idToken = await currentUser.getIdToken(true);
      axiosInstance.post("/image-process-upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${idToken}` },
        onUploadProgress: (e) => { this.uploadProgress = Math.round((e.loaded * 100) / e.total); },
      }).then(() => {
        this.showStatus = false;
        this.completionStatus = true;
        setTimeout(() => location.reload(), 1500);
      }).catch((err) => {
        console.error(err);
        this.showStatus = false;
        this.completionStatus = false;
        this.$message.error("Upload failed. Please try again.");
      });
    },
  },
};
</script>

<style scoped>
.footer-wrap {
  margin-top: 40px;
  border-top: 1px solid rgba(103,194,58,0.18);
}

/* ── Main footer ── */
.footer-main {
  background: linear-gradient(
    135deg,
    rgba(27,94,32,0.92) 0%,
    rgba(21,101,192,0.88) 60%,
    rgba(74,20,140,0.85) 100%
  );
  padding: 36px 40px 28px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 960px;
  margin: 0 auto;
}

.footer-col {}

.col-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.col-icon { font-size: 20px; }
.col-header h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: rgba(255,255,255,0.95);
  letter-spacing: 0.3px;
}

.col-text {
  margin: 0 0 6px;
  font-size: 13px;
  color: rgba(255,255,255,0.72);
  line-height: 1.6;
}

/* ── Social links ── */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.social-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.75);
  text-decoration: none;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.07);
  transition: background 0.18s, color 0.18s, border-color 0.18s;
  width: fit-content;
}
.social-link:hover { background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.3); }
.social-link.linkedin:hover { background: rgba(0,119,181,0.3); }
.social-link.twitter:hover  { background: rgba(29,161,242,0.3); }
.social-link.facebook:hover { background: rgba(66,103,178,0.3); }
.social-link.instagram:hover{ background: rgba(193,53,132,0.3); }

/* ── Upload footer ── */
.footer-upload {
  background: linear-gradient(135deg, rgba(243,251,240,0.98), rgba(237,246,255,0.98));
  border-top: 1px solid rgba(103,194,58,0.15);
  padding: 18px 32px 10px;
}

.upload-area {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 600;
  color: #606266;
}
.upload-icon { font-size: 18px; }

.upload-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.upload-btn {
  border-radius: 20px;
  font-size: 13px;
}

/* ── Status pills ── */
.status-area {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: auto;
}
.status-pill {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}
.status-pill.processing {
  background: rgba(64,158,255,0.1);
  color: #409eff;
  border: 1px solid rgba(64,158,255,0.25);
}
.status-pill.success {
  background: rgba(103,194,58,0.1);
  color: #67c23a;
  border: 1px solid rgba(103,194,58,0.25);
}
.status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
  animation: pulse 1.2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

/* ── Footer bottom ── */
.footer-bottom {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 4px;
}
.copyright { font-size: 12px; color: #c0c4cc; }
.footer-food-icons {
  display: flex;
  gap: 10px;
  font-size: 16px;
  opacity: 0.5;
}

/* ── Responsive ── */
@media (max-width: 660px) {
  .footer-grid { grid-template-columns: 1fr; gap: 22px; }
  .footer-main { padding: 24px 20px 20px; }
  .footer-upload { padding: 16px 16px 8px; }
  .upload-area { flex-direction: column; align-items: flex-start; }
  .status-area { margin-left: 0; }
}
</style>
