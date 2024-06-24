<template>
  <div></div>
</template>

<script>
import axios from "axios";
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file

// Create a custom Axios instance with a progress event
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL =
  "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api"; // Set your API base URL

export default {
  data() {
    return {
      selectedFile: null,
    };
  },

  methods: {
    async uploadImageProcessDummy(dummyFile = null) {
      const fileToUpload = dummyFile || this.selectedFile;
      console.log("File to upload:", fileToUpload);

      if (fileToUpload) {
        const formData = new FormData();
        formData.append("file", fileToUpload);
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
        console.log("idToken", idToken);
        axiosInstance
          .post("/image-process-upload-create", formData, {
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
            if (error.response) {
              console.log("Response Status:", error.response.status);
              console.log("Response Data:", error.response.data);
            } else {
              console.log("Error Message:", error.message);
            }
          });
      } else {
        console.error(
          "Please select a file to upload and ensure you are logged in."
        );
      }
    },
    simulateUpload() {
      if (this.selectedFile) {
        // If a file is selected, upload it
        this.uploadImageProcessDummy(this.selectedFile);
      } else {
        // If no file is selected, simulate the upload with a dummy file
        const dummyFile = new File(["dummy content"], "dummy.jpg", {
          type: "image/jpeg",
        });
        console.log("Simulating upload with dummy file:", dummyFile);
        this.uploadImageProcessDummy(dummyFile);
        console.log("simulateUpload function called!");
      }
    },
  },
};
// Export the axiosInstance so that it can be used elsewhere
</script>

<style scoped></style>
