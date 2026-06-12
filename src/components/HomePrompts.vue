<template>
  <el-collapse :accordion="true" class="prompts-collapse">
    <div>

      <!-- Food Waste Reduction -->
      <el-collapse-item class="prompt-item">
        <template #title>
          <div class="item-title" style="--accent:#4caf50">
            <span class="title-icon">♻️</span>
            <span class="title-text">Food Waste Reduction</span>
            <span class="title-badge" style="--bc:#4caf50">Eco</span>
          </div>
        </template>
        <div class="item-body">
          <div v-if="!isLoading" class="content-scroll">
            <template v-if="hasValidFoodWasteReductionSuggestions">
              <div v-for="(s, i) in foodWasteReductionSuggestions" :key="i" class="prompt-card waste-card">
                <p v-if="s['Food Waste Reduction Suggestion'] && s['Food Waste Reduction Suggestion'].trim()" class="card-text">
                  <span v-html="formatNumberedList(s['Food Waste Reduction Suggestion'])"></span>
                </p>
                <p class="card-hint">For custom prompts → <router-link to="/user-defined-prompt" class="hint-link">User Defined Prompts</router-link></p>
              </div>
            </template>
            <div v-if="!hasValidFoodWasteReductionSuggestions" class="empty-state">
              <span class="empty-icon">♻️</span>
              <p>No food waste reduction suggestions available.</p>
            </div>
          </div>
          <div v-if="isLoading" class="loading-row"><div class="mini-spinner"></div><span>Loading…</span></div>
        </div>
      </el-collapse-item>

      <!-- Ethical Eating -->
      <el-collapse-item class="prompt-item">
        <template #title>
          <div class="item-title" style="--accent:#43a047">
            <span class="title-icon">🌱</span>
            <span class="title-text">Ethical Eating</span>
            <span class="title-badge" style="--bc:#43a047">GPT</span>
          </div>
        </template>
        <div class="item-body">
          <div v-if="!isLoading" class="content-scroll">
            <template v-if="hasValidEthicalSuggestions">
              <div v-for="(g, i) in ethicalEatingSuggestions" :key="i" class="prompt-card ethical-card">
                <div v-if="Array.isArray(g['Group of Items']) && g['Group of Items'].length > 0" class="ingredient-tags">
                  <span class="tag-label">🥕 Ingredients</span>
                  <div class="tags">
                    <span v-for="(it, j) in g['Group of Items']" :key="j" class="ing-tag">{{ it }}</span>
                  </div>
                </div>
                <p v-if="g['Ethical Eating Suggestions'] && g['Ethical Eating Suggestions'].trim()" class="card-text">
                  <span v-html="formatText(g['Ethical Eating Suggestions'])"></span>
                </p>
              </div>
            </template>
            <div v-if="!hasValidEthicalSuggestions" class="empty-state">
              <span class="empty-icon">🌱</span>
              <p>No ethical eating suggestions yet.</p>
            </div>
            <el-alert v-if="errorMessage" title="Error" type="error" :closable="false" style="border-radius:10px">{{ errorMessage }}</el-alert>
          </div>
          <div v-if="isLoading" class="loading-row"><div class="mini-spinner"></div><span>Generating…</span></div>
          <el-button @click="fetchData('gpt', '/ethical-eating-suggestion-using-gpt', 'ethicalEatingSuggestions')" :loading="isLoading" type="success" plain size="small" class="generate-btn">
            ✨ Generate Prompt
          </el-button>
        </div>
      </el-collapse-item>

      <!-- Fun Facts -->
      <el-collapse-item class="prompt-item">
        <template #title>
          <div class="item-title" style="--accent:#ff9800">
            <span class="title-icon">🥭</span>
            <span class="title-text">Fun Facts</span>
            <span class="title-badge" style="--bc:#ff9800">GPT</span>
          </div>
        </template>
        <div class="item-body">
          <div v-if="!isLoading" class="content-scroll">
            <template v-if="hasValidFunFacts">
              <div v-for="(fact, i) in funFacts" :key="i" class="prompt-card facts-card">
                <p v-if="fact['Food Item'] && fact['Food Item'].trim()" class="card-food-item">
                  🍽️ {{ fact['Food Item'] }}
                </p>
                <p v-if="fact['Fun Facts'] && fact['Fun Facts'].trim()" class="card-text">
                  <span v-html="formatText(fact['Fun Facts'])"></span>
                </p>
              </div>
            </template>
            <div v-if="!hasValidFunFacts" class="empty-state">
              <span class="empty-icon">🥭</span>
              <p>No fun facts available yet.</p>
            </div>
          </div>
          <div v-if="isLoading" class="loading-row"><div class="mini-spinner"></div><span>Generating…</span></div>
          <el-button @click="fetchData('gpt', '/get-fun-facts-using-gpt', 'funFacts')" :loading="isLoading" type="warning" plain size="small" class="generate-btn">
            ✨ Generate Fun Facts
          </el-button>
        </div>
      </el-collapse-item>

      <!-- Cooking Tips -->
      <el-collapse-item class="prompt-item">
        <template #title>
          <div class="item-title" style="--accent:#2196f3">
            <span class="title-icon">👨‍🍳</span>
            <span class="title-text">Cooking Tips</span>
            <span class="title-badge" style="--bc:#2196f3">GPT</span>
          </div>
        </template>
        <div class="item-body">
          <div v-if="!isLoading" class="content-scroll">
            <template v-if="hasValidCookingTips">
              <div v-for="(tip, i) in cookingTips" :key="i" class="prompt-card tips-card">
                <p v-if="tip['Cooking Tip'] && tip['Cooking Tip'].trim()" class="card-text">
                  <span v-html="formatNumberedList(tip['Cooking Tip'])"></span>
                </p>
              </div>
            </template>
            <div v-if="!hasValidCookingTips" class="empty-state">
              <span class="empty-icon">👨‍🍳</span>
              <p>No cooking tips available yet.</p>
            </div>
          </div>
          <div v-if="isLoading" class="loading-row"><div class="mini-spinner"></div><span>Generating…</span></div>
          <el-button @click="fetchData('gpt', '/cooking-tips-using-gpt', 'cookingTips')" :loading="isLoading" type="primary" plain size="small" class="generate-btn">
            ✨ Generate Cooking Tips
          </el-button>
        </div>
      </el-collapse-item>

      <!-- Current Trends -->
      <el-collapse-item class="prompt-item">
        <template #title>
          <div class="item-title" style="--accent:#9c27b0">
            <span class="title-icon">📈</span>
            <span class="title-text">Current Trends</span>
            <span class="title-badge" style="--bc:#9c27b0">GPT</span>
          </div>
        </template>
        <div class="item-body">
          <div v-if="!isLoading" class="content-scroll">
            <template v-if="hasValidCurrentTrends">
              <div v-for="(trend, i) in currentTrends" :key="i" class="prompt-card trends-card">
                <p v-if="trend['Fun Facts'] && trend['Fun Facts'].trim()" class="card-text">
                  <span v-html="formatNumberedList(trend['Fun Facts'])"></span>
                </p>
              </div>
            </template>
            <div v-if="!hasValidCurrentTrends" class="empty-state">
              <span class="empty-icon">📈</span>
              <p>No food trends available yet.</p>
            </div>
          </div>
          <div v-if="isLoading" class="loading-row"><div class="mini-spinner"></div><span>Generating…</span></div>
          <el-button @click="fetchData('gpt', '/current-trends-using-gpt', 'currentTrends')" :loading="isLoading" type="success" plain size="small" class="generate-btn">
            ✨ Generate Trends
          </el-button>
        </div>
      </el-collapse-item>

      <!-- Food Handling -->
      <el-collapse-item class="prompt-item">
        <template #title>
          <div class="item-title" style="--accent:#e53935">
            <span class="title-icon">🥔</span>
            <span class="title-text">Food Handling Advice</span>
            <span class="title-badge" style="--bc:#e53935">GPT</span>
          </div>
        </template>
        <div class="item-body">
          <div v-if="!isLoading" class="content-scroll">
            <template v-if="hasValidHandlingAdvice">
              <div v-for="(item, i) in handlingadvice" :key="i" class="prompt-card handling-card">
                <p v-if="item['Food Item'] && item['Food Item'].trim()" class="card-food-item">🥔 {{ item['Food Item'] }}</p>
                <p v-if="item['Handling Advice'] && item['Handling Advice'].trim()" class="card-text">
                  <span v-html="formatText(item['Handling Advice'])"></span>
                </p>
              </div>
            </template>
            <div v-if="!hasValidHandlingAdvice" class="empty-state">
              <span class="empty-icon">🥔</span>
              <p>No handling advice available yet.</p>
            </div>
          </div>
          <div v-if="isLoading" class="loading-row"><div class="mini-spinner"></div><span>Generating…</span></div>
          <el-button @click="fetchData('gpt', '/food-handling-advice-using-gpt', 'handlingadvice')" :loading="isLoading" type="danger" plain size="small" class="generate-btn">
            ✨ Generate Advice
          </el-button>
        </div>
      </el-collapse-item>

      <!-- Mood Changer -->
      <el-collapse-item class="prompt-item">
        <template #title>
          <div class="item-title" style="--accent:#f06292">
            <span class="title-icon">🍓</span>
            <span class="title-text">Mood Changer</span>
            <span class="title-badge" style="--bc:#f06292">JSON</span>
          </div>
        </template>
        <div class="item-body">
          <div v-if="!isLoading" class="content-scroll">
            <template v-if="hasValidMoodChangerSuggestions">
              <div v-for="(s, i) in moodChangerSuggestions" :key="i" class="prompt-card mood-card">
                <p v-if="s['Food Suggestion'] && s['Food Suggestion'].trim()" class="card-text">
                  <span v-html="formatText(s['Food Suggestion'])"></span>
                </p>
                <p class="card-hint">For custom mood prompts → <router-link to="/user-defined-prompt" class="hint-link">User Defined Prompts</router-link></p>
              </div>
            </template>
            <div v-if="!hasValidMoodChangerSuggestions" class="empty-state">
              <span class="empty-icon">🍓</span>
              <p>Go to Custom Prompts to generate a mood suggestion.</p>
            </div>
          </div>
          <div v-if="isLoading" class="loading-row"><div class="mini-spinner"></div><span>Loading…</span></div>
        </div>
      </el-collapse-item>

    </div>
  </el-collapse>
