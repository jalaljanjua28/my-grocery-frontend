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
            <h4 class="member-name">Jalal Janjua</h4>
            <p class="member-title">Founder & CEO</p>
            <p class="member-bio">
              Passionate about creating innovative grocery solutions.
            </p>
          </div>
        </el-col>

        <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
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
        </el-col> -->

        <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
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
        </el-col> -->
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

<style scoped></style>
