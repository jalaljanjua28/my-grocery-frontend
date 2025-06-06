<template>
  <div class="table-wrapper">
    <el-table :data="items" class="responsive-table">
      <el-table-column width="100px" label="Image" prop="image">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            :alt="scope.row.name"
            class="table-image"
          />
        </template>
      </el-table-column>
      <el-table-column width="120px" label="Name" prop="name"></el-table-column>
      <el-table-column
        width="100px"
        label="Price"
        prop="price"
      ></el-table-column>
      <el-table-column
        width="100px"
        label="Status"
        prop="status"
      ></el-table-column>
      <el-table-column width="100px" label="Expiry">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span
          ><br />
          <span>{{ scope.row.expiry }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-row v-if="scope.row" style="display: flex; flex-wrap: wrap">
            <el-tooltip content="Add Item" placement="top" effect="light">
              <el-button
                type="text"
                icon="el-icon-plus"
                circle
                class="el-button-add-item"
                @click="addItem(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="Delete Item" placement="top" effect="light">
              <el-button
                type="text"
                icon="el-icon-delete"
                circle
                class="el-button-delete-item"
                @click="deleteItem(scope.row)"
              ></el-button>
            </el-tooltip>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Tooltip } from "element-ui";
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file
const baseUrl = "https://my-grocery-app-888361723877.us-central1.run.app/api";
export default {
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-button": Button,
    "el-tooltip": Tooltip,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      itemName: "",
      selectOptions: [],
    };
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
        fetch(baseUrl + "/addItem/master-expired", {
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
        fetch(baseUrl + "/removeItem/master-expired", {
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
