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
      <el-table-column width="100px" label="Name" prop="name"></el-table-column>
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
      <el-table-column label="Days" prop="days_left"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-row v-if="scope.row" style="display: flex; flex-wrap: wrap">
            <el-tooltip
              content="Change expiry date"
              placement="top"
              effect="light"
            >
              <el-button
                type="text"
                icon="el-icon-date"
                circle
                style="font-size: 20px !important"
                @click="addExpiry(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-dialog :visible.sync="dialogVisible1" title="Add Expiry">
              <el-form :model="form" label-width="120px">
                <el-form-item label="Item Name">
                  <el-input
                    v-model="form.item_name"
                    style="width: 90% !important"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="Days to Extend">
                  <el-input
                    v-model="form.days_to_extend"
                    type="number"
                    style="width: 90% !important"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="info" @click="updateExpiry" plain
                    >Update Expiry</el-button
                  >
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-tooltip content="Change price" placement="top" effect="light">
              <el-button
                type="text"
                icon="el-icon-money"
                circle
                style="font-size: 20px !important"
                @click="addPrice(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-dialog :visible.sync="dialogVisible2" title="Add Price">
              <el-form :model="form" label-width="120px">
                <el-form-item label="Item Name">
                  <el-input
                    v-model="form.item_name"
                    style="width: 90% !important"
                    disabled
                  ></el-input>
                </el-form-item>
                <el-form-item label="Price to Add">
                  <el-input
                    v-model="form.price"
                    type="number"
                    style="width: 90% !important"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="text" @click="updatePrice" plain
                    >Add Price
                  </el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-tooltip content="Delete Item" placement="top" effect="light">
              <el-button
                type="text"
                icon="el-icon-delete"
                circle
                style="font-size: 20px !important"
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
const baseUrl = "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api";

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
      dialogVisible1: false, // Control the visibility of the dialog
      dialogVisible2: false, // Control the visibility of the dialog
      form: {
        item_name: "",
        days_to_extend: "",
        price: "",
      },
    };
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
    addPrice(item) {
      this.form.item_name = item.name;
      this.form.price = item.price; // Set the form price correctly
      this.dialogVisible2 = true;
    },

    async updatePrice() {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);

      const userConfirmed = confirm(
        "Are you sure you want to update the price?"
      );
      if (userConfirmed) {
        const requestData = {
          Name: this.form.item_name,
          Price: this.form.price, // Use form.price
        };

        fetch(baseUrl + "/update_price", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error updating price");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Price updated:", data.message);
            this.dialogVisible2 = false;
            this.$message({
              message: "Price updated successfully!",
              type: "success",
            });
            location.reload();
          })
          .catch((error) => {
            console.error("Error updating price:", error.message);
            this.$message({
              message: "An error occurred while updating price",
              type: "error",
            });
          });
      }
    },
    addExpiry(item) {
      // Open the dialog to add expiry
      this.form.item_name = item.name;
      this.form.days_to_extend = 0;
      this.dialogVisible1 = true;
    },

    async updateExpiry() {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      console.log("idToken", idToken);
      const requestData = {
        item_name: this.form.item_name,
        days_to_extend: this.form.days_to_extend,
      };
      console.log("days_to_extend:", requestData.days_to_extend);

      fetch(baseUrl + "/update-master-nonexpired-item-expiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
          // Add additional headers if needed
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
        });
      this.form.item_name = "";
      this.form.days_to_extend = "";
      location.reload();
    },
  },
};
</script>

<style scoped>
.el-button--info.is-plain {
  border: 2px solid;
  width: auto !important;
  margin-bottom: 10px !important;
}
/* .responsive-table {
  width: 100%;
  border-collapse: collapse;
  width: 735px !important;
} */
</style>
