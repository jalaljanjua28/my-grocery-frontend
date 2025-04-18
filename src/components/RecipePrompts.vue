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
const baseUrl = "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api";

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

<style scoped>
.recipe-prompts-container {
  position: relative;
  padding: 20px 0;
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Top and bottom decorations */
.recipe-decoration {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 600px;
}

.top-decoration {
  margin-bottom: 20px;
}

.bottom-decoration {
  margin-top: 20px;
}

.decoration-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(145deg, #f0f0f0, #e6e6e6);
  box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
  animation: float 6s ease-in-out infinite;
}

.decoration-item i {
  font-size: 20px;
  color: #67c23a;
}

.top-decoration .decoration-item:nth-child(1) {
  animation-delay: 0s;
}
.top-decoration .decoration-item:nth-child(2) {
  animation-delay: 1s;
}
.top-decoration .decoration-item:nth-child(3) {
  animation-delay: 2s;
}
.top-decoration .decoration-item:nth-child(4) {
  animation-delay: 3s;
}
.top-decoration .decoration-item:nth-child(5) {
  animation-delay: 4s;
}

.bottom-decoration .decoration-item:nth-child(1) {
  animation-delay: 2.5s;
}
.bottom-decoration .decoration-item:nth-child(2) {
  animation-delay: 3.5s;
}
.bottom-decoration .decoration-item:nth-child(3) {
  animation-delay: 4.5s;
}
.bottom-decoration .decoration-item:nth-child(4) {
  animation-delay: 5.5s;
}
.bottom-decoration .decoration-item:nth-child(5) {
  animation-delay: 6.5s;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Card styling */
.recipe-card {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: none;
  background: linear-gradient(to bottom right, #ffffff, #f9f9f9);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  margin-bottom: 20px;
  background: linear-gradient(to right, #f0f9eb, #e1f3d8);
  border-bottom: 2px dashed #67c23a;
}

.card-header i {
  font-size: 24px;
  color: #67c23a;
  margin: 0 15px;
}

.card-header h2 {
  margin: 0;
  color: #67c23a;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Custom collapse styling */
.custom-collapse {
  border: none;
}

.collapse-title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  transition: all 0.3s ease;
}

.collapse-title i {
  margin-right: 10px;
  font-size: 20px;
  color: #409eff;
}

.collapse-title:hover {
  color: #409eff;
}

/* Content wrapper */
.content-wrapper {
  position: relative;
  display: flex;
  padding: 10px 0;
}

.content-decoration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40px;
}

.content-decoration i {
  font-size: 24px;
  color: #dcdfe6;
  margin: 15px 0;
  opacity: 0.7;
}

.content-body {
  flex: 1;
  padding: 0 10px;
}

/* Suggestion items */
.suggestion-item {
  position: relative;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.suggestion-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.3;
  z-index: -1;
}

.fusion-item {
  background-color: #ecf5ff;
  border-left: 4px solid #409eff;
}

.defined-item {
  background-color: #f0f9eb;
  border-left: 4px solid #67c23a;
}

.unique-item {
  background-color: #fdf6ec;
  border-left: 4px solid #e6a23c;
}

.diet-item {
  background-color: #f5f7fa;
  border-left: 4px solid #909399;
}

.generated-item {
  background-color: #fef0f0;
  border-left: 4px solid #f56c6c;
}

.suggestion-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Suggestion header */
.suggestion-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.suggestion-header i {
  font-size: 20px;
  margin-right: 10px;
}

.suggestion-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.fusion-item .suggestion-header i {
  color: #409eff;
}
.defined-item .suggestion-header i {
  color: #67c23a;
}
.unique-item .suggestion-header i {
  color: #e6a23c;
}
.diet-item .suggestion-header i {
  color: #909399;
}
.generated-item .suggestion-header i {
  color: #f56c6c;
}

.fusion-item .suggestion-header h3 {
  color: #409eff;
}
.defined-item .suggestion-header h3 {
  color: #67c23a;
}
.unique-item .suggestion-header h3 {
  color: #e6a23c;
}
.diet-item .suggestion-header h3 {
  color: #909399;
}
.generated-item .suggestion-header h3 {
  color: #f56c6c;
}

/* Meal header for diet schedule */
.meal-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.meal-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  font-weight: bold;
  color: white;
}

.meal-1 {
  background-color: #409eff;
}
.meal-2 {
  background-color: #67c23a;
}
.meal-3 {
  background-color: #e6a23c;
}
.meal-4 {
  background-color: #f56c6c;
}
.meal-5 {
  background-color: #909399;
}

/* Content styling */
.suggestion-content {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #606266;
}

.recipe-content {
  white-space: pre-line;
}

.encouragement {
  font-style: italic;
  color: #67c23a;
  padding: 10px;
  background-color: rgba(103, 194, 58, 0.1);
  border-radius: 5px;
  margin-top: 15px;
}

.encouragement i {
  margin-right: 5px;
  color: #67c23a;
}

.custom-prompt-note {
  font-size: 14px;
  color: #f56c6c;
  margin-top: 15px;
  padding: 8px;
  background-color: rgba(245, 108, 108, 0.1);
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.custom-prompt-note i {
  margin-right: 8px;
  font-size: 16px;
}

/* Ingredients list styling */
.ingredients-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 15px;
}

.ingredients-list i,
.food-item-list i {
  margin-right: 8px;
  color: #409eff;
}

.ingredient-tag {
  display: inline-block;
  padding: 4px 8px;
  margin: 4px;
  background-color: #ecf5ff;
  color: #409eff;
  border-radius: 4px;
  font-size: 14px;
}

.food-item-list {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 8px;
  background-color: rgba(64, 158, 255, 0.1);
  border-radius: 5px;
}

.meal-suggestion {
  padding: 10px;
  background-color: rgba(144, 147, 153, 0.1);
  border-radius: 5px;
}

.meal-suggestion i {
  margin-right: 8px;
  color: #909399;
}

/* Recipe section titles */
.recipe-section-title {
  display: block;
  font-weight: bold;
  color: #303133;
  margin: 15px 0 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ebeef5;
}

.cooking-time {
  display: inline-block;
  padding: 4px 8px;
  margin: 8px 0;
  background-color: #f5f7fa;
  color: #909399;
  border-radius: 4px;
  font-size: 14px;
}

/* Fancy divider */
.fancy-divider {
  position: relative;
  height: 2px;
  margin: 20px 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.1),
    transparent
  );
}

