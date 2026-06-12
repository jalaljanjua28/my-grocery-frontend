<template>
  <div class="prompts-page">

    <!-- Page header -->
    <div class="page-header">
      <router-link to="/" class="back-link">
        <span class="back-arrow">←</span> Home
      </router-link>
      <div class="page-title">
        <span>🤖</span>
        <h2>Custom AI Prompts</h2>
      </div>
      <div class="header-badge">Powered by GPT</div>
    </div>

    <!-- Food strip -->
    <div class="food-strip">
      <span class="fs-icon">🍎</span><span class="fs-icon">🥦</span><span class="fs-icon">🍊</span><span class="fs-icon">🥕</span><span class="fs-icon">🍌</span>
    </div>

    <!-- Main prompt card -->
    <div class="prompt-card">

      <!-- Select prompt type -->
      <div class="select-section">
        <div class="select-label">
          <i class="el-icon-magic-stick"></i>
          <span>Choose a prompt type</span>
        </div>
        <el-select v-model="selectedPrompt" placeholder="Select Prompt" class="prompt-select">
          <el-option label="Food Waste Reduction" value="foodWasteReduction">
            <span class="opt-icon">♻️</span> Food Waste Reduction
          </el-option>
          <el-option label="Mood Changer" value="moodChanger">
            <span class="opt-icon">😊</span> Mood Changer
          </el-option>
          <el-option label="Food Cuisine Suggestions" value="cusineSuggestion">
            <span class="opt-icon">🍜</span> Food Cuisine Suggestions
          </el-option>
          <el-option label="Defined Dishes" value="definedDishes">
            <span class="opt-icon">🍽️</span> Defined Dishes
          </el-option>
          <el-option label="Unique Recipe" value="uniqueRecipes">
            <span class="opt-icon">📖</span> Unique Recipe
          </el-option>
        </el-select>
      </div>

      <!-- Input area -->
      <div class="input-section" v-if="selectedPrompt">
        <div class="input-label">
          <i :class="getPromptIcon()"></i>
          <span>{{ getPromptTitle() }}</span>
        </div>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="selectedOption"
          :fetch-suggestions="querySearch"
          placeholder="Type or select a prompt…"
          class="prompt-autocomplete"
          @select="handleSelect"
        >
          <i class="el-icon-remove-outline el-input__icon" slot="suffix" @click="handleIconClick"></i>
          <template slot-scope="{ item }">
            <div class="suggestion-option">
              <i :class="getPromptIcon()"></i>
              <span>{{ item }}</span>
            </div>
          </template>
        </el-autocomplete>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <span>Generating your custom content…</span>
      </div>

      <!-- ── Results ── -->

      <!-- Food Waste Reduction -->
      <div v-if="displayWasteReduction && !loading" class="results-section">
        <div class="results-header" style="--accent:#4caf50">
          <span class="rh-icon">♻️</span>
          <h3>Food Waste Reduction Suggestions</h3>
        </div>
        <div v-for="(s, i) in foodWasteReductionSuggestions" :key="i" class="result-card">
          <p v-if="s['Food Waste Reduction Suggestion'] && s['Food Waste Reduction Suggestion'].trim()" class="result-text">
            <span v-html="formatText(s['Food Waste Reduction Suggestion'])"></span>
          </p>
          <div class="result-footer">
            <span class="result-tag" style="--tc:#4caf50">Waste Reduction</span>
            <span class="result-num">Tip #{{ i + 1 }}</span>
          </div>
        </div>
        <el-alert v-if="displayWasteReduction && (!foodWasteReductionSuggestions.length || !hasValidFoodWasteReductionSuggestions)" title="No suggestions yet — select a prompt to begin." type="info" show-icon :closable="false" class="empty-alert"></el-alert>
      </div>

      <!-- Mood Changer -->
      <div v-if="displayMood && !loading" class="results-section">
        <div class="results-header" style="--accent:#ff9800">
          <span class="rh-icon">😊</span>
          <h3>Mood Changer Suggestions</h3>
        </div>
        <div v-for="(s, i) in moodChangerSuggestions" :key="i" class="result-card">
          <p v-if="s['Food Suggestion'] && s['Food Suggestion'].trim()" class="result-text">
            <span v-html="formatText(s['Food Suggestion'])"></span>
          </p>
          <div class="result-footer">
            <span class="result-tag" style="--tc:#ff9800">Mood Enhancer</span>
            <span class="result-num">Suggestion #{{ i + 1 }}</span>
          </div>
        </div>
        <el-alert v-if="displayMood && (!moodChangerSuggestions.length || !hasValidMoodChangerSuggestions)" title="No suggestions yet — select a prompt to begin." type="info" show-icon :closable="false" class="empty-alert"></el-alert>
      </div>

      <!-- Fusion Cuisine -->
      <div v-if="displaySuggestions && !loading" class="results-section">
        <div class="results-header" style="--accent:#9c27b0">
          <span class="rh-icon">🍜</span>
          <h3>Fusion Cuisine Suggestions</h3>
        </div>
        <div v-for="(s, i) in fusionSuggestions" :key="i" class="result-card">
          <p v-if="s['Fusion Cuisine Suggestion'] && s['Fusion Cuisine Suggestion'].trim()" class="result-text">
            <span v-html="formatText(s['Fusion Cuisine Suggestion'])"></span>
          </p>
          <div class="result-footer">
            <span class="result-tag" style="--tc:#9c27b0">Fusion Cuisine</span>
            <span class="result-num">Idea #{{ i + 1 }}</span>
          </div>
        </div>
        <el-alert v-if="displaySuggestions && (!fusionSuggestions.length || !hasValidFusionSuggestions)" title="No suggestions yet — select a prompt to begin." type="info" show-icon :closable="false" class="empty-alert"></el-alert>
      </div>

      <!-- Defined Dishes -->
      <div v-if="displayDishes && !loading" class="results-section">
        <div class="results-header" style="--accent:#2196f3">
          <span class="rh-icon">🍽️</span>
          <h3>Defined Dishes &amp; Fun Facts</h3>
        </div>
        <div v-for="(fact, i) in definedDishes" :key="i" class="result-card">
          <p v-if="fact['Fun Facts'] && fact['Fun Facts'].trim()" class="result-text">
            <span v-html="formatText(fact['Fun Facts'])"></span>
          </p>
          <div class="result-footer">
            <span class="result-tag" style="--tc:#2196f3">Fun Facts</span>
            <span class="result-num">Fact #{{ i + 1 }}</span>
          </div>
        </div>
        <el-alert v-if="displayDishes && (!definedDishes.length || !hasValidDefinedDishes)" title="No facts yet — select a prompt to begin." type="info" show-icon :closable="false" class="empty-alert"></el-alert>
      </div>

      <!-- Unique Recipes -->
      <div v-if="displayRecipe && !loading" class="results-section">
        <div class="results-header" style="--accent:#e53935">
          <span class="rh-icon">📖</span>
          <h3>Unique Recipes</h3>
        </div>
        <div v-for="(recipe, i) in uniqueRecipes" :key="i" class="result-card">
          <div v-if="recipe['Recipe'] && recipe['Recipe'].trim()" class="recipe-block">
            <div class="recipe-block-title">Recipe</div>
            <p class="result-text"><span v-html="formatText(recipe['Recipe'])"></span></p>
          </div>
          <div v-if="recipe['Encouragement'] && recipe['Encouragement'].trim()" class="encourage-block">
            <div class="encourage-title">⭐ Chef's Encouragement</div>
            <p class="result-text encourage-text"><span v-html="formatText(recipe['Encouragement'])"></span></p>
          </div>
          <div class="result-footer">
            <span class="result-tag" style="--tc:#e53935">Unique Recipe</span>
            <span class="result-num">Recipe #{{ i + 1 }}</span>
          </div>
        </div>
        <el-alert v-if="displayRecipe && (!uniqueRecipes.length || !hasValidUniqueRecipes)" title="No recipes yet — select a prompt to begin." type="info" show-icon :closable="false" class="empty-alert"></el-alert>
      </div>

    </div>

    <!-- Footer food strip -->
    <div class="food-strip bottom-strip">
      <span class="fs-icon">🥭</span><span class="fs-icon">🍒</span><span class="fs-icon">🍋</span><span class="fs-icon">🌽</span><span class="fs-icon">🍄</span>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL as baseURL } from "@/config.js";
