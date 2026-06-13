<template>
  <div class="home-page-container">

    <!-- Decorative food strip -->
    <div class="food-strip">
      <span class="fs-icon">🍎</span>
      <span class="fs-icon">🥦</span>
      <span class="fs-icon">🍊</span>
      <span class="fs-icon">🥕</span>
      <span class="fs-icon">🍌</span>
    </div>

    <!-- Nav buttons -->
    <nav class="nav-buttons">
      <router-link to="items-inventory" class="nav-card">
        <span class="nav-icon">🛒</span>
        <span class="nav-label">Inventory</span>
      </router-link>
      <router-link to="/recipes-page" class="nav-card">
        <span class="nav-icon">🍳</span>
        <span class="nav-label">Recipes</span>
      </router-link>
      <router-link to="/health-page" class="nav-card">
        <span class="nav-icon">💚</span>
        <span class="nav-label">Health</span>
      </router-link>
      <router-link to="user-defined-prompt" class="nav-card">
        <span class="nav-icon">🤖</span>
        <span class="nav-label">AI Prompts</span>
      </router-link>
      <router-link to="receipt-scan" class="nav-card">
        <span class="nav-icon">📸</span>
        <span class="nav-label">Scan Receipt</span>
      </router-link>
    </nav>

    <!-- Joke of the day -->
    <div v-if="displayJokes" class="joke-banner">
      <span class="joke-badge">😄 Joke of the Day</span>
      <p class="joke-text">{{ jokes["Food Joke"] }}</p>
    </div>

    <!-- Purchased Items card -->
    <div class="content-card">
      <div class="card-title-row">
        <span class="card-title-emoji">🛍️</span>
        <h3 class="card-title">Your Purchased Items</h3>
        <span class="card-title-emoji">🧺</span>
      </div>

      <section>
        <el-tabs v-model="outerActiveTab" @tab-click="handleOuterTabClick" class="custom-tabs">
          <el-tab-pane name="Food" label="Food">
            <span slot="label" class="tab-label">
              <span class="tab-icon">🍎</span> Food
            </span>
            <purchased-list
              :filteredItems="Food_nonexpired || []"
              :active-tab="outerActiveTab"
              @item-deleted="handleItemDeleted()"
              @price-updated="handlePriceUpdate"
            ></purchased-list>
          </el-tab-pane>
          <el-tab-pane name="Not_Food">
            <span slot="label" class="tab-label">
              <span class="tab-icon">🧴</span> Non Food / Unrecognized
            </span>
            <purchased-list
              :active-tab="outerActiveTab"
              :filteredItems="NonFood_nonexpired || []"
              @price-updated="handlePriceUpdate"
              @item-deleted="handleItemDeleted()"
            ></purchased-list>
          </el-tab-pane>
        </el-tabs>
      </section>
    </div>

    <!-- AI Prompts section -->
    <div class="prompts-section">
      <div class="card-title-row">
        <span class="card-title-emoji">✨</span>
        <h3 class="card-title">AI Food Insights</h3>
        <span class="card-title-emoji">✨</span>
      </div>
      <home-prompt></home-prompt>
    </div>

    <!-- Footer food strip -->
    <div class="food-strip bottom-strip">
      <span class="fs-icon">🥭</span>
      <span class="fs-icon">🍒</span>
      <span class="fs-icon">🍋</span>
      <span class="fs-icon">🌽</span>
      <span class="fs-icon">🍄</span>
    </div>
  </div>
</template>

<script>
import HomePrompt from "../components/HomePrompts.vue";
import PurchasedList from "../components/PurchasedList.vue";
import {
  fetchPurchasedListData,
  fetchMasterExpiredData,
  fetchShoppingListData,
} from "@/plugins/Dataservice.js";
import { auth } from "../Firebase.js";
import { API_BASE_URL as baseUrl } from "@/config.js";