/* Custom alert */
.custom-alert {
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
}

.alert-title {
  font-weight: 600;
  font-size: 16px;
}

.alert-content {
  margin-top: 8px;
  font-size: 14px;
}

/* Generate button */
.generate-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto 10px;
  padding: 10px 20px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.generate-button i {
  margin-right: 8px;
  font-size: 18px;
}

.generate-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .content-decoration {
    display: none;
  }

  .suggestion-item {
    padding: 15px;
  }

  .card-header h2 {
    font-size: 20px;
  }

  .collapse-title {
    font-size: 16px;
  }

  .suggestion-header h3 {
    font-size: 16px;
  }

  .decoration-item {
    width: 30px;
    height: 30px;
  }

  .decoration-item i {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  .recipe-decoration {
    max-width: 300px;
  }

  .card-header {
    padding: 10px 0;
  }

  .card-header i {
    font-size: 20px;
    margin: 0 10px;
  }

  .card-header h2 {
    font-size: 18px;
  }

  .suggestion-item {
    padding: 12px;
  }

  .generate-button {
    font-size: 14px;
    padding: 8px 16px;
  }

  .generate-button i {
    font-size: 16px;
  }

  .ingredient-tag {
    font-size: 12px;
    padding: 3px 6px;
  }
}
</style>
