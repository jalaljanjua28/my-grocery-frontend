<template>
  <el-card>
    <el-collapse :accordion="true">
      <div>
        <!-- Food Waste Reduction Suggestions Section -->
        <el-collapse-item title="Food Waste Reduction Suggestions">
          <template #title>
            <div class="section-title">
              <img
                src="https://cdn-icons-png.flaticon.com/512/415/415682.png"
                class="fruit-icon"
                alt="Apple icon"
              />
              Food Waste Reduction Suggestions
            </div>
          </template>
          <div class="prompt-section">
            <div v-if="!isLoading" class="scrollable-container">
              <template v-if="hasValidFoodWasteReductionSuggestions">
                <div
                  v-for="(suggestion, index) in foodWasteReductionSuggestions"
                  :key="index"
                  class="suggestion-item food-waste-item"
                >
                  <p
                    v-if="
                      suggestion['Food Waste Reduction Suggestion'] &&
                      suggestion['Food Waste Reduction Suggestion'].trim()
                    "
                  >
                    <strong>Food Waste Reduction Suggestion:</strong>
                    <span
                      v-html="
                        formatNumberedList(
                          suggestion['Food Waste Reduction Suggestion']
                        )
                      "
                    ></span>
                  </p>
                  <p style="color: #e6a23c">
                    For custom prompts go to the user defined prompt section
                  </p>
                  <el-divider
                    v-if="index < foodWasteReductionSuggestions.length - 1"
                  ></el-divider>
                </div>
              </template>
              <!-- Add empty state notification -->
              <el-alert
                v-if="!hasValidFoodWasteReductionSuggestions"
                title="No Food Waste Reduction Suggestions"
                type="info"
                show-icon
              >
                No food waste reduction suggestions available.
              </el-alert>
            </div>
          </div>
        </el-collapse-item>

        <!-- Ethical Eating Suggestions Section -->
        <el-collapse-item title="Ethical Eating Suggestions">
          <template #title>
            <div class="section-title">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2909/2909841.png"
                class="fruit-icon"
                alt="Leaf icon"
              />
              Ethical Eating Suggestions
            </div>
          </template>
          <div class="prompt-section">
            <div v-if="!isLoading" class="scrollable-container">
              <template v-if="hasValidEthicalSuggestions">
                <div
                  v-for="(group, index) in ethicalEatingSuggestions"
                  :key="index"
                  class="suggestion-item ethical-item"
                >
                  <div
                    v-if="
                      Array.isArray(group['Group of Items']) &&
                      group['Group of Items'].length > 0
                    "
                  >
                    <p>
                      <strong>Ingredients:</strong>
                      {{ group["Group of Items"].join(", ") }}
                    </p>
                  </div>
                  <p
                    v-if="
                      group['Ethical Eating Suggestions'] &&
                      group['Ethical Eating Suggestions'].trim()
                    "
                  >
                    <strong>Ethical Eating Suggestions:</strong>
                    <span
                      v-html="formatText(group['Ethical Eating Suggestions'])"
                    ></span>
                  </p>
                  <el-divider
                    v-if="index < ethicalEatingSuggestions.length - 1"
                  ></el-divider>
                </div>
              </template>
              <!-- Add empty state notification -->
              <el-alert
                v-if="!hasValidEthicalSuggestions"
                title="No Ethical Eating Suggestions"
                type="info"
                show-icon
              >
                No ethical eating suggestions available.
              </el-alert>
              <el-alert v-if="errorMessage" title="Error" type="error">{{
                errorMessage
              }}</el-alert>
            </div>
            <el-button
              @click="
                fetchData(
                  'gpt',
                  '/ethical-eating-suggestion-using-gpt',
                  'ethicalEatingSuggestions'
                )
              "
              :loading="isLoading"
              type="success"
              plain
              style="margin-left: 0px !important"
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>

        <!-- Fun Facts Section -->
        <el-collapse-item title="Fun Facts">
          <template #title>
            <div class="section-title">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1625/1625099.png"
                class="fruit-icon"
                alt="Mango icon"
              />
              Fun Facts
            </div>
          </template>
          <div class="prompt-section">
            <div v-if="!isLoading" class="scrollable-container">
              <template v-if="hasValidFunFacts">
                <div
                  v-for="(fact, index) in funFacts"
                  :key="index"
                  class="suggestion-item fun-facts-item"
                >
                  <p v-if="fact['Food Item'] && fact['Food Item'].trim()">
                    <strong>Food Items:</strong>
                    {{ fact["Food Item"] }}
                  </p>
                  <p v-if="fact['Fun Facts'] && fact['Fun Facts'].trim()">
                    <strong>Fun Facts:</strong>
                    <span v-html="formatText(fact['Fun Facts'])"></span>
                  </p>
                  <el-divider v-if="index < funFacts.length - 1"></el-divider>
                </div>
              </template>
              <!-- Add empty state notification -->
              <el-alert
                v-if="!hasValidFunFacts"
                title="No Fun Facts"
                type="info"
                show-icon
              >
                No fun facts available.
              </el-alert>
              <el-alert v-if="errorMessage" title="Error" type="error">{{
                errorMessage
              }}</el-alert>
            </div>
            <el-button
              @click="fetchData('gpt', '/get-fun-facts-using-gpt', 'funFacts')"
              :loading="isLoading"
              type="warning"
              plain
              style="margin-left: 0px !important"
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>

        <!-- Cooking Tips Section -->
        <el-collapse-item title="Cooking Tips">
          <template #title>
            <div class="section-title">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2909/2909838.png"
                class="fruit-icon"
                alt="Peach icon"
              />
              Cooking Tips
            </div>
          </template>
          <div class="prompt-section">
            <div v-if="!isLoading" class="scrollable-container">
              <template v-if="hasValidCookingTips">
                <div
                  v-for="(tip, index) in cookingTips"
                  :key="index"
                  class="suggestion-item cooking-tips-item"
                >
                  <p v-if="tip['Cooking Tip'] && tip['Cooking Tip'].trim()">
                    <strong>Cooking Tips: </strong>
                    <span
                      v-html="formatNumberedList(tip['Cooking Tip'])"
                    ></span>
                  </p>
                  <el-divider
                    v-if="index < cookingTips.length - 1"
                  ></el-divider>
                </div>
              </template>
              <!-- Empty state notification -->
              <el-alert
                v-if="!hasValidCookingTips"
                title="No Cooking Tips"
                type="warning"
                show-icon
              >
                No cooking tips available.
              </el-alert>
            </div>
            <el-button
              @click="
                fetchData('gpt', '/cooking-tips-using-gpt', 'cookingTips')
              "
              :loading="isLoading"
              type="info"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>

        <!-- Current Trends Section -->
        <el-collapse-item title="Current Trends">
          <template #title>
            <div class="section-title">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3143/3143640.png"
                class="fruit-icon"
                alt="Pineapple icon"
              />
              Current Trends
            </div>
          </template>
          <div class="prompt-section">
            <div v-if="!isLoading" class="scrollable-container">
              <template v-if="hasValidCurrentTrends">
                <div
                  v-for="(trend, index) in currentTrends"
                  :key="index"
                  class="suggestion-item trends-item"
                >
                  <p v-if="trend['Fun Facts'] && trend['Fun Facts'].trim()">
                    <strong>Current Trends:</strong>
                    <span
                      v-html="formatNumberedList(trend['Fun Facts'])"
                    ></span>
                  </p>
                  <el-divider
                    v-if="index < currentTrends.length - 1"
                  ></el-divider>
                </div>
              </template>
              <!-- Empty state notification -->
              <el-alert
                v-if="!hasValidCurrentTrends"
                title="No Current Trends"
                type="info"
                show-icon
              >
                No current food trends available.
              </el-alert>
            </div>
            <el-button
              @click="
                fetchData('gpt', '/current-trends-using-gpt', 'currentTrends')
              "
              :loading="isLoading"
              type="success"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>

        <!-- Food Handling Section -->
        <el-collapse-item title="Food Handling Advice">
          <template #title>
            <div class="section-title">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1652/1652077.png"
                class="fruit-icon"
                alt="Potato icon"
              />
              Food Handling Advice
            </div>
          </template>
          <div class="prompt-section">
            <div v-if="!isLoading" class="scrollable-container">
              <template v-if="hasValidHandlingAdvice">
                <div
                  v-for="(item, index) in handlingadvice"
                  :key="index"
                  class="suggestion-item handling-item"
                >
                  <p v-if="item['Food Item'] && item['Food Item'].trim()">
                    <strong>Food Items:</strong> {{ item["Food Item"] }}
                  </p>
                  <p
                    v-if="
                      item['Handling Advice'] && item['Handling Advice'].trim()
                    "
                  >
                    <strong>Handling Advice:</strong>
                    <span v-html="formatText(item['Handling Advice'])"></span>
                  </p>
                  <el-divider
                    v-if="index < handlingadvice.length - 1"
                  ></el-divider>
                </div>
              </template>
              <!-- Empty state notification -->
              <el-alert
                v-if="!hasValidHandlingAdvice"
                title="No Handling Advice"
                type="success"
                show-icon
              >
                No food handling advice available.
              </el-alert>
            </div>
            <el-button
              @click="
                fetchData(
                  'gpt',
                  '/food-handling-advice-using-gpt',
                  'handlingadvice'
                )
              "
              :loading="isLoading"
              type="danger"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>

        <!-- Mood Changer Section -->
        <el-collapse-item title="Mood Changer Suggestion">
          <template #title>
            <div class="section-title">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                class="fruit-icon"
                alt="Strawberry icon"
              />
              Mood Changer Suggestion
            </div>
          </template>
          <div class="prompt-section">
            <div v-if="!isLoading" class="scrollable-container">
              <template v-if="hasValidMoodChangerSuggestions">
                <div
                  v-for="(suggestion, index) in moodChangerSuggestions"
                  :key="index"
                  class="suggestion-item mood-item"
                >
                  <p
                    v-if="
                      suggestion['Food Suggestion'] &&
                      suggestion['Food Suggestion'].trim()
                    "
                  >
                    <strong>Food Suggestion: </strong>
                    <span
                      v-html="formatText(suggestion['Food Suggestion'])"
                    ></span>
                  </p>
                  <p style="color: red">
                    For custom prompts go to the user defined prompt section
                  </p>
                  <el-divider
                    v-if="index < moodChangerSuggestions.length - 1"
                  ></el-divider>
                </div>
              </template>
              <!-- Empty state notification -->
              <el-alert
                v-if="!hasValidMoodChangerSuggestions"
                title="No Mood Changer Suggestions"
                type="danger"
                show-icon
              >
                Go to the custom prompt section to generate a mood prompt.
              </el-alert>
            </div>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
  </el-card>
