<template>
  <div class="home-page-container">
    <the-nav></the-nav>

    <!-- Decorative food-themed header -->
    <div class="decorative-food-header">
      <div class="food-icon apple"></div>
      <div class="food-icon banana"></div>
      <div class="food-icon carrot"></div>
      <div class="food-icon broccoli"></div>
      <div class="food-icon orange"></div>
    </div>

    <div class="search-HomeContainer">
      <div class="search-decoration">
        <div class="food-icon tomato" title="Search Inventory">
          <div class="icon-tooltip">Search Inventory</div>
        </div>
      </div>
      <search-inventory
        class="searchDev"
        :ExpiredFood="Food_expired"
        :ExpiredNonFood="NonFood_expired"
        :NonExpiredFood="Food_nonexpired"
        :NonExpiredNonFood="NonFood_nonexpired"
        :itemsFood="Food"
        :itemsNonFood="NonFood"
      />
      <div class="search-decoration">
        <div class="food-icon broccoli" title="Healthy Options">
          <div class="icon-tooltip">Healthy Options</div>
        </div>
      </div>
    </div>

    <div class="nav-buttons">
      <router-link to="items-inventory" class="router_link">
        <el-button class="nav-button" type="success" plain
          ><i class="el-icon-goods"></i> Items
        </el-button>
      </router-link>
      <router-link to="/recipes-page" class="router_link">
        <el-button class="nav-button" type="warning" plain
          ><i class="el-icon-chicken"></i> Recipes
        </el-button>
      </router-link>
      <router-link to="/health-page" class="router_link">
        <el-button class="nav-button" type="primary" plain
          ><i class="el-icon-no-smoking"></i> Health
        </el-button>
      </router-link>
      <router-link to="user-defined-prompt" class="router_link">
        <el-button class="nav-button" type="info" plain
          ><i class="el-icon-s-order"></i> User Defined Prompt
        </el-button>
      </router-link>
    </div>

    <div v-if="displayJokes" class="jokes-container">
      <el-card class="jokes-box">
        <div class="jokes-header">
          <div class="food-icon strawberry"></div>
          <h2>Joke of the Day</h2>
          <div class="food-icon pineapple"></div>
        </div>
        <div class="joke-item">
          <p class="joke-text">{{ jokes["Food Joke"] }}</p>
        </div>
      </el-card>
    </div>

    <!-- <offers-page></offers-page> -->
    <el-card class="main-content-card">
      <div class="card-decoration left-list-decoration">
        <div class="food-icon tomato"></div>
        <div class="food-icon grapes"></div>
        <div class="food-icon avocado"></div>
      </div>

      <section>
        <el-tabs
          v-model="outerActiveTab"
          @tab-click="handleOuterTabClick"
          class="custom-tabs"
        >
          <el-tab-pane name="Food" label="Food">
            <span slot="label" class="el-tabs__label">
              <i class="el-icon-food"></i> Food
            </span>
            <div>
              <purchased-list
                :filteredItems="Food_nonexpired"
                :active-tab="outerActiveTab"
                @item-deleted="handleItemDeleted()"
              ></purchased-list>
            </div>
          </el-tab-pane>
          <el-tab-pane name="Not_Food" label="Not Food">
            <span slot="label" class="el-tabs__label">
              <i class="el-icon-bicycle"></i> Non Food / Unrecognized
            </span>
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

      <div class="card-decoration right-list-decoration">
        <div class="food-icon watermelon"></div>
        <div class="food-icon peach"></div>
        <div class="food-icon potato"></div>
      </div>
    </el-card>

    <home-prompt></home-prompt>

    <!-- Decorative food-themed footer -->
    <div class="decorative-food-footer">
      <div class="food-icon mango"></div>
      <div class="food-icon cherry"></div>
      <div class="food-icon lemon"></div>
      <div class="food-icon corn"></div>
      <div class="food-icon mushroom"></div>
    </div>
  </div>
</template>

<script>
import TheNav from "../components/TheNav.vue";
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

const baseUrl = "https://my-grocery-app-888361723877.us-central1.run.app/api";

export default {
  components: {
    // OffersPage,
    HomePrompt,
    PurchasedList,
    DeleteAllPurchaseList,
    SearchInventory,
    TheNav,
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

<style scoped></style>