</template>

<script>
import { auth } from "../Firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { API_BASE_URL as baseUrl } from "@/config.js";

export default {
  data() {
    return {
      funFacts: [],
      cookingTips: [],
      currentTrends: [],
      handlingadvice: [],
      ethicalEatingSuggestions: [],
      foodWasteReductionSuggestions: [],
      moodChangerSuggestions: [],
      isLoading: false,
      currentUser: null,
      errorMessage: null,
    };
  },
  computed: {
    hasValidFoodWasteReductionSuggestions() {
      return (this.foodWasteReductionSuggestions || []).some(s => s["Food Waste Reduction Suggestion"]?.trim());
    },
    hasValidEthicalSuggestions() {
      return (this.ethicalEatingSuggestions || []).some(g => (Array.isArray(g["Group of Items"]) && g["Group of Items"].length > 0) || g["Ethical Eating Suggestions"]?.trim());
    },
    hasValidFunFacts() {
      return (this.funFacts || []).some(f => f["Food Item"]?.trim() || f["Fun Facts"]?.trim());
    },
    hasValidCookingTips() {
      return (this.cookingTips || []).some(t => t["Cooking Tip"]?.trim());
    },
    hasValidCurrentTrends() {
      return (this.currentTrends || []).some(t => t["Fun Facts"]?.trim());
    },
    hasValidHandlingAdvice() {
      return (this.handlingadvice || []).some(a => a["Food Item"]?.trim() || a["Handling Advice"]?.trim());
    },
    hasValidMoodChangerSuggestions() {
      return (this.moodChangerSuggestions || []).some(s => s["Food Suggestion"]?.trim());
    },
  },
  async mounted() { this.checkAuthState(); },
  methods: {
    async checkAuthState() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.currentUser = user;
          try {
            await this.fetchData("json", "/ethical-eating-suggestion-using-json", "ethicalEatingSuggestions");
            await this.fetchData("json", "/get-fun-facts-using-json", "funFacts");
            await this.fetchData("json", "/food-waste-reduction-using-json", "foodWasteReductionSuggestions");
            await this.fetchData("json", "/food-handling-advice-using-json", "handlingadvice");
            await this.fetchData("json", "/current-trends-using-json", "currentTrends");
            await this.fetchData("json", "/cooking-tips-using-json", "cookingTips");
            await this.fetchData("json", "/mood-changer-using-json", "moodChangerSuggestions");
          } catch (e) { console.error(e); }
        }
      });
    },
    async fetchData(type, endpoint, property) {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
        const idToken = await user.getIdToken(true);
        this.isLoading = true;
        let response;
        if (type === "json") {
          response = await fetch(baseUrl + endpoint, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` } });
        } else {
          await fetch(baseUrl + endpoint, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` }, body: JSON.stringify({}) });
          response = await fetch(baseUrl + endpoint, { headers: { Authorization: `Bearer ${idToken}` } });
        }
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        this[property] = data[property] || [];
        this.isLoading = false;
      } catch (e) {
        this.errorMessage = e.message;
        console.error(e);
        this.isLoading = false;
      }
    },
    formatNumberedList(text) {
      if (!text) return "";
      return text.replace(/(\d+\.\s)/g, (m, p1, offset) => offset === 0 ? p1 : "<br><br>" + p1);
    },
    formatText(text) {
      if (!text) return "";
      return text.replace(/\.\s+(?=[A-Z])/g, ".<br><br>");
    },
  },
};
</script>

