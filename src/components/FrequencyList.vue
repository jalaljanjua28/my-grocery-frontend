<template>
  <div style="display: flex; flex-direction: column; margin-top: 20px">
    <el-select v-model="condition" placeholder="Select condition">
      <el-option label="Biweekly" value="biweekly"></el-option>
      <el-option label="Monthly" value="monthly"></el-option>
      <el-option label="Today" value="today"></el-option>
    </el-select>
    <el-button
      @click="checkFrequency"
      type="primary"
      style="margin-top: 10px; background: mediumblue"
      >Check Frequency</el-button
    >

    <div v-if="responseMessage" class="response-message">
      {{ responseMessage }}
    </div>

    <div
      v-if="sortedItemFrequency"
      class="item-frequency"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <h3>Item Frequency</h3>
      <el-table :data="sortedItemFrequency" style="width: 100%">
        <el-table-column prop="itemName" label="Item Name"></el-table-column>
        <el-table-column prop="frequency" label="Frequency"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { auth } from "../Firebase.js"; // Assuming this is your Firebase initialization file
const baseUrl = "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api";

export default {
  data() {
    return {
      condition: "",
      responseMessage: "",
      sortedItemFrequency: [],
    };
  },
  methods: {
    async checkFrequency() {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
      console.log("idToken", idToken);
      try {
        const response = await fetch(baseUrl + "/check-frequency", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ condition: this.condition }),
        });
        const responseData = await response.json();
        if (response.ok) {
          // Transform the object into an array of objects with itemName and frequency properties
          const sortedItemFrequency = Object.entries(
            responseData.sorted_item_frequency
          ).map(([itemName, frequency]) => ({ itemName, frequency }));
          // Sort the array in descending order based on the frequency
          this.sortedItemFrequency = sortedItemFrequency.sort(
            (a, b) => b.frequency - a.frequency
          );
        } else {
          this.responseMessage = responseData.error;
        }
      } catch (error) {
        console.error("Error checking frequency:", error);
        this.responseMessage = "An error occurred while checking frequency.";
      }
    },
  },
};
</script>

<style scoped></style>
