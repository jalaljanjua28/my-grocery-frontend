<!-- eslint-disable no-undef -->
<template>
  <div class="about-us-container">
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="About us" class="custom-page-header">
        <template slot="content">
          <div class="page-title">
            <i class="el-icon-info"></i>
            <span>About Us</span>
          </div>
        </template>
      </el-page-header>
    </router-link>

    <el-main class="main-content">
      <!-- Animated header section -->
      <div class="about-header">
        <div class="about-icon-container">
          <i class="el-icon-info about-icon"></i>
        </div>
        <h2 class="about-title">{{ companyName }}</h2>
        <p class="about-subtitle">
          Learn more about our company and how to get in touch with us
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

      <el-row :gutter="20" class="about-content">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card class="about-card">
            <div class="card-header">
              <i class="el-icon-office-building"></i>
              <h3>About Us</h3>
            </div>
            <div class="card-body">
              <p>{{ companyDescription }}</p>
            </div>
            <div class="card-header">
              <i class="el-icon-phone"></i>
              <h3>Contact Us</h3>
            </div>
            <div class="card-body">
              <div class="contact-item">
                <i class="el-icon-mobile-phone"></i>
                <p><strong>Phone:</strong> {{ companyPhone }}</p>
              </div>
              <div class="contact-item">
                <i class="el-icon-message"></i>
                <p><strong>Email:</strong> {{ companyEmail }}</p>
              </div>
              <div class="social-links">
                <a href="#" class="social-link">
                  <i class="el-icon-s-custom"></i>
                </a>
                <a href="#" class="social-link">
                  <i class="el-icon-s-promotion"></i>
                </a>
                <a href="#" class="social-link">
                  <i class="el-icon-s-management"></i>
                </a>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card class="map-card">
            <div class="card-header">
              <i class="el-icon-location"></i>
              <h3>Our Location</h3>
            </div>
            <div class="map-placeholder">
              <i class="el-icon-map-location"></i>
              <p>Interactive map coming soon</p>
            </div>
            <div class="address-info">
              <p>
                <strong>Address:</strong> 123 Grocery Street, Food City, FC
                12345
              </p>
              <p>
                <strong>Hours:</strong> Monday-Friday: 9am-6pm, Saturday:
                10am-4pm
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="feedback-card">
            <div class="card-header">
              <i class="el-icon-chat-dot-round"></i>
              <h3>Leave a Feedback</h3>
            </div>
            <div class="card-body">
              <el-form
                ref="feedbackForm"
                :model="feedbackForm"
                :rules="feedbackRules"
                class="feedback-form"
              >
                <el-form-item label="Name" prop="name">
                  <el-input v-model="feedbackForm.name" placeholder="Your Name">
                    <i slot="prefix" class="el-icon-user"></i>
                  </el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                  <el-input
                    v-model="feedbackForm.email"
                    placeholder="Your Email"
                  >
                    <i slot="prefix" class="el-icon-message"></i>
                  </el-input>
                </el-form-item>
                <el-form-item label="Message" prop="message">
                  <el-input
                    type="textarea"
                    v-model="feedbackForm.message"
                    placeholder="Your Message"
                    :rows="4"
                  ></el-input>
                </el-form-item>
                <el-form-item class="form-actions">
                  <el-button
                    type="primary"
                    @click="submitFeedback"
                    class="submit-button"
                  >
                    <i class="el-icon-s-promotion"></i>
                    Submit Feedback
                  </el-button>
                  <div v-if="feedbackSent" class="feedback-sent-message">
                    <i class="el-icon-success"></i>
                    <p>Feedback sent successfully!</p>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- Our team section -->
      <el-row :gutter="20" class="team-section">
        <el-col :span="24">
          <div class="section-header">
            <i class="el-icon-user"></i>
            <h3>Our Team</h3>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <div class="team-member">
            <div class="member-avatar">
              <i class="el-icon-user-solid"></i>
            </div>
            <h4 class="member-name">John Doe</h4>
            <p class="member-title">Founder & CEO</p>
            <p class="member-bio">
              Passionate about creating innovative grocery solutions.
            </p>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <div class="team-member">
            <div class="member-avatar">
              <i class="el-icon-user-solid"></i>
            </div>
            <h4 class="member-name">Jane Smith</h4>
            <p class="member-title">CTO</p>
            <p class="member-bio">
              Expert in AI and machine learning technologies.
            </p>
          </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <div class="team-member">
            <div class="member-avatar">
              <i class="el-icon-user-solid"></i>
            </div>
            <h4 class="member-name">Mike Johnson</h4>
            <p class="member-title">Lead Developer</p>
            <p class="member-bio">
              Full-stack developer with a passion for user experience.
            </p>
          </div>
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
      feedbackSent: false,
      companyName: "My Grocery Home",
      companyDescription:
        "We are a leading company in the field of technology, providing innovative solutions for our clients. Our grocery management app helps users track their food inventory, reduce waste, and discover new recipes based on the items they have. With advanced OCR technology, we make it easy to scan receipts and automatically add items to your inventory.",
      companyPhone: "0334-9553387",
      companyEmail: "jalaljanjua88@gmail.com",
      feedbackForm: {
        name: "",
        email: "",
        message: "",
      },
      feedbackRules: {
        name: [
          {
            required: true,
            message: "Please input your name",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please enter a valid email address",
            trigger: "blur",
          },
        ],
        message: [
          {
            required: true,
            message: "Please input your message",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async submitFeedback() {
      this.$refs.feedbackForm.validate(async (valid) => {
        if (valid) {
          try {
            // eslint-disable-next-line no-undef
            await axios.post(
              "https://us-central1-my-grocery-home.cloudfunctions.net/addFeedback",
              {
                name: this.feedbackForm.name,
                email: this.feedbackForm.email,
                message: this.feedbackForm.message,
              }
            );
            this.$message({
              message: "Feedback submitted successfully!",
              type: "success",
            });
            this.feedbackSent = true;

            // Reset form after successful submission
            this.feedbackForm.name = "";
            this.feedbackForm.email = "";
            this.feedbackForm.message = "";

            // Hide success message after 5 seconds
            setTimeout(() => {
              this.feedbackSent = false;
            }, 5000);
          } catch (error) {
            console.error("Error submitting feedback: ", error);
            this.$message({
              message: "Error submitting feedback. Please try again.",
              type: "error",
            });
          }
        } else {
          console.log("Error: Invalid form");
        }
      });
    },
  },
};
</script>

<style scoped>
/* Main container styling */
.about-us-container {
  animation: fadeIn 0.5s ease-in-out;
  position: relative;
  min-height: 100vh;
}

/* Background pattern */
.about-us-container:before {
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
.about-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  width: 100%;
  max-width: 800px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.about-icon-container {
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

.about-icon {
  font-size: 40px;
  color: white;
}

.about-title {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 10px;
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

/* About content styling */
.about-content {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 30px;
}

/* Card styling */
.about-card,
.map-card,
.feedback-card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 30px;
  border: none;
}

.about-card:hover,
.map-card:hover,
.feedback-card:hover {
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

.card-body p {
  margin: 0 0 15px;
  line-height: 1.6;
  color: #606266;
}

/* Contact items */
.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.contact-item i {
  font-size: 20px;
  color: #409eff;
  margin-right: 10px;
  min-width: 24px;
}

.contact-item p {
  margin: 0;
}

/* Social links */
.social-links {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f5f7fa;
  border-radius: 50%;
  margin: 0 10px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background-color: #409eff;
  transform: translateY(-3px);
}

.social-link i {
  font-size: 20px;
  color: #409eff;
  transition: all 0.3s ease;
}

.social-link:hover i {
  color: white;
}

/* Map card */
.map-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f5f7fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.map-placeholder i {
  font-size: 40px;
  color: #409eff;
  margin-bottom: 10px;
}

.map-placeholder p {
  margin: 0;
  color: #909399;
}

.address-info {
  padding: 0 20px 20px;
}

.address-info p {
  margin: 0 0 10px;
  line-height: 1.6;
  color: #606266;
}

/* Feedback form */
.feedback-form {
  padding: 0 20px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input__inner {
  border-radius: 8px;
}

.el-textarea__inner {
  border-radius: 8px;
  resize: none;
}

.form-actions {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.submit-button {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.submit-button i {
  margin-right: 8px;
}

.feedback-sent-message {
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: #67c23a;
  animation: fadeIn 0.5s ease-in-out;
}

.feedback-sent-message i {
  font-size: 20px;
  margin-right: 8px;
}

.feedback-sent-message p {
  margin: 0;
}

/* Team section */
.team-section {
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ebeef5;
}

.section-header i {
  font-size: 24px;
  color: #409eff;
  margin-right: 10px;
}

.section-header h3 {
  margin: 0;
  font-size: 22px;
  color: #303133;
}

.team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.member-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: #ecf5ff;
  border-radius: 50%;
  margin-bottom: 15px;
}

.member-avatar i {
  font-size: 40px;
  color: #409eff;
}

.member-name {
  margin: 0 0 5px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.member-title {
  margin: 0 0 10px;
  font-size: 14px;
  color: #409eff;
  font-weight: 500;
}

.member-bio {
  margin: 0;
  text-align: center;
  color: #606266;
  line-height: 1.5;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .about-title {
    font-size: 24px;
  }

  .about-subtitle {
    font-size: 14px;
  }

  .card-header h3 {
    font-size: 18px;
  }

  .card-header i {
    font-size: 20px;
  }

  .social-link {
    width: 35px;
    height: 35px;
  }

  .social-link i {
    font-size: 18px;
  }

  .map-placeholder {
    height: 150px;
  }

  .map-placeholder i {
    font-size: 30px;
  }

  .member-avatar {
    width: 70px;
    height: 70px;
  }

  .member-avatar i {
    font-size: 35px;
  }

  .member-name {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  .main-content {
    padding: 15px 10px;
  }

  .about-header {
    padding: 20px 15px;
  }

  .about-icon-container {
    padding: 15px;
  }

  .about-icon {
    font-size: 30px;
  }

  .about-title {
    font-size: 20px;
  }

  .about-subtitle {
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

  .contact-item i {
    font-size: 18px;
  }

  .social-link {
    width: 30px;
    height: 30px;
    margin: 0 5px;
  }

  .social-link i {
    font-size: 16px;
  }

  .map-placeholder {
    height: 120px;
  }

  .map-placeholder i {
    font-size: 25px;
  }

  .submit-button {
    padding: 10px 20px;
    font-size: 14px;
  }

  .member-avatar {
    width: 60px;
    height: 60px;
  }

  .member-avatar i {
    font-size: 30px;
  }

  .member-name {
    font-size: 15px;
  }

  .member-title {
    font-size: 13px;
  }

  .member-bio {
    font-size: 13px;
  }
}

/* Print styles */
@media print {
  .about-us-container:before {
    display: none;
  }

  .about-header,
  .decorative-food-header,
  .decorative-food-footer,
  .feedback-card,
  .team-section {
    display: none;
  }

  .about-card,
  .map-card {
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

  .contact-item i {
    color: #000;
  }

  .social-links {
    display: none;
  }
}
</style>
