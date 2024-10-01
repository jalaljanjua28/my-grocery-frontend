<template>
  <div>
    <el-row class="block-col-2">
      <el-col
        :span="12"
        style="display: flex; flex-direction: row; align-items: center"
        ><div
          class="menu-bar"
          style="
            display: flex;
            align-items: center;
            background-color: darkcyan;
            border-radius: 10px;
            padding: 0px 5px;
            border: 2px solid black;
          "
        >
          <el-popover placement="bottom" width="230" trigger="hover">
            <template #reference>
              <el-button
                style="
                  font-size: x-large;
                  background-color: darkcyan;
                  border: none;
                  padding: 0px;
                  color: white;
                "
              >
                <i class="el-icon-s-custom"> User</i>
              </el-button>
            </template>
            <div>
              <h3>Signed In User</h3>
              <p style="color: red"><strong>Email:</strong> {{ email }}</p>
              <el-button
                v-if="currentUser"
                @click="signOut"
                type="danger"
                plain
                size="small"
                >Sign Out</el-button
              >
              <el-button
                v-if="!currentUser"
                @click="signInWithGoogle"
                type="primary"
                plain
                >Sign in with Google</el-button
              >
              <!-- Add more user details here -->
            </div>
          </el-popover>
          <router-link to="/SignUp" style="text-decoration: none">
            <el-button
              style="
                font-size: x-large;
                background-color: darkcyan;
                border: none;
                padding: 12px;
                color: white;
              "
              ><i class="el-icon-user"> SignUp</i></el-button
            >
          </router-link>
          <el-dropdown class="el-dropdown-grid">
            <span class="el-dropdown-link">
              <i class="el-icon-menu"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/account-page" style="text-decoration: none"
                ><el-dropdown-item style="border-bottom: none"
                  ><i class="el-icon-user"></i>Account</el-dropdown-item
                ></router-link
              >
              <router-link to="/shopping-cart" style="text-decoration: none">
                <el-dropdown-item style="border-bottom: none"
                  ><i class="el-icon-shopping-cart-full"></i>Shopping
                  Cart</el-dropdown-item
                ></router-link
              >
              <router-link to="/orders-history" style="text-decoration: none">
                <el-dropdown-item style="border-bottom: none"
                  ><i class="el-icon-takeaway-box"></i>Order
                  History</el-dropdown-item
                ></router-link
              >
              <router-link to="/receipt-scan" style="text-decoration: none">
                <el-dropdown-item style="border-bottom: none"
                  ><i class="el-icon-camera" style="font-size: large"></i
                  >Receipt Scan</el-dropdown-item
                ></router-link
              ><router-link to="/about-us" style="text-decoration: none"
                ><el-dropdown-item style="border-bottom: none"
                  ><i class="el-icon-info"></i>About Us</el-dropdown-item
                ></router-link
              >
              <router-link to="/faqs-page" style="text-decoration: none"
                ><el-dropdown-item style="border-bottom: none"
                  ><i class="el-icon-question"></i>FAQs</el-dropdown-item
                ></router-link
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { auth } from "../Firebase.js";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth"; // Adjust the path as necessary

const baseUrl = "http://127.0.0.1:8081/api";

export default {
  components: {},
  data() {
    return {
      email: "",
      currentUser: null,
    };
  },
  async mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.currentUser = user;
          this.email = user.email;
        } else {
          console.log("No user is logged in");
        }
      });
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in:", user);
        // Add user to the users array if not already present
        if (!this.users.some((u) => u.uid === user.uid)) {
          this.users.push(user);
          localStorage.setItem("users", JSON.stringify(this.users));
        }
        // Send the ID token to the server
        const idToken = await user.getIdToken();
        await fetch(baseUrl + "/set-email-create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
            "Access-Control-Allow-Origin": "*", // This is not required on client-side normally, server should handle this
            "Access-Control-Allow-Methods": "POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
          },
          body: JSON.stringify({ email: user.email, idToken }),
        });
        this.currentUser = user;
      } catch (error) {
        console.error("Error signing in:", error);
      }
    },
    async signOut() {
      try {
        console.log("Attempting to sign out...");
        await firebaseSignOut(auth);
        this.currentUser = null;
        console.log("User signed out successfully");
        console.log("Reloading page...");
        window.location.reload();
      } catch (error) {
        console.error("Error signing out:", error);
        // You can also show an error message to the user here
      }
    },
  },
};
</script>
<style scoped>
.el-col-12 {
  width: 100%;
}
</style>
