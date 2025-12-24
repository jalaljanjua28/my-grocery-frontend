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
                @click.stop="openPriceDialog(scope.row)"
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
          <el-row v-if="scope.row">
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
    <el-dialog :visible.sync="dialogVisible2" title="Update Price">
      <el-form :model="form">
        <el-form-item label="Item Name">
          <el-input
            v-model="form.item_name"
            placeholder="Enter item name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input
            v-model="form.price"
            placeholder="Enter new price"
            type="number"
            step="0.01"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">Cancel</el-button>
        <el-button type="primary" @click="updatePrice">Update</el-button>
      </div>
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
  Form,
  FormItem,
  Row,
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
    "el-form": Form,
    "el-form-item": FormItem,
    "el-row": Row,
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
      dialogVisible2: false,
      form: {
        item_name: "",
        price: "",
      },
      currentItem: null,
      newPrice: "",
    };
  },

  methods: {
    openPriceDialog(item) {
      console.log("Opening price dialog for:", item); // Debug log
      this.currentItem = { ...item };
      this.form.item_name = item.name || item.Name;
      this.form.price = (item.price || item.Price || "")
        .toString()
        .replace("$", ""); // Remove $ sign for editing
      this.dialogVisible2 = true;
      console.log("Dialog should be visible:", this.dialogVisible2); // Debug log
    },

    // Updated updatePrice function to match nanexpiredlist.vue
    async updatePrice() {
      console.log("Update price called"); // Debug log

      const currentUser = auth.currentUser;
      if (!currentUser) {
        this.$message({
          message: "User not authenticated",
          type: "error",
        });
        return;
      }

      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      const userConfirmed = confirm(
        "Are you sure you want to update the price?"
      );

      if (userConfirmed) {
        const requestData = {
          Name: this.form.item_name,
          Price: parseFloat(this.form.price), // Ensure it's a number
        };

        console.log("Sending request:", requestData); // Debug log

        try {
          const response = await fetch(baseUrl + "/update_price", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(requestData),
          });

          console.log("Response status:", response.status); // Debug log

          if (!response.ok) {
            throw new Error("Error updating price");
          }

          const data = await response.json();
          console.log("Price updated:", data);

          // Update the local item price immediately
          const updatedPrice = `$${parseFloat(this.form.price).toFixed(2)}`;

          // Find and update the item in the filteredItems array
          const itemIndex = this.filteredItems.findIndex(
            (item) => (item.name || item.Name) === this.form.item_name
          );

          if (itemIndex !== -1) {
            // Update the item price locally
            this.$set(this.filteredItems[itemIndex], "price", updatedPrice);
            this.$set(this.filteredItems[itemIndex], "Price", updatedPrice);
            console.log("Local price updated to:", updatedPrice);
          }

          // Emit event to parent component to update its data
          this.$emit("price-updated", {
            itemName: this.form.item_name,
            newPrice: updatedPrice,
          });

          this.dialogVisible2 = false;
          this.$message({
            message: `Price updated successfully to ${updatedPrice}!`,
            type: "success",
          });

          // Reset form
          this.form.item_name = "";
          this.form.price = "";
          this.currentItem = null;

          // Optional: Reload after a delay if needed
          // setTimeout(() => {
          //   location.reload();
          // }, 1500);
        } catch (error) {
          console.error("Error updating price:", error.message);
          this.$message({
            message: "An error occurred while updating price: " + error.message,
            type: "error",
          });
        }
      }
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
      try {
        // Check authentication state first
        const isAuthenticated = await this.checkAuthState();
        if (!isAuthenticated) {
          this.$message({
            message: "Please log in first",
            type: "error",
            duration: 3000,
            showClose: true,
          });
          return;
        }

        const newName = await this.$prompt(
          `Enter new name for "${item.name}":`,
          "Edit Item Name",
          {
            confirmButtonText: "Update",
            cancelButtonText: "Cancel",
            inputPattern: /^.{1,50}$/,
            inputErrorMessage: "Name must be between 1-50 characters",
            inputValue: item.name,
          }
        );

        if (newName.value && newName.value.trim() !== item.name) {
          await this.updateItemName(item, newName.value.trim());
        }
      } catch (error) {
        console.error("Edit item name error:", error);
        this.$message({
          message: "Name update cancelled",
          type: "info",
          duration: 2000,
          showClose: true,
        });
      }
    },

    async updateItemName(item, newName) {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        this.$message({
          message: "Please log in to continue",
          type: "error",
          duration: 3000,
          showClose: true,
        });
        return;
      }

      try {
        const idToken = await currentUser.getIdToken(true);
        const response = await fetch(baseUrl + "/update_item_name", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            itemName: item.name,
            newName: newName,
            category: item.category,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          this.$message({
            message: `Item name updated from "${item.name}" to "${newName}" successfully!`,
            type: "success",
            duration: 4000,
            showClose: true,
          });

          // Update local item name
          item.name = newName;

          // Reload after a short delay
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          throw new Error(data.error || "Failed to update item name");
        }
      } catch (error) {
        console.error("Error updating item name:", error);
        this.$message({
          message: `Failed to update item name: ${error.message}`,
          type: "error",
          duration: 5000,
          showClose: true,
        });
      }
    },

    async checkAuthState() {
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          unsubscribe();
          resolve(!!user);
        });
      });
    },
  },
};
</script>
