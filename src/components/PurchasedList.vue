<template>
  <div>
    <el-table :data="items" class="responsive-table">
      <el-table-column label="Image" prop="image">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            :alt="scope.row.name"
            class="table-image"
          />
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>

      <!-- Editable Price Column -->
      <el-table-column label="Price">
        <template slot-scope="scope">
          <div class="price-scroll-container">
            <el-input-number
              v-model="scope.row.price"
              :min="0"
              :max="10000"
              :step="0.01"
              size="small"
              @change="updatePrice(scope.row, scope.row.category)"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-row
            v-if="scope.row"
            style="display: flex; justify-content: center; flex-wrap: wrap"
          >
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              size="x-small"
              @click="addItem(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="x-small"
              @click="deleteItem(scope.row)"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file
const baseUrl = "http://127.0.0.1:8081/api";

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
    async addItem(itemToAdd) {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      console.log("idToken", idToken);
      const userConfirmed = confirm("Are you sure you want to add items?");
      if (userConfirmed) {
        fetch(baseUrl + "/addItem/purchase-list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ itemName: itemToAdd.name }),
        })
          .then((response) => response.json())
          .then(() => {
            this.itemName = ""; // Clear the input field
          })
          .catch((error) => {
            console.error("Error:", error);
            this.$message({
              message: "An error occurred",
              type: "error",
            });
          });
        alert("Item Added successfully!");
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    },
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
        fetch(baseUrl + "/removeItem/purchase-list", {
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
    async updatePrice(item, category) {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      console.log("idToken", idToken);
      const userConfirmed = confirm(
        "Are you sure you want to update the price?"
      );
      if (userConfirmed) {
        // Use fetch to send the updated price along with the category
        fetch(baseUrl + "/update_price", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            Name: item.name,
            Price: item.price,
            Category: category,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error updating price");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.message); // Handle success message
          })
          .catch((error) => {
            console.error("Error updating price:", error.message);
          });
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 440px) {
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-size: 20px !important;
  }
}
</style>
