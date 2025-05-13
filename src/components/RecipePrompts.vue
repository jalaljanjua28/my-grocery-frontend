<template>
  <div class="recipe-prompts-container">
    <div class="recipe-decoration top-decoration">
      <div class="decoration-item" v-for="i in 5" :key="`top-${i}`">
        <i
          :class="`el-icon-${decorationIcons[i % decorationIcons.length]}`"
        ></i>
      </div>
    </div>

    <el-card class="recipe-card">
      <div class="card-header">
        <i class="el-icon-dish"></i>
        <h2>Recipe Inspirations</h2>
        <i class="el-icon-dish"></i>
      </div>

      <el-collapse :accordion="true" class="custom-collapse">
        <div class="recipe-container">
          <!-- Fusion Suggestions Section -->
          <el-collapse-item title="Food Fusion Suggestions" name="fusion">
            <template slot="title">
              <div class="collapse-title">
                <i class="el-icon-food"></i>
                <span>Food Fusion Suggestions</span>
              </div>
            </template>

            <div class="content-wrapper">
              <div class="content-decoration left">
                <i class="el-icon-knife-fork"></i>
              </div>

              <div v-if="!isLoading" class="content-body">
                <div
                  v-for="(suggestion, index) in fusionSuggestions"
                  :key="index"
                  class="suggestion-item fusion-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-star-on"></i>
                    <h3>Fusion Cuisine Suggestion</h3>
                  </div>

                  <p
                    v-if="
                      suggestion['Fusion Cuisine Suggestion'] &&
                      suggestion['Fusion Cuisine Suggestion'].trim()
                    "
                    class="suggestion-content"
                  >
                    <span
                      v-html="
                        formatText(suggestion['Fusion Cuisine Suggestion'])
                      "
                    ></span>
                  </p>

                  <p class="custom-prompt-note">
                    <i class="el-icon-s-promotion"></i>
                    For custom prompts go to the user defined prompt section
                  </p>

                  <el-divider
                    v-if="index < fusionSuggestions.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidFusionSuggestions"
                  title="No Fusion Cuisine Suggestions"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No Fusion Cuisine Suggestions Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Try generating new fusion cuisine ideas by clicking the
                    button below.
                  </div>
                </el-alert>

                <el-button
                  @click="
                    fetchData(
                      'gpt',
                      '/fusion-cuisine-suggestions-using-gpt',
                      'fusionSuggestions'
                    )
                  "
                  :loading="isLoading"
                  type="primary"
                  plain
                  class="generate-button"
                >
                  <i class="el-icon-magic-stick"></i>
                  Generate Fusion Ideas
                </el-button>
              </div>

              <div class="content-decoration right">
                <i class="el-icon-knife-fork"></i>
              </div>
            </div>
          </el-collapse-item>

          <!-- User Defined Dish Section -->
          <el-collapse-item title="User Defined Dish" name="defined">
            <template slot="title">
              <div class="collapse-title">
                <i class="el-icon-s-custom"></i>
                <span>User Defined Dish</span>
              </div>
            </template>

            <div class="content-wrapper">
              <div class="content-decoration left">
                <i class="el-icon-dessert"></i>
              </div>

              <div v-if="!isLoading" class="content-body">
                <div
                  v-for="(fact, index) in definedDishes"
                  :key="index"
                  class="suggestion-item defined-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-trophy"></i>
                    <h3>Personalized Dish</h3>
                  </div>

                  <p
                    v-if="fact['Fun Facts'] && fact['Fun Facts'].trim()"
                    class="suggestion-content"
                  >
                    <span v-html="formatText(fact['Fun Facts'])"></span>
                  </p>

                  <p class="custom-prompt-note">
                    <i class="el-icon-s-promotion"></i>
                    For custom prompts go to the user defined prompt section
                  </p>

                  <el-divider
                    v-if="index < definedDishes.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidDefinedDishes"
                  title="No User Defined Dishes"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No User Defined Dishes Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Create your own custom dish ideas in the user defined prompt
                    section.
                  </div>
                </el-alert>

                <el-button
                  @click="
                    fetchData(
                      'gpt',
                      '/user-defined-dish-using-gpt',
                      'definedDishes'
                    )
                  "
                  :loading="isLoading"
                  type="success"
                  plain
                  class="generate-button"
                >
                  <i class="el-icon-magic-stick"></i>
                  Generate Custom Dishes
                </el-button>
              </div>

              <div class="content-decoration right">
                <i class="el-icon-dessert"></i>
              </div>
            </div>
          </el-collapse-item>

          <!-- Unique Recipe Section -->
          <el-collapse-item title="Unique Recipe" name="unique">
            <template slot="title">
              <div class="collapse-title">
                <i class="el-icon-discover"></i>
                <span>Unique Recipe</span>
              </div>
            </template>

            <div class="content-wrapper">
              <div class="content-decoration left">
                <i class="el-icon-ice-cream"></i>
              </div>

              <div v-if="!isLoading" class="content-body">
                <div
                  v-for="(recipe, index) in uniqueRecipes"
                  :key="index"
                  class="suggestion-item unique-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-medal"></i>
                    <h3>One-of-a-Kind Recipe</h3>
                  </div>

                  <p
                    v-if="recipe['Recipe'] && recipe['Recipe'].trim()"
                    class="suggestion-content recipe-content"
                  >
                    <span v-html="formatText(recipe['Recipe'])"></span>
                  </p>

                  <p
                    v-if="
                      recipe['Encouragement'] && recipe['Encouragement'].trim()
                    "
                    class="suggestion-content encouragement"
                  >
                    <i class="el-icon-chat-dot-square"></i>
                    <span v-html="formatText(recipe['Encouragement'])"></span>
                  </p>

                  <p class="custom-prompt-note">
                    <i class="el-icon-s-promotion"></i>
                    For custom prompts go to the user defined prompt section
                  </p>

                  <el-divider
                    v-if="index < uniqueRecipes.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidUniqueRecipes"
                  title="No Unique Recipes"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title">No Unique Recipes Available</span>
                  </template>
                  <div class="alert-content">
                    Discover extraordinary recipes by generating new ideas
                    below.
                  </div>
                </el-alert>

                <el-button
                  @click="
                    fetchData(
                      'gpt',
                      '/unique-recipes-using-gpt',
                      'uniqueRecipes'
                    )
                  "
                  :loading="isLoading"
                  type="warning"
                  plain
                  class="generate-button"
                >
                  <i class="el-icon-magic-stick"></i>
                  Generate Unique Recipes
                </el-button>
              </div>

              <div class="content-decoration right">
                <i class="el-icon-ice-cream"></i>
              </div>
            </div>
          </el-collapse-item>

          <!-- Diet Schedule Section -->
          <el-collapse-item title="Diet Schedule" name="diet">
            <template slot="title">
              <div class="collapse-title">
                <i class="el-icon-date"></i>
                <span>Diet Schedule</span>
              </div>
            </template>

            <div class="content-wrapper">
              <div class="content-decoration left">
                <i class="el-icon-apple"></i>
              </div>

              <div v-if="!isLoading" class="content-body">
                <div
                  v-for="(meal, index) in dietSchedule"
                  :key="index"
                  class="suggestion-item diet-item"
                >
                  <div class="meal-header">
                    <div
                      class="meal-badge"
                      :class="`meal-${meal['Meal Number']}`"
                    >
                      {{ meal["Meal Number"] }}
                    </div>
                    <h3>{{ meal["Meal Category"] }}</h3>
                  </div>

                  <p
                    v-if="meal['Food Item'] && meal['Food Item'].trim()"
                    class="food-item-list"
                  >
                    <i class="el-icon-shopping-cart-2"></i>
                    <strong>Ingredients: </strong>{{ meal["Food Item"] }}
                  </p>

                  <p
                    v-if="
                      meal['Meal Suggestion'] && meal['Meal Suggestion'].trim()
                    "
                    class="suggestion-content meal-suggestion"
                  >
                    <i class="el-icon-dish-1"></i>
                    <strong>Meal Suggestion: </strong>
                    <span v-html="formatText(meal['Meal Suggestion'])"></span>
                  </p>

                  <el-divider
                    v-if="index < dietSchedule.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidDietSchedule"
                  title="No Diet Schedule"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title">No Diet Schedule Available</span>
                  </template>
                  <div class="alert-content">
                    Create a personalized diet schedule based on your inventory
                    items.
                  </div>
                </el-alert>

                <el-button
                  @click="
                    fetchData('gpt', '/diet-schedule-using-gpt', 'dietSchedule')
                  "
                  type="info"
                  plain
                  :loading="isLoading"
                  class="generate-button"
                >
                  <i class="el-icon-magic-stick"></i>
                  Generate Diet Schedule
                </el-button>
              </div>

              <div class="content-decoration right">
                <i class="el-icon-apple"></i>
              </div>
            </div>
          </el-collapse-item>

          <!-- Generated Recipes Section -->
          <el-collapse-item title="Generated Recipes" name="generated">
            <template slot="title">
              <div class="collapse-title">
                <i class="el-icon-notebook-2"></i>
                <span>Generated Recipes</span>
              </div>
            </template>

            <div class="content-wrapper">
              <div class="content-decoration left">
                <i class="el-icon-sugar"></i>
              </div>

              <div v-if="!isLoading" class="content-body">
                <div
                  v-for="(recipe, index) in generatedRecipes"
                  :key="index"
                  class="suggestion-item generated-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-collection"></i>
                    <h3>Recipe Creation</h3>
                  </div>

                  <p
                    v-if="
                      recipe['Group of Items'] &&
                      Array.isArray(recipe['Group of Items']) &&
                      recipe['Group of Items'].length > 0
                    "
                    class="ingredients-list"
                  >
                    <i class="el-icon-shopping-bag-1"></i>
                    <strong>Ingredients:</strong>
                    <span
                      class="ingredient-tag"
                      v-for="(item, idx) in recipe['Group of Items']"
                      :key="idx"
                    >
                      {{ item }}
                    </span>
                  </p>

                  <p
                    v-if="
                      recipe['Generated Recipe'] &&
                      recipe['Generated Recipe'].trim()
                    "
                    class="suggestion-content recipe-steps"
                  >
                    <span
                      v-html="formatText(recipe['Generated Recipe'])"
                    ></span>
                  </p>

                  <el-divider
                    v-if="index < generatedRecipes.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidGeneratedRecipes"
                  title="No Generated Recipes"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No Generated Recipes Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Create delicious recipes from your available ingredients.
                  </div>
                </el-alert>

                <el-button
                  @click="
                    fetchData('gpt', '/recipes-using-gpt', 'generatedRecipes')
                  "
                  type="danger"
                  plain
                  :loading="isLoading"
                  class="generate-button"
                >
                  <i class="el-icon-magic-stick"></i>
                  Generate New Recipes
                </el-button>
              </div>

              <div class="content-decoration right">
                <i class="el-icon-sugar"></i>
              </div>
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
    </el-card>

    <div class="recipe-decoration bottom-decoration">
      <div class="decoration-item" v-for="i in 5" :key="`bottom-${i}`">
        <i
          :class="`el-icon-${
            decorationIcons[(i + 5) % decorationIcons.length]
          }`"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../Firebase.js";
import { onAuthStateChanged } from "firebase/auth";
const baseUrl = "https://my-grocery-app-888361723877.us-central1.run.app/api";

export default {
  data() {
    return {
      fusionSuggestions: [],
      definedDishes: [],
      uniqueRecipes: [],
      dietSchedule: [],
      generatedRecipes: [],
      isLoading: false,
      error: false,
      activeNames: ["fusion"], // Default open section
      decorationIcons: [
        "food",
        "dish",
        "chicken",
        "ice-cream",
        "dessert",
        "sugar",
        "knife-fork",
        "apple",
        "cherry",
        "coffee",
      ],
      animationDelays: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5],
    };
  },
  computed: {
    hasValidFusionSuggestions() {
      if (!this.fusionSuggestions || this.fusionSuggestions.length === 0) {
        return false;
      }
      return this.fusionSuggestions.some(
        (suggestion) =>
          suggestion["Fusion Cuisine Suggestion"] &&
          suggestion["Fusion Cuisine Suggestion"].trim() !== ""
      );
    },

    hasValidDefinedDishes() {
      if (!this.definedDishes || this.definedDishes.length === 0) {
        return false;
      }
      return this.definedDishes.some(
        (dish) => dish["Fun Facts"] && dish["Fun Facts"].trim() !== ""
      );
    },

    hasValidUniqueRecipes() {
      if (!this.uniqueRecipes || this.uniqueRecipes.length === 0) {
        return false;
      }
      return this.uniqueRecipes.some(
        (recipe) =>
          (recipe["Recipe"] && recipe["Recipe"].trim() !== "") ||
          (recipe["Encouragement"] && recipe["Encouragement"].trim() !== "")
      );
    },

    hasValidDietSchedule() {
      if (!this.dietSchedule || this.dietSchedule.length === 0) {
        return false;
      }
      return this.dietSchedule.some(
        (meal) =>
          (meal["Food Item"] && meal["Food Item"].trim() !== "") ||
          (meal["Meal Suggestion"] && meal["Meal Suggestion"].trim() !== "")
      );
    },

    hasValidGeneratedRecipes() {
      if (!this.generatedRecipes || this.generatedRecipes.length === 0) {
        return false;
      }
      return this.generatedRecipes.some((recipe) => {
        const hasItems =
          recipe["Group of Items"] &&
          Array.isArray(recipe["Group of Items"]) &&
          recipe["Group of Items"].length > 0;
        const hasRecipe =
          recipe["Generated Recipe"] &&
          recipe["Generated Recipe"].trim() !== "";
        return hasItems || hasRecipe;
      });
    },
  },
  async mounted() {
    // Check authentication state
    this.checkAuthState();
  },

  methods: {
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
      let formattedText = text.replace(/\.\s+(?=[A-Z])/g, ".<br><br>");

      // Enhance recipe instructions with better formatting
      formattedText = formattedText.replace(
        /(Instructions:|Directions:|Method:|Steps:|Preparation:|Procedure:)/gi,
        '<span class="recipe-section-title">$1</span><br>'
      );

      // Enhance ingredients section
      formattedText = formattedText.replace(
        /(Ingredients:|You will need:|What you'll need:)/gi,
        '<span class="recipe-section-title">$1</span><br>'
      );

      // Format cooking times
      formattedText = formattedText.replace(
        /(Cook time:|Cooking time:|Prep time:|Preparation time:|Total time:)(\s*\d+\s*\w+)/gi,
        '<span class="cooking-time"><i class="el-icon-time"></i> $1$2</span>'
      );

      return formattedText;
    },

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

<style scoped></style>
