<template>
  <div class="table-wrapper">
    <el-table
      :data="filteredItems"
      class="responsive-table"
      style="width: 1000px"
    >
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
      <!-- Move to Food Column-->
      <el-table-column v-if="activeTab === 'Not_Food'" label="Move to Food">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.category === 'Not_Food'"
            type="success"
            circle
            icon="el-icon-finished"
            size="mini"
            @click="moveToFood(scope.row)"
          >
          </el-button>
        </template>
      </el-table-column>

      <!-- Editable Price Column -->
      <el-table-column label="Price">
        <template slot-scope="scope">
          <div class="price-scroll-container">
            <el-input-number
              v-model="scope.row.price"
              :min="0"
              :max="10000"
              :step="1"
              size="small"
              @change="updatePrice(scope.row, scope.row.category)"
            />
          </div>
        </template>
      </el-table-column>
      <!-- Info Column-->
      <el-table-column label="Info" width="80">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="hover"
            :open-delay="300"
            :close-delay="200"
          >
            <div>
              <h3>{{ scope.row.name }}</h3>
              <p>Category: {{ scope.row.category }}</p>
              <p>Price: {{ scope.row.price }}</p>
              <p>Date: {{ scope.row.date }}</p>
              <strong>
                Change the name of the item if it doesnt match the name on the
                receipt using the edit name button
              </strong>
              <!-- Add more information as needed -->
            </div>
            <el-button
              slot="reference"
              type="text"
              icon="el-icon-info"
              circle
            ></el-button>
          </el-popover>
        </template>
      </el-table-column>
      <!--Button columns-->
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
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="x-small"
              @click="editItemName(scope.row)"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file
import { Table, TableColumn, Popover, Button } from "element-ui";

const baseUrl = "http://127.0.0.1:8081/api";

export default {
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-popover": Popover,
    "el-button": Button,
  },
  props: {
    activeTab: {
      type: String,
      required: true,
    },
    filteredItems: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {};
  },

  methods: {
    async moveToFood(item) {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const idToken = await currentUser.getIdToken(true);

      const confirmMove = await this.$confirm(
        `Are you sure you want to move "${item.name}" to the Food category?`,
        "Confirm",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
        }
      ).catch(() => false);
      if (!confirmMove) {
        return;
      }
      fetch(baseUrl + "/move_to_food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ itemName: item.name }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.$message.success(data.message);
          this.$emit("item-moved", item);
        })
        .catch((error) => {
          console.error("Error moving item to Food:", error);
          this.$message.error("Failed to move item to Food category");
        });
      alert("Item moved successfully!");
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
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
    async editItemName(item) {
      const newName = await this.$prompt(
        "Enter new name for " + item.name,
        "Edit Item Name",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          inputPattern: /\S+/,
          inputErrorMessage: "Name cannot be empty",
        }
      ).catch(() => null);

      if (newName && newName.value) {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(true);

        fetch(baseUrl + "/update_item_name", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            oldName: item.name,
            newName: newName.value,
            category: item.category,
          }),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to update item name");
            return response.json();
          })
          .then(() => {
            this.$message.success("Item name updated successfully");
            setTimeout(() => location.reload(), 1000);
          })
          .catch((error) => {
            console.error("Error updating item name:", error);
            this.$message.error("Failed to update item name");
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

          .then(() => {
            console.log("Price updated successfully");
            this.Price = "";
            // Add a success message and reload the page
            alert("Price updated successfully!");
            setTimeout(() => {
              location.reload();
            }, 1000); // Reload after 1 second
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
