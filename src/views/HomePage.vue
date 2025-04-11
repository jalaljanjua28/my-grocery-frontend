<template>
  <div>
    <div class="search-inventory">
      <search-inventory
        :ExpiredFood="Food_expired"
        :ExpiredNonFood="NonFood_expired"
        :NonExpiredFood="Food_nonexpired"
        :NonExpiredNonFood="NonFood_nonexpired"
        :itemsFood="Food"
        :itemsNonFood="NonFood"
      />
    </div>
    <div class="nav-buttons" style="">
      <router-link to="items-inventory" class="router_link">
        <el-button
          style="font-size: large; border: none; padding: 12px; color: black"
          type="info"
          plain
          ><i class="el-icon-goods"> Items</i>
        </el-button>
      </router-link>
      <router-link to="/recipes-page" class="router_link">
        <el-button
          style="font-size: large; border: none; padding: 12px; color: black"
          type="info"
          plain
          ><i class="el-icon-chicken"> Recipes</i>
        </el-button>
      </router-link>
      <router-link to="/health-page" class="router_link">
        <el-button
          style="font-size: large; border: none; padding: 12px; color: black"
          type="info"
          plain
          ><i class="el-icon-no-smoking"> Health</i>
        </el-button>
      </router-link>
      <router-link to="user-defined-prompt" class="router_link">
        <el-button
          style="font-size: large; border: none; padding: 12px; color: black"
          type="info"
          plain
          ><i class="el-icon-s-order"> User Defined Prompt</i>
        </el-button>
      </router-link>
    </div>
    <div v-if="displayJokes" class="jokes-container">
      <el-card class="jokes-box">
        <div class="jokes-header">
          <h2>Joke of the Day</h2>
        </div>
        <div class="joke-item">
          <p class="joke-text">{{ jokes["Food Joke"] }}</p>
        </div>
      </el-card>
    </div>
    <!-- <offers-page></offers-page> -->
    <el-card>
      <section>
        <el-tabs
          v-model="outerActiveTab"
          @tab-click="handleOuterTabClick"
          class="custom-tabs"
        >
          <el-tab-pane name="Food" label="Food"
            ><span slot="label" class="el-tabs__label"
              ><i class="el-icon-food"></i> Food</span
            >
            <div>
              <purchased-list
                :filteredItems="Food_nonexpired"
                :active-tab="outerActiveTab"
                @item-deleted="handleItemDeleted()"
              ></purchased-list>
            </div>
          </el-tab-pane>
          <el-tab-pane name="Not_Food" label="Not Food">
            <span slot="label" class="el-tabs__label"
              ><i class="el-icon-bicycle"></i> Non Food / Unrecognized</span
            >
            <div>
              <purchased-list
                :active-tab="outerActiveTab"
                :filteredItems="NonFood_nonexpired"
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
// import OffersPage from "@/views/OffersList.vue";
import HomePrompt from "../components/HomePrompts.vue";
import PurchasedList from "../components/PurchasedList.vue";
import DeleteAllPurchaseList from "../components/DeleteAllPurchaseList.vue";
import {
  fetchPurchasedListData,
  fetchMasterExpiredData,
  fetchShoppingListData,
} from "@/plugins/Dataservice.js";
import SearchInventory from "../components/SearchInventory.vue";
import { auth } from "../Firebase.js";

const baseUrl = "http://127.0.0.1:8081/api";

export default {
  components: {
    // OffersPage,
    HomePrompt,
    PurchasedList,
    DeleteAllPurchaseList,
    SearchInventory,
  },
  data() {
    return {
      loading: false,
      outerActiveTab: "Food",
      jokes: [],
      displayJokes: false,
      Food: [],
      NonFood: [],
      Food_nonexpired: [],
      NonFood_nonexpired: [],
      item: [],
      currentUser: null,
    };
  },
  computed: {
    filteredItems() {
      console.log(this.items);
      return this.items.filter((item) => item && item.category);
    },
  },
  async mounted() {
    try {
      const { Food_nonexpired, NonFood_nonexpired } =
        await fetchPurchasedListData();
      this.Food_nonexpired = Food_nonexpired;
      this.NonFood_nonexpired = NonFood_nonexpired;
      const { Food_expired, NonFood_expired } = await fetchMasterExpiredData();
      this.Food_expired = Food_expired;
      this.NonFood_expired = NonFood_expired;
      const { Food, NonFood } = await fetchShoppingListData();
      this.Food = Food;
      this.NonFood = NonFood;
      // await this.jsonJokes();
      this.fetchJokesWithTimestamp();

      setInterval(() => {
        this.fetchJokesWithTimestamp();
      }, 3600000); // 3600000 milliseconds = 1 hour
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
    this.outerActiveTab = "Food"; // "a" corresponds to the "Non Expired" tab

    // Store these values in localStorage
    localStorage.setItem("activeOuterTab", this.outerActiveTab);
  },
  methods: {
    handleItemDeleted(itemToDelete) {
      this.items = this.items.filter((item) => item !== itemToDelete);
      // You can access the deleted item and target tab name here
      console.log("Deleted Item:", itemToDelete);
      // Update the active tab when an item is deleted
    },
    handleOuterTabClick(tab) {
      // Update the local storage on outer tab change
      localStorage.setItem("activeOuterTab", tab.name);
      this.outerActiveTab = tab.name; // Update the active tab when clicked

      console.log("Outer Tab: " + this.outerActiveTab);
    },
    async fetchJokesWithTimestamp() {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);

        const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        const response = await fetch(
          `${baseUrl}/jokes-with-timestamp/${timestamp}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.jokes && data.jokes.length > 0) {
          this.jokes = data.jokes[0]; // Set only the first joke
          this.displayJokes = true;
        } else {
          this.errorMessage = "Error retrieving jokes.";
        }
      } catch (error) {
        console.error("Error in fetchJokesWithTimestamp:", error);
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
.el-page-header {
  display: none !important;
}
</style>