import { auth } from "../Firebase.js";

export default {
  data() {
    return {
      selectedPrompt: "",
      selectedOption: "",
      foodWasteReductionSuggestions: [],
      moodChangerSuggestions: [],
      fusionSuggestions: [],
      definedDishes: [],
      uniqueRecipes: [],
      loading: false,
      displayWasteReduction: false,
      displayMood: false,
      displaySuggestions: false,
      displayDishes: false,
      displayRecipe: false,
      currentUser: null,
    };
  },
  computed: {
    hasValidFoodWasteReductionSuggestions() {
      return (this.foodWasteReductionSuggestions || []).some(s => s["Food Waste Reduction Suggestion"]?.trim());
    },
    hasValidMoodChangerSuggestions() {
      return (this.moodChangerSuggestions || []).some(s => s["Food Suggestion"]?.trim());
    },
    hasValidFusionSuggestions() {
      return (this.fusionSuggestions || []).some(s => s["Fusion Cuisine Suggestion"]?.trim());
    },
    hasValidDefinedDishes() {
      return (this.definedDishes || []).some(d => d["Fun Facts"]?.trim());
    },
    hasValidUniqueRecipes() {
      return (this.uniqueRecipes || []).some(r => r["Recipe"]?.trim() || r["Encouragement"]?.trim());
    },
  },
  mounted() { this.checkAuthState(); },
  methods: {
    getPromptIcon() {
      const map = { foodWasteReduction: "el-icon-delete", moodChanger: "el-icon-sunny", cusineSuggestion: "el-icon-dish", definedDishes: "el-icon-food", uniqueRecipes: "el-icon-notebook-2" };
      return map[this.selectedPrompt] || "el-icon-chat-dot-round";
    },
    getPromptTitle() {
      const map = { foodWasteReduction: "Food Waste Reduction Prompt", moodChanger: "Mood Changer Prompt", cusineSuggestion: "Fusion Cuisine Prompt", definedDishes: "Defined Dishes Prompt", uniqueRecipes: "Unique Recipe Prompt" };
      return map[this.selectedPrompt] || "Custom Prompt";
    },
    handleIconClick() { this.selectedOption = ""; },
    formatText(text) {
      if (!text) return "";
      let t = text.replace(/\.\s+(?=[A-Z])/g, ".<br><br>");
      t = t.replace(/(\d+\.\s)/g, (m, p1, offset) => offset === 0 ? `<span class="list-number">${p1}</span>` : `<br><br><span class="list-number">${p1}</span>`);
      t = t.replace(/(Step \d+:)/gi, '<span class="recipe-step">$1</span>');
      t = t.replace(/(Ingredients:|Ingredients)/gi, '<span class="ingredients-title">$1</span>');
      t = t.replace(/(Instructions:|Directions:|Method:)/gi, '<span class="instructions-title">$1</span>');
      t = t.replace(/(Tip:|Note:|Hint:)/gi, '<span class="tip-title">$1</span>');
      return t;
    },
    checkAuthState() {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.currentUser = user;
          try {
            await this.fetchData("json", "/food-waste-reduction-using-json", "foodWasteReductionSuggestions");
            await this.fetchData("json", "/mood-changer-using-json", "moodChangerSuggestions");
            await this.fetchData("json", "/fusion-cuisine-suggestions-using-json", "fusionSuggestions");
            await this.fetchData("json", "/user-defined-dish-using-json", "definedDishes");
            await this.fetchData("json", "/unique-recipes-using-json", "uniqueRecipes");
          } catch (e) { console.error(e); }
        }
      });
    },
    async fetchData(type, endpoint, property) {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
        const idToken = await user.getIdToken(true);
        this.loading = true;
        let response;
        if (type === "json") {
          response = await fetch(baseURL + endpoint, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` } });
        } else {
          await fetch(baseURL + endpoint, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` }, body: JSON.stringify({ prompt: this.selectedOption }) });
          response = await fetch(baseURL + endpoint, { headers: { Authorization: `Bearer ${idToken}` } });
        }
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        this[property] = data[property] || [];
        this.loading = false;
      } catch (e) { console.error(e); this.loading = false; }
    },
    querySearch(queryString, cb) {
      const map = {
        foodWasteReduction: ["How can I reduce food waste with the items in my inventory?", "What are creative ways to use leftover vegetables?", "Tips for preserving fruits and vegetables longer", "How to properly store food to reduce waste", "Recipes that use food scraps"],
        moodChanger: ["What foods can help improve my mood?", "Suggest comfort foods for a stressful day", "Foods that boost energy and happiness", "Light and refreshing foods for a hot day", "Warm and cozy foods for a cold day"],
        cusineSuggestion: ["Suggest fusion dishes combining Italian and Asian cuisines", "Creative Mediterranean and Latin American fusion ideas", "Modern twists on traditional Middle Eastern dishes", "Innovative combinations of Indian and Mexican cuisine", "Unique French and Japanese fusion recipes"],
        definedDishes: ["Tell me about the history of Pizza", "What are interesting facts about Sushi?", "The origin and cultural significance of Tacos", "Fun facts about Pasta and Italian cuisine", "Historical background of Curry dishes"],
        uniqueRecipes: ["Create a unique recipe using chicken and vegetables", "Innovative dessert recipe using seasonal fruits", "Creative vegetarian main course recipe", "Unique seafood dish with Asian influences", "Novel breakfast recipe using common pantry items"],
      };
      const list = map[this.selectedPrompt] || [];
      cb(queryString ? list.filter(i => i.toLowerCase().includes(queryString.toLowerCase())) : list);
    },
    handleSelect(item) {
      this.selectedOption = item;
      this.displayWasteReduction = this.displayMood = this.displaySuggestions = this.displayDishes = this.displayRecipe = false;
      if (this.selectedPrompt === "foodWasteReduction") { this.displayWasteReduction = true; this.fetchData("gpt", "/food-waste-reduction-using-json", "foodWasteReductionSuggestions"); }
      else if (this.selectedPrompt === "moodChanger") { this.displayMood = true; this.fetchData("gpt", "/mood-changer-using-json", "moodChangerSuggestions"); }
      else if (this.selectedPrompt === "cusineSuggestion") { this.displaySuggestions = true; this.fetchData("gpt", "/fusion-cuisine-suggestions-using-json", "fusionSuggestions"); }
      else if (this.selectedPrompt === "definedDishes") { this.displayDishes = true; this.fetchData("gpt", "/user-defined-dish-using-json", "definedDishes"); }
      else if (this.selectedPrompt === "uniqueRecipes") { this.displayRecipe = true; this.fetchData("gpt", "/unique-recipes-using-json", "uniqueRecipes"); }
    },
  },
};
</script>

