<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="Sign In / Sign Out"></el-page-header>
    </router-link>
    <el-main class="main-content">
      <h2>Login / Signup</h2>
      <div v-if="!currentUser">
        <el-input
          style="margin-bottom: 20px"
          v-model="email"
          placeholder="Email"
        ></el-input>
        <br />
        <el-input
          v-model="password"
          placeholder="Password"
          show-password
          style="margin-bottom: 20px"
        ></el-input>
        <el-button @click="signUpWithEmailPassword"
          >Sign up with Email</el-button
        >
        <el-button @click="signInWithGoogle">Sign in with Google</el-button>
      </div>
      <el-button v-if="currentUser" @click="signOut">Sign Out</el-button>
      <!-- <div v-if="users.length">
        <h3>Switch Users</h3>
        <ul>
          <li v-for="user in users" :key="user.uid">
            <el-button
              style="margin-bottom: 10px"
              @click="switchUser(user.uid)"
              >{{ user.email }}</el-button
            >
          </li>
        </ul>
      </div> -->
    </el-main>
  </div>
</template>

<script>
const baseUrl = "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api";

import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file

export default {
  name: "LoginSignup",
  data() {
    return {
      email: "",
      password: "",
      users: JSON.parse(localStorage.getItem("users")) || [],
      currentUser: null,
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.currentUser = user;
          console.log("User is logged in:", user);
        } else {
          console.log("No user is logged in");
        }
      });
    },
    async signUpWithEmailPassword() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log("User signed up:", user);
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
        console.error("Error signing up:", error);
      }
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
    // async switchUser(uid) {
    //   const user = this.users.find((u) => u.uid === uid);
    //   if (user) {
    //     try {
    //       // Sign out the current user
    //       await auth.signOut();

    //       // Sign in with the new user's credentials
    //       await this.signUpWithEmailPassword();
    //       // await this.signInWithGoogle();

    //       this.currentUser = user;
    //       console.log("Switched to user:", user);

    //       // Update the user data in Firestore
    //       const db = auth.firestore();
    //       await db.collection("users").doc(uid).set({
    //         email: user.email,
    //         // Add any other user data you want to store
    //       });
    //       // Emit an event to update other components
    //     } catch (error) {
    //       console.error("Error switching user:", error);
    //     }
    //   } else {
    //     console.error("User not found");
    //   }
    // },
    async signOut() {
      try {
        await firebaseSignOut(auth);
        this.currentUser = null;
        console.log("User signed out successfully");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  },
};
</script>
