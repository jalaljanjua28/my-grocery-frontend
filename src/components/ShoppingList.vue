<template>
  <div>
    <el-table :data="items">
      <el-table-column label="Image">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            :alt="scope.row.name"
            style="max-width: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Price" prop="price" />
      <el-table-column label="Status" prop="status" />
      <el-table-column label="Expiry" prop="date">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
          <br />
          <span>{{ scope.row.expiry }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="x-small"
            @click="deleteItem(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file
const baseUrl = "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    async deleteItem(itemToDelete) {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      console.log("idToken", idToken);
      const userConfirmed = confirm("Are you sure you want to delete items?");
      if (userConfirmed) {
        // Send a request to your backend to delete the item by its name
        fetch(baseUrl + "/removeItem/shopping-list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ itemName: itemToDelete.name }),
        })
          .then((response) => {
            if (response.status === 200) {
              console.log(`Item '${itemToDelete.name}' deleted successfully.`);
              this.$emit("item-deleted", itemToDelete);
              alert("Item Deleted successfully!");

              setTimeout(() => {
                location.reload();
              }, 2000);
            } else {
              console.error("Error deleting item.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            this.$message.error("An error occurred");
          });
      }
    },
  },
};
</script>

<style scoped></style>