export default {
  components: { HomePrompt, PurchasedList },
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
      items: [],
      currentUser: null,
    };
  },
  async mounted() {
    try {
      const { Food_nonexpired, NonFood_nonexpired } = await fetchPurchasedListData();
      this.Food_nonexpired = Food_nonexpired || [];
      this.NonFood_nonexpired = NonFood_nonexpired || [];
      this.items = [...(Food_nonexpired || []), ...(NonFood_nonexpired || [])];
      const { Food_expired, NonFood_expired } = await fetchMasterExpiredData();
      this.Food_expired = Food_expired || [];
      this.NonFood_expired = NonFood_expired || [];
      const { Food, NonFood } = await fetchShoppingListData();
      this.Food = Food || [];
      this.NonFood = NonFood || [];
      this.fetchJokesWithTimestamp();
      setInterval(() => { this.fetchJokesWithTimestamp(); }, 3600000);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  },
  created() {
    const storedOuterTab = localStorage.getItem("activeOuterTab");
    const storedInnerTab = localStorage.getItem("activeInnerTab");
    if (storedOuterTab && storedInnerTab) {
      this.outerActiveTab = storedOuterTab;
      this.innerActiveTab = storedInnerTab;
    }
    this.outerActiveTab = "Food";
    localStorage.setItem("activeOuterTab", this.outerActiveTab);
  },
  methods: {
    handlePriceUpdate(updateData) {
      if (this.Food_nonexpired) {
        const i = this.Food_nonexpired.findIndex(item => (item.name || item.Name) === updateData.itemName);
        if (i !== -1) { this.$set(this.Food_nonexpired[i], "price", updateData.newPrice); this.$set(this.Food_nonexpired[i], "Price", updateData.newPrice); }
      }
      if (this.NonFood_nonexpired) {
        const i = this.NonFood_nonexpired.findIndex(item => (item.name || item.Name) === updateData.itemName);
        if (i !== -1) { this.$set(this.NonFood_nonexpired[i], "price", updateData.newPrice); this.$set(this.NonFood_nonexpired[i], "Price", updateData.newPrice); }
      }
      if (this.items) {
        const i = this.items.findIndex(item => (item.name || item.Name) === updateData.itemName);
        if (i !== -1) { this.$set(this.items[i], "price", updateData.newPrice); this.$set(this.items[i], "Price", updateData.newPrice); }
      }
    },
    updateFilteredItems() {
      this.items = [...(this.Food_nonexpired || []), ...(this.NonFood_nonexpired || [])];
    },
    handleItemDeleted(itemToDelete) {
      this.items = this.items.filter(item => item !== itemToDelete);
    },
    handleOuterTabClick(tab) {
      localStorage.setItem("activeOuterTab", tab.name);
      this.outerActiveTab = tab.name;
    },
    async fetchJokesWithTimestamp() {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("User not authenticated");
        const idToken = await currentUser.getIdToken(true);
        const timestamp = Math.floor(Date.now() / 1000);
        const response = await fetch(`${baseUrl}/jokes-with-timestamp/${timestamp}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        if (data.jokes && data.jokes.length > 0) {
          this.jokes = data.jokes[0];
          this.displayJokes = true;
        }
      } catch (error) {
        console.error("Error in fetchJokesWithTimestamp:", error);
      }
    },
  },
};
</script>

<style scoped>
.home-page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px 40px;
}

/* ── Food decoration strip ── */
.food-strip {
  display: flex;
  justify-content: center;
  gap: 18px;
  padding: 10px 0 6px;
}
.bottom-strip { padding: 18px 0 6px; }
.fs-icon {
  font-size: 22px;
  animation: floatIcon 3s ease-in-out infinite;
  display: inline-block;
}
.fs-icon:nth-child(2) { animation-delay: 0.4s; }
.fs-icon:nth-child(3) { animation-delay: 0.8s; }
.fs-icon:nth-child(4) { animation-delay: 1.2s; }
.fs-icon:nth-child(5) { animation-delay: 1.6s; }
@keyframes floatIcon {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-5px); }
}

/* ── Nav cards ── */
.nav-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 14px 0 18px;
}
.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 22px;
  border-radius: 16px;
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  text-decoration: none;
  color: #303133;
  font-weight: 500;
  font-size: 13px;
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
  min-width: 90px;
  backdrop-filter: blur(6px);
}
.nav-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.13);
  background: rgba(103,194,58,0.08);
  color: #4caf50;
}
.nav-icon { font-size: 26px; }
.nav-label { white-space: nowrap; }

/* ── Joke banner ── */
.joke-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: linear-gradient(135deg, rgba(255,236,153,0.7), rgba(255,213,79,0.35));
  border: 1px solid rgba(255,193,7,0.35);
  border-radius: 14px;
  padding: 14px 18px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(255,193,7,0.12);
}
.joke-badge {
  white-space: nowrap;
  font-weight: 700;
  font-size: 13px;
  color: #e65100;
  background: rgba(255,255,255,0.7);
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid rgba(230,81,0,0.18);
  flex-shrink: 0;
}
.joke-text {
  margin: 0;
  font-size: 14px;
  color: #5d4037;
  line-height: 1.5;
}

/* ── Content card ── */
.content-card {
  background: rgba(255,255,255,0.88);
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 3px 18px rgba(0,0,0,0.08);
  padding: 20px 24px;
  margin-bottom: 22px;
  backdrop-filter: blur(8px);
}

/* ── Prompts section ── */
.prompts-section {
  background: rgba(255,255,255,0.88);
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 3px 18px rgba(0,0,0,0.08);
  padding: 20px 24px;
  backdrop-filter: blur(8px);
}

/* ── Card title row ── */
.card-title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}
.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #43a047, #e65100);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-title-emoji { font-size: 20px; }

/* ── Tabs ── */
.tab-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}
.tab-icon { font-size: 16px; }

:deep(.el-tabs__header) { margin-bottom: 14px; }
:deep(.el-tabs__item) {
  font-weight: 500;
  color: #606266;
  transition: color 0.18s;
}
:deep(.el-tabs__item.is-active) { color: #43a047; }
:deep(.el-tabs__active-bar) { background-color: #43a047; }

/* ── Responsive ── */
@media (max-width: 600px) {
  .nav-card { min-width: 70px; padding: 10px 14px; }
  .nav-icon { font-size: 22px; }
  .content-card, .prompts-section { padding: 14px 12px; }
}
</style>
