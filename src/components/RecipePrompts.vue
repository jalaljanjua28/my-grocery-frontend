<template>
  <div>
    <el-card>
      <el-collapse :accordion="true">
        <div class="recipe-container">
          <!-- Fusion Suggestions Section -->
          <el-collapse-item title="Food Fusion Suggestions">
            <div>
              <div v-if="!isLoading">
                <div
                  v-for="(suggestion, index) in fusionSuggestions"
                  :key="index"
                >
                  <p>
                    <strong> Fusion Cuisine Suggestion:</strong>
                    {{ suggestion["Fusion Cuisine Suggestion"] }}
                  </p>
                  <p style="color: red">
                    For custom prompts go to the user defined prompt section
                  </p>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <!-- User Defined Dish Section -->
          <el-collapse-item title="User Defined Dish">
            <div>
              <div v-if="!isLoading">
                <div v-for="(fact, index) in definedDishes" :key="index">
                  <p><strong>Fun Facts:</strong> {{ fact["Fun Facts"] }}</p>
                  <p style="color: red">
                    For custom prompts go to the user defined prompt section
                  </p>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <!-- Unique Recipe Section -->
          <el-collapse-item title="Unique Recipe">
            <div>
              <div v-if="!isLoading">
                <div v-for="(recipe, index) in uniqueRecipes" :key="index">
                  <p><strong>Recipe:</strong> {{ recipe["Recipe"] }}</p>
                  <p>
                    <strong>Encouragement:</strong>
                    {{ recipe["Encouragement"] }}
                  </p>
                  <p style="color: red">
                    For custom prompts go to the user defined prompt section
                  </p>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <!-- Diet Schedule Section -->
          <el-collapse-item title="Diet Schedule">
            <div>
              <div v-if="!isLoading">
                <div v-for="(meal, index) in dietSchedule" :key="index">
                  <p slot="header">
                    Meal Number {{ meal["Meal Number"] }} -
                    {{ meal["Meal Category"] }}
                  </p>
                  <p><Strong>Food Item: </Strong>{{ meal["Food Item"] }}</p>
                  <p>
                    <strong>Meal Suggestion: </strong
                    >{{ meal["Meal Suggestion"] }}
                  </p>
                </div>
              </div>
              <el-button
                @click="
                  fetchData('gpt', '/diet-schedule-using-gpt', 'dietSchedule')
                "
                type="info"
                plain
                :loading="isLoading"
                >Generate Prompt</el-button
              >
            </div>
          </el-collapse-item>
          <!-- Generated Recipes Section -->
          <el-collapse-item title="Generated Recipes">
            <div>
              <div v-if="!isLoading">
                <div v-for="(recipe, index) in generatedRecipes" :key="index">
                  <p slot="header">
                    <strong>Group of Items:</strong>
                    {{ recipe["Group of Items"].join(", ") }}
                  </p>
                  <p>
                    <strong>Generated Recipe:</strong>
                    {{ recipe["Generated Recipe"] }}
                  </p>
                </div>
              </div>
              <el-button
                @click="
                  fetchData('gpt', '/recipes-using-gpt', 'generatedRecipes')
                "
                type="info"
                plain
                :loading="isLoading"
                >Generate Prompt</el-button
              >
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
    </el-card>
  </div>
</template>
<script>
import { auth } from "../Firebase.js";
import { onAuthStateChanged } from "firebase/auth";
const baseUrl = "http://127.0.0.1:8081/api";

export default {
  data() {
    return {
      fusionSuggestions: [],
      definedDishes: [],
      uniqueRecipes: [],
      dietSchedule: [],
      generatedRecipes: [],
      isLoading: false,
    };
  },
  async mounted() {
    // Check authentication state
    this.checkAuthState();
  },

  methods: {
    checkAuthState() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.currentUser = user;
          console.log("User is logged in:", user.email);
          try {
            await this.fetchData(
              "json",
              "/fusion-cuisine-suggestions-using-json",
              "fusionSuggestions"
            );
            await this.fetchData(
              "json",
              "/user-defined-dish-using-json",
              "definedDishes"
            );
            await this.fetchData(
              "json",
              "/unique-recipes-using-json",
              "uniqueRecipes"
            );
            await this.fetchData(
              "json",
              "/diet-schedule-using-json",
              "dietSchedule"
            );
            await this.fetchData(
              "json",
              "/recipes-using-json",
              "generatedRecipes"
            );
          } catch (error) {
            console.error("Error loading data:", error);
          }
        } else {
          console.log("User is not logged in");
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
          this[property] = []; // Ensure property is set to an empty array if not found
        }
        this.isLoading = false;
      } catch (error) {
        this.error = error.message;
        this.isLoading = false;
      }
    },
  },
};
</script>
