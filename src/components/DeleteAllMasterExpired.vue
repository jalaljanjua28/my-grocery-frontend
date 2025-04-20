<template>
  <div>
    <el-button
      @click="deleteAllItems"
      class="deleteallitems"
      type="danger"
      plain
      ><i class="el-icon-delete-solid"> Delete All Items</i>
    </el-button>
  </div>
</template>

<script>
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file
const baseURL = "https://my-grocery-app-888361723877.us-central1.run.app/api";

export default {
  methods: {
    async deleteAllItems() {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      console.log("idToken", idToken);
      // Show a confirmation popup before proceeding
      const userConfirmed = confirm(
        "Are you sure you want to delete all items?"
      );

      if (userConfirmed) {
        // Make an HTTP POST request to your backend
        fetch(baseURL + "/deleteAll/master-expired", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the server if needed
            console.log(data);
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });

        // Show a success message to the user
        alert("All items deleted successfully!");

        // Introduce a delay of 2000 milliseconds (2 seconds) before reloading the page
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.el-button {
  padding: 6px 10px;
  font-size: 12px;
  margin-top: 10px;
}
</style>
