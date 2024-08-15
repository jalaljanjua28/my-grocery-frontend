<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Account Page"> </el-page-header>
    </router-link>
    <el-main class="main-content">
      <el-container class="account-page">
        <el-header class="header-title" style="height: 38px">
          My Account
        </el-header>
        <el-main>
          <el-card>
            <el-form class="account-form" :model="form" ref="form">
              <el-form-item label="Username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="Email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateAccount" plain
                  >Update Account</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </el-main>
      </el-container>
    </el-main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async updateAccount() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            await axios.post(
              "https://us-central1-my-grocery-home.cloudfunctions.net/addUser",
              {
                username: this.form.username,
                email: this.form.email,
                password: this.form.password,
              }
            );
            this.$message({
              message: "Account updated successfully!",
              type: "success",
            });
          } catch (error) {
            console.error("Error updating account: ", error);
            this.$message({
              message: "Error updating account",
              type: "error",
            });
          }
          this.username = "";
          this.email = "";
          this.password = "";
        }
      });
    },
  },
};
</script>

<style scoped></style>