<style scoped>
/* ── Collapse container ── */
.prompts-collapse {
  border: none !important;
  background: transparent !important;
}
:deep(.el-collapse) { border: none; }
:deep(.el-collapse-item__wrap) {
  border: none;
  background: transparent;
}
:deep(.el-collapse-item__header) {
  border: none !important;
  background: transparent !important;
  height: auto !important;
  line-height: 1 !important;
  padding: 0 !important;
  margin-bottom: 4px;
}
:deep(.el-collapse-item) {
  background: rgba(255,255,255,0.7);
  border-radius: 14px;
  margin-bottom: 8px;
  border: 1px solid rgba(0,0,0,0.06);
  overflow: hidden;
  transition: box-shadow 0.18s;
}
:deep(.el-collapse-item:hover) {
  box-shadow: 0 3px 12px rgba(0,0,0,0.08);
}
:deep(.el-collapse-item__content) { padding: 0 !important; }
:deep(.el-collapse-item__arrow) {
  color: #c0c4cc;
  margin-right: 12px;
  font-size: 13px;
}

/* ── Item title ── */
.item-title {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 16px;
  width: 100%;
  border-left: 3px solid var(--accent);
  border-radius: 2px;
}
.title-icon { font-size: 18px; flex-shrink: 0; }
.title-text {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}
.title-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  color: var(--bc);
  background: color-mix(in srgb, var(--bc) 10%, white);
  border: 1px solid color-mix(in srgb, var(--bc) 20%, transparent);
  flex-shrink: 0;
}

