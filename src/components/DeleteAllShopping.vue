<template>
  <div>
    <el-button
      @click="deleteAllItems"
      style="
        font-size: x-large;
        background-color: darkcyan;
        border: none;
        padding: 12px;
        color: red;
      "
      ><i class="el-icon-delete-solid"> Delete All Items</i>
    </el-button>
  </div>
</template>

<script>
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file
const baseURL = "http://127.0.0.1:8081/api";

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
        fetch(baseURL + "/deleteAll/shopping-list", {
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
