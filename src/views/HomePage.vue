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
    <div class="nav-buttons">
      <router-link to="items-inventory" class="router_link">
        <el-button
          type="primary"
          size="x-small"
          plain
          style="margin-bottom: 10px !important; width: 100% !important"
          >Items</el-button
        >
      </router-link>
      <router-link to="/recipes-page" class="router_link">
        <el-button type="warning" size="x-small" plain style="width: 100%"
          >Recipes</el-button
        >
      </router-link>
      <router-link to="/health-page" class="router_link">
        <el-button type="info" size="x-small" plain style="width: 100%"
          >Health</el-button
        >
      </router-link>
      <router-link to="user-defined-prompt" class="router_link">
        <el-button type="danger" size="x-small" plain style="width: 190%">
          User Defined Prompt</el-button
        >
      </router-link>
    </div>
    <div v-if="displayJokes">
      <el-card v-for="(joke, index) in jokes" :key="index">
        <p class="joke-card">
          {{ joke["Food Joke"] }}
        </p>
        <el-button :loading="loading" type="info" @click="gptJokes()" plain
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
      currentUser: null,
    };
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
      await this.jsonJokes();
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

    async jsonJokes() {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
        console.log("idToken", idToken);
        this.loading = true;
        const response = await fetch(baseUrl + "/jokes-using-json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data Received:", data);
        if (data.jokes) {
          this.jokes = data.jokes;
        } else {
          this.errorMessage = "Error retrieving jokes.";
        }
        this.loading = false;
      } catch (error) {
        console.error("Error:", error);
        this.errorMessage = "Error retrieving jokes.";
        this.loading = false;
      }
      this.displayJokes = true;
    },
    async gptJokes() {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
        console.log("idToken", idToken);
        this.loading = true;
        const response = await fetch(baseUrl + "/jokes-using-gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        console.log("Data Received:", data);
        if (data.jokes) {
          this.jokes = data.jokes;
        } else {
          this.errorMessage = "Error retrieving jokes.";
        }
        this.loading = false;
      } catch (error) {
        console.error("Error in gptJokes:", error);
        this.errorMessage = error.message;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.el-page-header {
  display: none !important;
}
.nav-buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 360px !important;
  margin-bottom: 25px !important;
}

.router_link {
  width: 100%;
  text-align: center;
}

.el-button {
  border-radius: 12px;
  transition: all 0.3s ease;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: linear-gradient(145deg, #f0f0f0, #e0e0e0);
}

.el-button:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.el-button[type="primary"] {
  background: linear-gradient(145deg, #3a8ee6, #1e5fa1);
  color: white;
}

.el-button[type="primary"]:hover {
  background: linear-gradient(145deg, #1e5fa1, #3a8ee6);
}

.el-button[type="warning"] {
  background: linear-gradient(145deg, #ffb74d, #ff9800);
  color: white;
}

.el-button[type="warning"]:hover {
  background: linear-gradient(145deg, #ff9800, #ffb74d);
}

.el-button[type="info"] {
  background: linear-gradient(145deg, #29b6f6, #039be5);
  color: white;
}

.el-button[type="info"]:hover {
  background: linear-gradient(145deg, #039be5, #29b6f6);
}

.el-button[type="danger"] {
  background: linear-gradient(145deg, #ef5350, #e53935);
  color: white;
  width: 100%;
}

.el-button[type="danger"]:hover {
  background: linear-gradient(145deg, #e53935, #ef5350);
}

.el-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(58, 142, 230, 0.5);
}
</style>
