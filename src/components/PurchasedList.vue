<template>
  <div class="table-wrapper">
    <div class="decorative-header">
      <div class="fruit-decoration apple"></div>
      <div class="fruit-decoration banana"></div>
      <div class="fruit-decoration orange"></div>
      <h3 class="table-title">Your Purchased Items</h3>
      <div class="fruit-decoration carrot"></div>
      <div class="fruit-decoration broccoli"></div>
      <div class="fruit-decoration pineapple"></div>
    </div>

    <el-table :data="filteredItems" class="responsive-table">
      <el-table-column width="90px !important" label="Image" prop="image">
        <template slot-scope="scope">
          <div class="image-container">
            <img
              :src="scope.row.image"
              :alt="scope.row.name"
              class="table-image"
            />
            <div
              class="image-overlay"
              :class="
                scope.row.category === 'Food' ? 'food-item' : 'non-food-item'
              "
            ></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="120px !important"
        label="Name"
        prop="name"
      ></el-table-column>
      <!-- Move to Food Column-->
      <el-table-column
        width="120px"
        v-if="activeTab === 'Not_Food'"
        label="Move to Food"
      >
        <template slot-scope="scope">
          <el-tooltip
            content="Move to Food Category"
            placement="top"
            effect="light"
          >
            <el-button
              v-if="scope.row.category === 'Not_Food'"
              type="text"
              circle
              icon="el-icon-finished"
              class="action-button move-button"
              @click="moveToFood(scope.row)"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- Price Column with Dialog -->
      <el-table-column width="120px" label="Price">
        <template slot-scope="scope">
          <div class="price-display">
            <span class="price-value">{{ scope.row.price }}</span>
            <el-tooltip content="Update Price" placement="top" effect="light">
              <el-button
                type="text"
                icon="el-icon-edit-outline"
                circle
                class="action-button update-button"
                @click="openPriceDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <!-- Info Column-->
      <el-table-column label="Info" width="100px">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="hover"
            :open-delay="300"
            :close-delay="200"
          >
            <div class="info-popover">
              <div
                class="info-header"
                :class="
                  scope.row.category === 'Food'
                    ? 'food-header'
                    : 'non-food-header'
                "
              >
                <h3>{{ scope.row.name }}</h3>
              </div>
              <div class="info-content">
                <p>
                  <span class="info-label">Category:</span>
                  {{ scope.row.category }}
                </p>
                <p>
                  <span class="info-label">Price:</span> {{ scope.row.price }}
                </p>
                <p>
                  <span class="info-label">Date:</span> {{ scope.row.date }}
                </p>
                <div class="info-tip">
                  <strong>
                    Change the name of the item if it doesn't match the name on
                    the receipt using the edit name button
                  </strong>
                </div>
              </div>
            </div>
            <el-button
              slot="reference"
              type="text"
              icon="el-icon-info"
              circle
              class="action-button info-button"
            ></el-button>
          </el-popover>
        </template>
      </el-table-column>
      <!--Button columns-->
      <el-table-column>
        <template slot-scope="scope">
          <el-row v-if="scope.row" class="action-buttons">
            <el-tooltip content="Add Item" placement="top" effect="light">
              <el-button
                type="text"
                icon="el-icon-plus"
                circle
                class="action-button add-button"
                @click="addItem(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="Delete Item" placement="top" effect="light">
              <el-button
                type="text"
                icon="el-icon-delete"
                circle
                class="action-button delete-button"
                @click="deleteItem(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="Edit Item Name" placement="top" effect="light">
              <el-button
                type="text"
                icon="el-icon-edit"
                circle
                class="action-button edit-button"
                @click="editItemName(scope.row)"
              ></el-button>
            </el-tooltip>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- Price Update Dialog -->
    <el-dialog
      title="Update Price"
      :visible.sync="priceDialogVisible"
      width="30%"
      center
      class="price-dialog"
    >
      <div class="price-dialog-content">
        <div class="item-info">
          <div class="item-image-container">
            <img
              :src="currentItem.image"
              :alt="currentItem.name"
              class="item-thumbnail"
            />
          </div>
          <div class="item-details">
            <h4>{{ currentItem.name }}</h4>
            <p>Current price: {{ currentItem.price }}</p>
          </div>
        </div>

        <div class="price-input-container">
          <label for="price-input">New Price:</label>
          <el-input
            id="price-input"
            v-model="newPrice"
            type="number"
            placeholder="Enter new price"
            class="price-input"
            @keyup.enter.native="confirmPriceUpdate"
          >
            <template slot="prepend">$</template>
          </el-input>
        </div>

        <div class="price-presets">
          <span class="preset-label">Quick select:</span>
          <div class="preset-buttons">
            <el-button
              v-for="preset in pricePresets"
              :key="preset"
              size="mini"
              @click="newPrice = preset"
              class="preset-button"
            >
              ${{ preset }}
            </el-button>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="priceDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmPriceUpdate">Update</el-button>
      </span>
    </el-dialog>

    <div class="decorative-footer">
      <div class="non-food-decoration book"></div>
      <div class="non-food-decoration cleaning"></div>
      <div class="non-food-decoration electronics"></div>
    </div>
  </div>
</template>

<script>
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file
import {
  Table,
  TableColumn,
  Popover,
  Button,
  Tooltip,
  Dialog,
  Input,
} from "element-ui";

const baseUrl = "https://my-grocery-app-888361723877.us-central1.run.app/api";

export default {
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-popover": Popover,
    "el-button": Button,
    "el-tooltip": Tooltip,
    "el-dialog": Dialog,
    "el-input": Input,
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
    return {
      priceDialogVisible: false,
      currentItem: {},
      newPrice: "",
      pricePresets: [1.99, 2.99, 3.99, 4.99, 9.99],
    };
  },

  methods: {
    openPriceDialog(item) {
      this.currentItem = { ...item };
      this.newPrice = item.price;
      this.priceDialogVisible = true;
    },

    confirmPriceUpdate() {
      if (this.newPrice === "" || isNaN(this.newPrice)) {
        this.$message.error("Please enter a valid price");
        return;
      }

      this.updatePrice(this.currentItem, this.currentItem.category);
      this.priceDialogVisible = false;
    },

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

      fetch(baseUrl + "/update_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          Name: item.name,
          Price: this.newPrice,
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
          this.$message({
            message: "Price updated successfully!",
            type: "success",
            duration: 2000,
          });
          setTimeout(() => {
            location.reload();
          }, 1000); // Reload after 1 second
        })
        .catch((error) => {
          console.error("Error updating price:", error.message);
          this.$message.error("Failed to update price: " + error.message);
        });
    },
  },
};
</script>

<style scoped></style>
