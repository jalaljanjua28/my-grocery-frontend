<template>
  <el-card>
    <el-collapse :accordion="true">
      <div>
        <!-- Food Waste Reduction Suggestions Section -->
        <el-collapse-item title="Food Waste Reduction Suggestions">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayWasteReduction && !loading">
              <div
                v-for="(suggestion, index) in foodWasteReductionSuggestions"
                :key="index"
                :body-style="{ height: 'auto' }"
              >
                <p>
                  <strong>Food Waste Reduction Suggestion:</strong>
                  {{ suggestion["Food Waste Reduction Suggestion"] }}
                </p>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <!-- Ethical Eating Suggestions Section -->
        <el-collapse-item title="Ethical Eating Suggestions">
          <div>
            <!-- Loading indicator -->
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayEthicalSuggestions && !loading">
              <!-- Display generated suggestions -->
              <div
                v-for="(group, index) in ethicalEatingSuggestions"
                :key="index"
              >
                <div>
                  <p>
                    <strong>Ingredients:</strong>
                    {{ group["Group of Items"].join(", ") }}
                  </p>
                </div>
                <p>
                  <strong>Ethical Eating Suggestions:</strong>
                  {{ group["Ethical Eating Suggestions"] }}
                </p>
              </div>
              <el-button
                @click="
                  fetchData(
                    'gpt',
                    '/api/ethical-eating-suggestion-using-gpt',
                    'ethicalEatingSuggestions'
                  )
                "
                :loading="loading"
                type="info"
                plain
                style="margin-left: 0px !important"
              >
                Generate Prompt
              </el-button>
            </div>
          </div>
        </el-collapse-item>
        <!-- Fun Facts Section -->
        <el-collapse-item title="Fun Facts">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayFunFacts && !loading">
              <div
                v-for="(fact, index) in funFacts"
                :key="index"
                :body-style="{ height: 'auto' }"
              >
                <p>
                  <strong>Food Items:</strong>
                  {{ fact["Food Item"] }}
                </p>
                <p><strong>Fun Facts:</strong> {{ fact["Fun Facts"] }}</p>
              </div>
            </div>
            <el-alert v-if="errorMessage" title="Error" type="error">{{
              errorMessage
            }}</el-alert>
          </div>
          <el-button
            @click="
              fetchData('gpt', '/api/get-fun-facts-using-gpt', 'funFacts')
            "
            :loading="loading"
            type="info"
            plain
            style="margin-left: 0px !important"
          >
            Generate Prompt
          </el-button>
        </el-collapse-item>
        <!-- Cooking Tips Section -->
        <el-collapse-item title="Cooking Tips">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayCookingTips && !loading">
              <div v-for="(tip, index) in cookingTips" :key="index">
                <p><strong>Cooking Tips: </strong>{{ tip["Cooking Tip"] }}</p>
              </div>
            </div>
            <div v-if="!cookingTips && !loading">
              <el-alert title="No Cooking Tips" type="info" show-icon>
                No cooking tips available.
              </el-alert>
            </div>
            <el-button
              @click="
                fetchData('gpt', '/api/cooking-tips-using-gpt', 'cookingTips')
              "
              :loading="loading"
              type="info"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>
        <!-- Current Trends Section -->
        <el-collapse-item title="Current Trends">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayCurrentTrends && !loading">
              <div v-for="(trend, index) in currentTrends" :key="index">
                <p><strong>Current Trends:</strong>{{ trend["Fun Facts"] }}</p>
              </div>
            </div>
            <div v-if="!currentTrends && !loading">
              <el-alert title="No Fun Facts" type="info" show-icon>
                No current food trends available.
              </el-alert>
            </div>
            <el-button
              @click="
                fetchData(
                  'gpt',
                  '/api/current-trends-using-gpt',
                  'currentTrends'
                )
              "
              :loading="loading"
              type="info"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>
        <!-- Food Handling  Section -->
        <el-collapse-item title="Food Handling Advice">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayFoodHandling && !loading">
              <div v-for="(item, index) in handlingadvice" :key="index">
                <p><strong>Food Items:</strong> {{ item["Food Item"] }}</p>
                <p>
                  <strong>Handling Advice:</strong>
                  {{ item["Handling Advice"] }}
                </p>
              </div>
            </div>
            <div v-if="!displayFoodHandling">
              <el-alert title="No handling Advice" type="info" show-icon>
                No health handling advice available.
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
              :loading="loading"
              type="info"
              plain
            >
              Generate Prompt
            </el-button>
          </div>
        </el-collapse-item>
        <!-- Mood Changer Section -->
        <el-collapse-item title="Mood Changer Suggestion">
          <div>
            <div v-if="loading" class="loading-indicator">
              <el-spinner></el-spinner>
            </div>
            <div v-if="displayMood && !loading">
              <div
                v-for="(suggestion, index) in moodChangerSuggestions"
                :key="index"
              >
                <p>
                  <strong>Food Suggestion: </strong
                  >{{ suggestion["Food Suggestion"] }}
                </p>
              </div>
            </div>
            <div v-if="displayMood.length === 0 && !loading">
              <el-alert
                title="No Mood Changer Suggestion"
                type="info"
                show-icon
              >
                No Mood Changer Suggestion available.
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
const baseUrl = "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api";

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
      displayMood: "true",
      displayEthicalSuggestions: "true",
      displayCookingTips: "true",
      displayCurrentTrends: "true",
      displayWasteReduction: "true",
      displayFunFacts: "true",
      displayFoodHandling: "true",
      loading: false,
      error: false,
      currentUser: null,
      errorMessage: null,
    };
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
        this.loading = true;
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
        }
        this.loading = false;
      } catch (error) {
        this.errorMessage = error.message;
        console.error("Error in fetchData:", error);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 10px;
}
</style>