/* ── Item body ── */
.item-body {
  padding: 4px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ── Content scroll area ── */
.content-scroll {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;
}

/* ── Individual prompt card ── */
.prompt-card {
  background: rgba(255,255,255,0.95);
  border-radius: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.waste-card  { border-left: 3px solid #4caf50; }
.ethical-card{ border-left: 3px solid #43a047; }
.facts-card  { border-left: 3px solid #ff9800; }
.tips-card   { border-left: 3px solid #2196f3; }
.trends-card { border-left: 3px solid #9c27b0; }
.handling-card{ border-left: 3px solid #e53935; }
.mood-card   { border-left: 3px solid #f06292; }

.card-text {
  margin: 0 0 6px;
  font-size: 13px;
  line-height: 1.65;
  color: #303133;
}
.card-food-item {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 700;
  color: #606266;
}
.card-hint {
  margin: 6px 0 0;
  font-size: 12px;
  color: #909399;
}
.hint-link { color: #409eff; text-decoration: none; font-weight: 600; }
.hint-link:hover { text-decoration: underline; }

/* ── Ingredient tags ── */
.ingredient-tags { margin-bottom: 10px; }
.tag-label { font-size: 12px; font-weight: 600; color: #43a047; display: block; margin-bottom: 6px; }
.tags { display: flex; flex-wrap: wrap; gap: 5px; }
.ing-tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  background: rgba(103,194,58,0.1);
  color: #2e7d32;
  border: 1px solid rgba(103,194,58,0.22);
}

/* ── Empty state ── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 22px 10px;
  opacity: 0.55;
}
.empty-icon { font-size: 28px; }
.empty-state p { margin: 0; font-size: 13px; color: #909399; text-align: center; }

/* ── Loading row ── */
.loading-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #606266;
  padding: 4px 0;
}
.mini-spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(103,194,58,0.2);
  border-top-color: #43a047;
  border-radius: 50%;
  animation: spin .7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Generate button ── */
.generate-btn { border-radius: 20px; font-size: 13px; margin-top: 2px; }
</style>