<style scoped>
.prompts-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 20px 16px 48px;
}

/* ── Page header ── */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 10px;
}
.back-link {
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #606266;
  font-size: 14px;
  padding: 6px 14px;
  border-radius: 20px;
  background: rgba(255,255,255,0.8);
  border: 1px solid rgba(0,0,0,0.08);
  transition: background 0.18s, color 0.18s;
}
.back-link:hover { background: rgba(103,194,58,0.1); color: #43a047; }
.back-arrow { font-size: 16px; }
.page-title { display: flex; align-items: center; gap: 8px; }
.page-title h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #7b1fa2, #1565c0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.page-title span { font-size: 26px; }
.header-badge {
  background: linear-gradient(135deg, #7b1fa2, #9c27b0);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

/* ── Food strip ── */
.food-strip { display: flex; justify-content: center; gap: 16px; padding: 8px 0; }
.bottom-strip { padding: 20px 0 4px; }
.fs-icon { font-size: 20px; animation: float 3s ease-in-out infinite; display: inline-block; }
.fs-icon:nth-child(2) { animation-delay: .4s; }
.fs-icon:nth-child(3) { animation-delay: .8s; }
.fs-icon:nth-child(4) { animation-delay: 1.2s; }
.fs-icon:nth-child(5) { animation-delay: 1.6s; }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

/* ── Main prompt card ── */
.prompt-card {
  background: rgba(255,255,255,0.94);
  border-radius: 22px;
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Select section ── */
.select-section { display: flex; flex-direction: column; gap: 8px; }
.select-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 600;
  color: #606266;
}
.prompt-select { width: 100%; }
:deep(.el-select .el-input__inner) {
  border-radius: 12px;
  height: 44px;
  font-size: 14px;
}
.opt-icon { margin-right: 6px; }

/* ── Input section ── */
.input-section { display: flex; flex-direction: column; gap: 8px; }
.input-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 600;
  color: #606266;
}
.prompt-autocomplete { width: 100%; }
:deep(.prompt-autocomplete .el-input__inner) { border-radius: 12px; height: 44px; font-size: 14px; }

/* ── Loading ── */
.loading-state {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(103,194,58,0.06);
  border-radius: 14px;
  font-size: 14px;
  color: #606266;
}
.spinner {
  width: 22px; height: 22px;
  border: 2px solid rgba(103,194,58,0.2);
  border-top-color: #43a047;
  border-radius: 50%;
  animation: spin .8s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Results section ── */
.results-section { display: flex; flex-direction: column; gap: 12px; }
.results-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--accent) 8%, white);
  border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
}
.rh-icon { font-size: 22px; }
.results-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
}

