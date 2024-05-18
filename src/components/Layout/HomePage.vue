<template>
  <div>
    <div class="searchInventory">
      <search-inventory
        :ExpiredFood="Food_expired"
        :ExpiredNonFood="NonFood_expired"
        :NonExpiredFood="Food_nonexpired"
        :NonExpiredNonFood="NonFood_nonexpired"
        :itemsFood="Food"
        :itemsNonFood="NonFood"
      />
    </div>
    <div class="nav-buttons">
      <router-link to="items-inventory" class="router_link">
        <el-button type="primary" size="x-small" plain>Items</el-button>
      </router-link>
      <router-link to="/recipes-page" class="router_link">
        <el-button type="warning" size="x-small" plain style="margin-left: 10px"
          >Recipes</el-button
        >
      </router-link>
      <router-link to="/health-page" class="router_link">
        <el-button type="info" size="x-small" plain style="margin-left: 10px"
          >Health</el-button
        >
      </router-link>
      <router-link to="user-defined-prompt" class="router_link">
        <el-button type="danger" size="x-small" plain style="margin-left: 10px">
          User Defined Prompt</el-button
        >
      </router-link>
    </div>
    <div v-if="displayJokes">
      <el-card v-for="(joke, index) in jokes" :key="index">
        <p class="joke-card">
          {{ joke["Food Joke"] }}
        </p>
        <el-button
          :loading="loading"
          type="info"
          @click="
            fetchData(
              'gpt',
              '/api/https://my-grocery-app-hlai3cv5za-uc.a.run.app',
              'jokes'
            )
          "
          plain
          >Generate Prompt</el-button
        >
      </el-card>
    </div>
    <offers-page></offers-page>
    <el-card>
      <section>
        <el-tabs
          v-model="outerActiveTab"
          @tab-click="handleOuterTabClick"
          class="custom-tabs"
        >
          <el-tab-pane name="1" label="Food"
            ><span slot="label" class="el-tabs__label"
              ><i class="el-icon-food"></i> Food</span
            >
            <div>
              <purchased-list
                :items="Food_nonexpired"
                @item-deleted="handleItemDeleted()"
              ></purchased-list>
            </div>
          </el-tab-pane>
          <el-tab-pane name="2" label="Not Food">
            <span slot="label" class="el-tabs__label"
              ><i class="el-icon-bicycle"></i> Non Food</span
            >
            <div>
              <purchased-list
                :items="NonFood_nonexpired"
                @item-deleted="handleItemDeleted()"
              ></purchased-list>
            </div>
          </el-tab-pane>
        </el-tabs>
      </section>
      <delete-all-purchase-list></delete-all-purchase-list>
    </el-card>
    <home-prompt></home-prompt>
  </div>
</template>

<script>
import OffersPage from "@/views/OffersList.vue";
import HomePrompt from "../Data-resources/ChatGPTPrompts/HomePrompts.vue";
import PurchasedList from "../Data-resources/ProductList/PurchasedList.vue";
import DeleteAllPurchaseList from "../Data-resources/DeleteItems/DeleteAllPurchaseList.vue";
import {
  fetchPurchasedListData,
  fetchMasterExpiredData,
  fetchShoppingListData,
} from "@/plugins/Dataservice.js";
import SearchInventory from "../Data-resources/Search-component/SearchInventory.vue";

const baseUrl = "https://my-grocery-app-hlai3cv5za-uc.a.run.app";

export default {
  components: {
    OffersPage,
    HomePrompt,
    PurchasedList,
    DeleteAllPurchaseList,
    SearchInventory,
  },
  data() {
    return {
      loading: false,
      outerActiveTab: null,
      jokes: [],
      displayJokes: false,
      Food: [],
      NonFood: [],
      Food_nonexpired: [],
      NonFood_nonexpired: [],
      item: [],
    };
  },
  async mounted() {
    try {
      await this.fetchData("json", "/api/get-jokes-using-json", "jokes");
      const { Food_nonexpired, NonFood_nonexpired } =
        await fetchPurchasedListData();
      this.Food_nonexpired = Food_nonexpired;
      this.NonFood_nonexpired = NonFood_nonexpired;
      const { Food_expired, NonFood_expired } = await fetchMasterExpiredData();
      this.Food_expired = Food_expired;
      this.NonFood_expired = NonFood_expired;
      // Fetch shopping list data
      const { Food, NonFood } = await fetchShoppingListData();
      this.Food = Food;
      this.NonFood = NonFood;
    } catch (error) {
      console.error("Error loading data:", error);
    }
  },
  created() {
    // Retrieve the active tab from local storage on page load
    const storedOuterTab = localStorage.getItem("activeOuterTab");
    console.log(storedOuterTab);
    const storedInnerTab = localStorage.getItem("activeInnerTab");
    console.log(storedInnerTab);
    if (storedOuterTab && storedInnerTab) {
      this.outerActiveTab = storedOuterTab;
      this.innerActiveTab = storedInnerTab;
    }
  },
  methods: {
    handleItemDeleted(itemToDelete) {
      this.items = this.items.filter((item) => item !== itemToDelete);
      // You can access the deleted item and target tab name here
      console.log("Deleted Item:", itemToDelete);
      // Update the active tab when an item is deleted
    },
    handleInnerTabClick(tab) {
      // Update the local storage on inner tab change
      localStorage.setItem("activeInnerTab", tab.name);
      console.log("Inner Tab: " + this.innerActiveTab);
    },
    handleOuterTabClick(tab) {
      // Update the local storage on outer tab change
      localStorage.setItem("activeOuterTab", tab.name);
      console.log("Outer Tab: " + this.outerActiveTab);
    },
    async fetchData(type, endpoint, property) {
      try {
        this.loading = true;
        let response;
        if (type === "json") {
          response = await fetch(baseUrl + endpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else if (type === "gpt") {
          await fetch(baseUrl + endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });
          response = await fetch(baseUrl + endpoint);
        } else {
          throw new Error("Invalid request type.");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Log the entire data object for inspection
        console.log("Data Received:", data);
        // Check if the property exists in the data object
        if (property in data) {
          this[property] = data[property] || [];
          console.log(data[property]);
        } else {
          console.error(
            `Property '${property}' not found in the server response.`
          );
        }
        this.loading = false;
      } catch (error) {
        this.error = error.message;
      }
    },
    // async jsonJokes() {
    //   // Make a request to your backend endpoint
    //   fetch(baseUrl + "/api/jokes-using-json")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.jokes) {
    //         this.jokes = data.jokes;
    //       } else {
    //         this.errorMessage = "Error retrieving jokes.";
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       this.errorMessage = "Error retrieving jokes.";
    //     });
    //   this.displayJokes = true;
    // },
    // async gptJokes() {
    //   try {
    //     this.loading = true;
    //     await fetch(baseUrl + "/api/jokes-using-gpt", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({}),
    //     });
    //     const response = await fetch(baseUrl + "/api/jokes-using-gpt");
    //     const data = await response.json();
    //     this.jokes = data.jokes;
    //     this.loading = false;
    //     console.log("Jokes:", this.jokes);
    //     this.user_input = "";
    //   } catch (error) {
    //     this.error = error.message;
    //   }
    // },
  },
};
</script>

<style scoped>
.el-page-header {
  display: none !important;
}
@media screen and (max-width: 600px) {
  .searchInventory {
    width: 100%;
    margin-bottom: 20px;
  }
}
@media screen and (min-width: 600px) {
  .searchInventory {
    display: none;
  }
  .el-select {
    display: none;
  }
}
</style>
