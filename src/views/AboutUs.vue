<!-- eslint-disable no-undef -->
<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="About us"> </el-page-header>
    </router-link>

    <el-container class="profile-page">
      <el-main class="main-content">
        <el-header>
          <h class="header-title">{{ companyName }}</h>
        </el-header>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="profile-card">
              <div class="profile-card-header">
                <h1>About Us</h1>
              </div>
              <div class="profile-card-body">
                <p>{{ companyDescription }}</p>
              </div>
              <div class="profile-card-header">
                <h1>Contact Us</h1>
              </div>
              <div class="profile-card-body">
                <p><strong>Phone:</strong> {{ companyPhone }}</p>
                <p><Strong>Email:</Strong> {{ companyEmail }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="feedback-card">
              <div class="feedback-card-header">
                <h1>Leave a Feedback</h1>
              </div>
              <div class="feedback-card-body">
                <el-form
                  ref="feedbackForm"
                  :model="feedbackForm"
                  :rules="feedbackRules"
                >
                  <el-form-item label="Name" prop="name">
                    <el-input
                      v-model="feedbackForm.name"
                      placeholder="Name"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                    <el-input
                      v-model="feedbackForm.email"
                      placeholder="Email"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Message" prop="message">
                    <el-input
                      type="textarea"
                      v-model="feedbackForm.message"
                      placeholder="Message"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitFeedback" plain
                      >Submit</el-button
                    >
                    <div v-if="feedbackSent" class="feedback-sent-message">
                      <p>Feedback sent successfully!</p>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
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
        "We are a leading company in the field of technology, providing innovative solutions for our clients.",
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
              message: "Account updated successfully!",
              type: "success",
            });
            this.feedbackSent = true;
          } catch (error) {
            console.error("Error updating account: ", error);
            this.$message({
              message: "Error updating account",
              type: "error",
            });
          }
        }
        this.feedbackForm.name = "";
        this.feedbackForm.email = "";
        this.feedbackForm.message = "";
        console.log("Error: Invalid form");
      });
    },
  },
};
</script>
<style scoped></style>
