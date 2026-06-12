<template>
  <div class="user-menu-row">
    <el-popover placement="bottom-start" width="230" trigger="hover">
      <template #reference>
        <button class="header-btn user-btn">
          <i class="el-icon-s-custom"></i>
          <span>User</span>
        </button>
      </template>
      <div class="user-popover">
        <h3 class="popover-title">Signed In User</h3>
        <p class="popover-email"><strong>Email:</strong> {{ email || "—" }}</p>
        <el-button
          v-if="currentUser"
          @click="signOut"
          type="danger"
          plain
          size="small"
          style="width:100%;margin-top:8px"
          >Sign Out</el-button
        >
        <el-button
          v-if="!currentUser"
          @click="signInWithGoogle"
          type="primary"
          plain
          size="small"
          style="width:100%;margin-top:8px"
          >Sign in with Google</el-button
        >
      </div>
    </el-popover>

    <router-link to="/SignUp" style="text-decoration: none">
      <button class="header-btn signup-btn">
        <i class="el-icon-user"></i>
        <span>SignUp</span>
      </button>
    </router-link>
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

import { API_BASE_URL as baseUrl } from "@/config.js";

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
.user-menu-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}

.header-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border: 1.5px solid transparent;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.7);
  color: #555;
}

.header-btn:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

.user-btn {
  border-color: rgba(103, 194, 58, 0.4);
  color: #409eff;
}

.user-btn:hover {
  background: rgba(64, 158, 255, 0.08);
  border-color: #409eff;
}

.signup-btn {
  border-color: rgba(230, 57, 70, 0.35);
  color: #e63946;
}

.signup-btn:hover {
  background: rgba(230, 57, 70, 0.07);
  border-color: #e63946;
}

.user-popover {
  padding: 4px 0;
}

.popover-title {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.popover-email {
  font-size: 13px;
  color: #e63946;
  margin: 0 0 4px;
  word-break: break-all;
}
</style>