/* ── Result card ── */
.result-card {
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
}
.result-text {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.7;
  color: #303133;
}
.result-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.result-tag {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--tc);
  background: color-mix(in srgb, var(--tc) 10%, white);
  border: 1px solid color-mix(in srgb, var(--tc) 20%, transparent);
}
.result-num { font-size: 12px; color: #c0c4cc; font-weight: 500; }

/* ── Recipe blocks ── */
.recipe-block { margin-bottom: 12px; }
.recipe-block-title {
  font-size: 13px;
  font-weight: 700;
  color: #e53935;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.encourage-block {
  background: rgba(255,243,224,0.6);
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 12px;
}
.encourage-title {
  font-size: 13px;
  font-weight: 700;
  color: #f57c00;
  margin-bottom: 4px;
}
.encourage-text { color: #6d4c41 !important; }

/* ── Global text formatting from v-html ── */
:deep(.list-number) { font-weight: 700; color: #43a047; }
:deep(.recipe-step) { font-weight: 700; color: #1565c0; display: block; margin-top: 8px; }
:deep(.ingredients-title) { font-weight: 700; color: #e53935; display: block; margin-top: 8px; }
:deep(.instructions-title) { font-weight: 700; color: #7b1fa2; display: block; margin-top: 8px; }
:deep(.tip-title) { font-weight: 700; color: #ff9800; }

.empty-alert { border-radius: 12px; }

@media (max-width: 600px) {
  .prompt-card { padding: 16px 14px; }
}
</style>
