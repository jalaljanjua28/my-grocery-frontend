<template>
  <el-container class="add-item-container">
    <el-main>
      <el-form :model="form" label-width="120px">
        <el-form-item label="Item Name">
          <el-input v-model="form.item_name"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model="form.item_price"></el-input>
        </el-form-item>
        <el-form-item label="Item Date">
          <el-input v-model="form.item_date"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="
              display: flex;
              align-content: stretch;
              justify-content: center;
              align-items: center;
            "
            type="success"
            @click="AddItem"
            plain
            >Add Item</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file
const baseURL = "http://localhost:8081/api";

export default {
  data() {
    return {
      form: {
        item_name: "",
        item_price: "",
        item_date: "",
      },
    };
  },
  methods: {
    async AddItem() {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      console.log("idToken", idToken);
      const requestData = {
        item_name: this.form.item_name,
        item_price: this.form.item_price,
        item_date: this.form.item_date,
      };
      fetch(baseURL + "/add-custom-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.ok) {
            this.$message({
              message: "Item Added Successfully",
              type: "success",
            });
            console.log(response.data);
            this.$emit("item-added", requestData); // Emit an event with the added item data
            // Introduce a delay of 2000 milliseconds (2 seconds) before reloading the page
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            throw new Error("Failed to add item");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.form.item_name = "";
      this.form.item_price = "";
      this.form.item_date = "";
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 15px;
}
div {
  width: -webkit-fill-available !important;
}
</style>