</template>

<script>
import { auth } from "../Firebase.js";
import { onAuthStateChanged } from "firebase/auth"; // Correctly import onAuthStateChanged from firebase/auth
const baseUrl = "https://my-grocery-app-888361723877.us-central1.run.app/api";

export default {
  data() {
    return {
      funFacts: [],
      cookingTips: [],
      currentTrends: [],
      handlingadvice: [],
      foodSuggestions: [],
      ethicalEatingSuggestions: [],
      foodWasteReductionSuggestions: [],
      moodChangerSuggestions: [],
      isLoading: false,
      error: true,
      currentUser: null,
      errorMessage: null,
    };
  },
  computed: {
    hasValidFoodWasteReductionSuggestions() {
      if (
        !this.foodWasteReductionSuggestions ||
        this.foodWasteReductionSuggestions.length === 0
      ) {
        return false;
      }
      return this.foodWasteReductionSuggestions.some(
        (suggestion) =>
          suggestion["Food Waste Reduction Suggestion"] &&
          suggestion["Food Waste Reduction Suggestion"].trim() !== ""
      );
    },

    hasValidEthicalSuggestions() {
      if (
        !this.ethicalEatingSuggestions ||
        this.ethicalEatingSuggestions.length === 0
      ) {
        return false;
      }
      return this.ethicalEatingSuggestions.some((group) => {
        const hasItems =
          Array.isArray(group["Group of Items"]) &&
          group["Group of Items"].length > 0;
        const hasSuggestions =
          group["Ethical Eating Suggestions"] &&
          group["Ethical Eating Suggestions"].trim() !== "";
        return hasItems || hasSuggestions;
      });
    },

    hasValidFunFacts() {
      if (!this.funFacts || this.funFacts.length === 0) {
        return false;
      }
      return this.funFacts.some(
        (fact) =>
          (fact["Food Item"] && fact["Food Item"].trim() !== "") ||
          (fact["Fun Facts"] && fact["Fun Facts"].trim() !== "")
      );
    },

    hasValidCookingTips() {
      if (!this.cookingTips || this.cookingTips.length === 0) {
        return false;
      }
      return this.cookingTips.some(
        (tip) => tip["Cooking Tip"] && tip["Cooking Tip"].trim() !== ""
      );
    },

    hasValidCurrentTrends() {
      if (!this.currentTrends || this.currentTrends.length === 0) {
        return false;
      }
      return this.currentTrends.some(
        (trend) => trend["Fun Facts"] && trend["Fun Facts"].trim() !== ""
      );
    },

    hasValidHandlingAdvice() {
      if (!this.handlingadvice || this.handlingadvice.length === 0) {
        return false;
      }
      return this.handlingadvice.some(
        (advice) =>
          (advice["Food Item"] && advice["Food Item"].trim() !== "") ||
          (advice["Handling Advice"] && advice["Handling Advice"].trim() !== "")
      );
    },

    hasValidMoodChangerSuggestions() {
      if (
        !this.moodChangerSuggestions ||
        this.moodChangerSuggestions.length === 0
      ) {
        return false;
      }
      return this.moodChangerSuggestions.some(
        (suggestion) =>
          suggestion["Food Suggestion"] &&
          suggestion["Food Suggestion"].trim() !== ""
      );
    },
  },
  async mounted() {
    // Check authentication state
    this.checkAuthState();
  },
  methods: {
    async checkAuthState() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.currentUser = user;
          console.log("User is logged in:", user.email);
          // Fetch data only after user is authenticated
          try {
            await this.fetchData(
              "json",
              "/ethical-eating-suggestion-using-json",
              "ethicalEatingSuggestions"
            );
            await this.fetchData(
              "json",
              "/get-fun-facts-using-json",
              "funFacts"
            );
            await this.fetchData(
              "json",
              "/food-waste-reduction-using-json",
              "foodWasteReductionSuggestions"
            );
            await this.fetchData(
              "json",
              "/food-handling-advice-using-json",
              "handlingadvice"
            );
            await this.fetchData(
              "json",
              "/current-trends-using-json",
              "currentTrends"
            );
            await this.fetchData(
              "json",
              "/cooking-tips-using-json",
              "cookingTips"
            );
            await this.fetchData(
              "json",
              "/mood-changer-using-json",
              "moodChangerSuggestions"
            );
          } catch (error) {
            console.error("Error loading data:", error);
          }
        } else {
          console.log("No user is logged in");
          this.currentUser = null;
        }
      });
    },
    async fetchData(type, endpoint, property) {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
        console.log("idToken", idToken);
        this.isLoading = true;
        let response;
        if (type === "json") {
          response = await fetch(baseUrl + endpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          });
        } else if (type === "gpt") {
          await fetch(baseUrl + endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({}),
          });
          response = await fetch(baseUrl + endpoint, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
        } else {
          throw new Error("Invalid request type.");
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data Received:", data);
        if (property in data) {
          this[property] = data[property] || [];
          console.log(data[property]);
        } else {
          console.error(
            `Property '${property}' not found in the server response.`
          );
          this[property] = []; // Ensure property is set to an empty array if not found
        }
        this.isLoading = false;
      } catch (error) {
        this.errorMessage = error.message;
        console.error("Error in fetchData:", error);
      }
    },
    formatNumberedList(text) {
      if (!text) return "";
      // Replace numbered patterns like "1. ", "2. " etc. with line breaks before them
      // Except for the first one
      return text.replace(/(\d+\.\s)/g, (match, p1, offset) => {
        return offset === 0 ? p1 : "<br><br>" + p1;
      });
    },

    formatText(text) {
      if (!text) return "";
      // Add line breaks for general text that might need formatting
      return text.replace(/\.\s+(?=[A-Z])/g, ".<br><br>");
    },
  },
};
</script>

<style scoped></style>
