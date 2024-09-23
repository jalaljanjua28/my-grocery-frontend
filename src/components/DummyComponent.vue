<template>
  <div></div>
</template>

<script>
import axios from "axios";
import { auth, onAuthStateChanged } from "../Firebase.js"; // Adjust the path as necessary

// Create a custom Axios instance with a progress event
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL =
  "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api"; // Set your API base URL

export default {
  data() {
    return {
      selectedFile: null,
      currentUser: null, // Track the current user
    };
  },

  mounted() {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;

      // Call the simulateUpload function only after the user is authenticated
      if (user) {
        this.simulateUpload();
      } else {
        console.log("No authenticated user");
      }
    });
  },

  methods: {
    async DummyProcess(dummyFile = null) {
      const fileToUpload = dummyFile || this.selectedFile;
      console.log("File to upload:", fileToUpload);

      if (fileToUpload) {
        const formData = new FormData();
        formData.append("file", fileToUpload);
        const currentUser = this.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
        console.log("idToken", idToken);
        axiosInstance
          .post("/image-process-upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${idToken}`,
            },
          })
          .then((response) => {
            console.log("Response data:", response.data);
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else {
        console.error(
          "Please select a file to upload and ensure you are logged in."
        );
      }
    },
    async simulateUpload() {
      if (this.currentUser) {
        // If a user is already authenticated, simulate the upload
        if (this.selectedFile) {
          // If a file is selected, upload it
          this.DummyProcess(this.selectedFile);
        } else {
          console.log("simulateUpload function called with dummy file!");
          // If no file is selected, simulate the upload with a dummy file
          const dummyFile = new File(["dummy content"], "dummy.jpg", {
            type: "image/jpeg",
          });
          this.DummyProcess(dummyFile);
          console.log("simulateUpload function called!");
        }
      } else {
        console.log("User is not authenticated yet.");
      }
    },
  },
};
</script>

<style scoped></style>
