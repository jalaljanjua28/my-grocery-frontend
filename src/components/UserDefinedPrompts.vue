<template>
  <div class="user-prompts-container">
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="User Defined Prompt" class="custom-page-header">
        <template slot="content">
          <div class="page-title">
            <i class="el-icon-box"></i>
            <span>User Defined Prompt</span>
          </div>
        </template>
      </el-page-header>
    </router-link>
    <el-main class="main-content">
      <el-card class="prompt-card">
        <!-- <div class="prompt-decoration top-decoration">
          <div class="decoration-item" v-for="i in 5" :key="`top-${i}`">
            <i :class="`el-icon-${promptIcons[i % promptIcons.length]}`"></i>
          </div>
        </div> -->
        <!-- Decorative food-themed header -->
        <div class="decorative-food-header">
          <div class="food-icon apple"></div>
          <div class="food-icon banana"></div>
          <div class="food-icon carrot"></div>
          <div class="food-icon broccoli"></div>
          <div class="food-icon orange"></div>
        </div>
        <div class="card-header">
          <i class="el-icon-chat-dot-round"></i>
          <h2>Custom Prompts</h2>
          <i class="el-icon-chat-dot-round"></i>
        </div>

        <div class="prompt-selection">
          <div class="selection-header">
            <i class="el-icon-magic-stick"></i>
            <span>Select a prompt type to begin</span>
          </div>

          <el-select
            v-model="selectedPrompt"
            placeholder="Select Prompt"
            class="prompt-select"
          >
            <el-option label="Food Waste Reduction" value="foodWasteReduction">
              <div class="option-content">
                <i class="el-icon-delete"></i>
                <span>Food Waste Reduction</span>
              </div>
            </el-option>
            <el-option label="Mood Changer" value="moodChanger">
              <div class="option-content">
                <i class="el-icon-sunny"></i>
                <span>Mood Changer</span>
              </div>
            </el-option>
            <el-option
              label="Food Cuisine Suggestions"
              value="cusineSuggestion"
            >
              <div class="option-content">
                <i class="el-icon-dish"></i>
                <span>Food Cuisine Suggestions</span>
              </div>
            </el-option>
            <el-option label="Defined Dishes" value="definedDishes">
              <div class="option-content">
                <i class="el-icon-food"></i>
                <span>Defined Dishes</span>
              </div>
            </el-option>
            <el-option label="Unique Recipe" value="uniqueRecipes">
              <div class="option-content">
                <i class="el-icon-notebook-2"></i>
                <span>Unique Recipe</span>
              </div>
            </el-option>
          </el-select>
        </div>

        <div class="prompt-input-container" v-if="selectedPrompt">
          <div class="input-header">
            <i :class="getPromptIcon()"></i>
            <span>{{ getPromptTitle() }}</span>
          </div>

          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="selectedOption"
            :fetch-suggestions="querySearch"
            placeholder="Type or select a prompt"
            class="prompt-autocomplete"
            @select="handleSelect"
          >
            <i
              class="el-icon-remove-outline el-input__icon"
              slot="suffix"
              @click="handleIconClick"
            >
            </i>
            <template slot-scope="{ item }">
              <div class="suggestion-option">
                <i :class="getPromptIcon()"></i>
                <span>{{ item }}</span>
              </div>
            </template>
          </el-autocomplete>
        </div>

        <div v-if="loading" class="loading-container">
          <div class="loading-spinner">
            <i class="el-icon-loading"></i>
            <span>Generating your custom content...</span>
          </div>
        </div>

        <!-- Food Waste Reduction Section -->
        <div v-if="displayWasteReduction && !loading" class="results-container">
          <div class="results-header waste-reduction-header">
            <i class="el-icon-delete"></i>
            <h3>Food Waste Reduction Suggestions</h3>
          </div>

          <div
            v-for="(suggestion, index) in foodWasteReductionSuggestions"
            :key="index"
            class="suggestion-item waste-reduction-item"
          >
            <p
              v-if="
                suggestion['Food Waste Reduction Suggestion'] &&
                suggestion['Food Waste Reduction Suggestion'].trim()
              "
              class="suggestion-content"
            >
              <span
                v-html="
                  formatText(suggestion['Food Waste Reduction Suggestion'])
                "
              ></span>
            </p>
            <div class="suggestion-footer">
              <span class="suggestion-tag waste-tag">Waste Reduction</span>
              <span class="suggestion-number">Tip #{{ index + 1 }}</span>
            </div>
            <div
              class="fancy-divider"
              v-if="index < foodWasteReductionSuggestions.length - 1"
            ></div>
          </div>

          <el-alert
            v-if="
              displayWasteReduction &&
              (!foodWasteReductionSuggestions.length ||
                !hasValidFoodWasteReductionSuggestions)
            "
            title="No Food Waste Reduction Suggestions"
            type="info"
            show-icon
            class="custom-alert"
          >
            <template slot="title">
              <span class="alert-title"
                >No Food Waste Reduction Suggestions</span
              >
            </template>
            <div class="alert-content">
              Please select a prompt from the dropdown or try a different query.
            </div>
          </el-alert>
        </div>

        <!-- Mood Changer Section -->
        <div v-if="displayMood && !loading" class="results-container">
          <div class="results-header mood-header">
            <i class="el-icon-sunny"></i>
            <h3>Mood Changer Suggestions</h3>
          </div>

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
              class="suggestion-content"
            >
              <span v-html="formatText(suggestion['Food Suggestion'])"></span>
            </p>
            <div class="suggestion-footer">
              <span class="suggestion-tag mood-tag">Mood Enhancer</span>
              <span class="suggestion-number">Suggestion #{{ index + 1 }}</span>
            </div>
            <div
              class="fancy-divider"
              v-if="index < moodChangerSuggestions.length - 1"
            ></div>
          </div>

          <el-alert
            v-if="
              displayMood &&
              (!moodChangerSuggestions.length ||
                !hasValidMoodChangerSuggestions)
            "
            title="No Mood Changer Suggestions"
            type="info"
            show-icon
            class="custom-alert"
          >
            <template slot="title">
              <span class="alert-title">No Mood Changer Suggestions</span>
            </template>
            <div class="alert-content">
              Please select from the box for a Mood changer suggestions or try a
              different query.
            </div>
          </el-alert>
        </div>

        <!-- Fusion Cuisine Suggestions Section -->
        <div v-if="displaySuggestions && !loading" class="results-container">
          <div class="results-header fusion-header">
            <i class="el-icon-dish"></i>
            <h3>Fusion Cuisine Suggestions</h3>
          </div>

          <div
            v-for="(suggestion, index) in fusionSuggestions"
            :key="index"
            class="suggestion-item fusion-item"
          >
            <p
              v-if="
                suggestion['Fusion Cuisine Suggestion'] &&
                suggestion['Fusion Cuisine Suggestion'].trim()
              "
              class="suggestion-content"
            >
              <span
                v-html="formatText(suggestion['Fusion Cuisine Suggestion'])"
              ></span>
            </p>
            <div class="suggestion-footer">
              <span class="suggestion-tag fusion-tag">Fusion Cuisine</span>
              <span class="suggestion-number">Idea #{{ index + 1 }}</span>
            </div>
            <div
              class="fancy-divider"
              v-if="index < fusionSuggestions.length - 1"
            ></div>
          </div>

          <el-alert
            v-if="
              displaySuggestions &&
              (!fusionSuggestions.length || !hasValidFusionSuggestions)
            "
            title="No Fusion Cuisine Suggestions"
            type="info"
            show-icon
            class="custom-alert"
          >
            <template slot="title">
              <span class="alert-title">No Fusion Cuisine Suggestions</span>
            </template>
            <div class="alert-content">
              Please select from the box for a Fusion Cuisine suggestions or try
              a different query.
            </div>
          </el-alert>
        </div>

        <!-- Defined Dishes Section -->
        <div v-if="displayDishes && !loading" class="results-container">
          <div class="results-header dishes-header">
            <i class="el-icon-food"></i>
            <h3>Defined Dishes & Fun Facts</h3>
          </div>

          <div
            v-for="(fact, index) in definedDishes"
            :key="index"
            class="suggestion-item dishes-item"
          >
            <p
              v-if="fact['Fun Facts'] && fact['Fun Facts'].trim()"
              class="suggestion-content"
            >
              <span v-html="formatText(fact['Fun Facts'])"></span>
            </p>
            <div class="suggestion-footer">
              <span class="suggestion-tag dishes-tag">Fun Facts</span>
              <span class="suggestion-number">Fact #{{ index + 1 }}</span>
            </div>
            <div
              class="fancy-divider"
              v-if="index < definedDishes.length - 1"
            ></div>
          </div>

          <el-alert
            v-if="
              displayDishes && (!definedDishes.length || !hasValidDefinedDishes)
            "
            title="No Fun Facts"
            type="info"
            show-icon
            class="custom-alert"
          >
            <template slot="title">
              <span class="alert-title">No Fun Facts Available</span>
            </template>
            <div class="alert-content">
              Please select from the box for User Defined Dishes and Fun Facts
              or try a different query.
            </div>
          </el-alert>
        </div>

        <!-- Unique Recipes Section -->
        <div v-if="displayRecipe && !loading" class="results-container">
          <div class="results-header recipe-header">
            <i class="el-icon-notebook-2"></i>
            <h3>Unique Recipes</h3>
          </div>

          <div
            v-for="(recipe, index) in uniqueRecipes"
            :key="index"
            class="suggestion-item recipe-item"
          >
            <div
              v-if="recipe['Recipe'] && recipe['Recipe'].trim()"
              class="recipe-content"
            >
              <div class="recipe-title">Recipe</div>
              <p class="suggestion-content">
                <span v-html="formatText(recipe['Recipe'])"></span>
              </p>
            </div>

            <div
              v-if="recipe['Encouragement'] && recipe['Encouragement'].trim()"
              class="encouragement-content"
            >
              <div class="encouragement-title">
                <i class="el-icon-star-on"></i>
                <span>Chef's Encouragement</span>
              </div>
              <p class="suggestion-content">
                <span v-html="formatText(recipe['Encouragement'])"></span>
              </p>
            </div>

            <div class="suggestion-footer">
              <span class="suggestion-tag recipe-tag">Unique Recipe</span>
              <span class="suggestion-number">Recipe #{{ index + 1 }}</span>
            </div>
            <div
              class="fancy-divider"
              v-if="index < uniqueRecipes.length - 1"
            ></div>
          </div>

          <el-alert
            v-if="
              displayRecipe && (!uniqueRecipes.length || !hasValidUniqueRecipes)
            "
            title="No Recipes"
            type="info"
            show-icon
            class="custom-alert"
          >
            <template slot="title">
              <span class="alert-title">No Unique Recipes Available</span>
            </template>
            <div class="alert-content">
              Please select from the box for New Recipes or try a different
              query.
            </div>
          </el-alert>
        </div>
      </el-card>
    </el-main>

    <div class="prompt-decoration bottom-decoration">
      <div class="decoration-item" v-for="i in 5" :key="`bottom-${i}`">
        <i :class="`el-icon-${promptIcons[(i + 5) % promptIcons.length]}`"></i>
      </div>
    </div>
  </div>
</template>

<script>
const baseURL = "https://my-grocery-app-888361723877.us-central1.run.app/api";
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
      promptIcons: [
        "chat-dot-round",
        "magic-stick",
        "notebook-2",
        "food",
        "dish",
        "delete",
        "sunny",
        "star-on",
        "fork-spoon",
        "chicken",
      ],
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
  },
  mounted() {
    this.checkAuthState();
  },
  methods: {
    getPromptIcon() {
      switch (this.selectedPrompt) {
        case "foodWasteReduction":
          return "el-icon-delete";
        case "moodChanger":
          return "el-icon-sunny";
        case "cusineSuggestion":
          return "el-icon-dish";
        case "definedDishes":
          return "el-icon-food";
        case "uniqueRecipes":
          return "el-icon-notebook-2";
        default:
          return "el-icon-chat-dot-round";
      }
    },

    getPromptTitle() {
      switch (this.selectedPrompt) {
        case "foodWasteReduction":
          return "Food Waste Reduction Prompt";
        case "moodChanger":
          return "Mood Changer Prompt";
        case "cusineSuggestion":
          return "Fusion Cuisine Prompt";
        case "definedDishes":
          return "Defined Dishes Prompt";
        case "uniqueRecipes":
          return "Unique Recipe Prompt";
        default:
          return "Custom Prompt";
      }
    },

    handleIconClick() {
      this.selectedOption = "";
    },

    formatText(text) {
      if (!text) return "";

      // Add line breaks for general text that might need formatting
      let formattedText = text.replace(/\.\s+(?=[A-Z])/g, ".<br><br>");

      // Format numbered lists
      formattedText = formattedText.replace(
        /(\d+\.\s)/g,
        (match, p1, offset) => {
          return offset === 0
            ? `<span class="list-number">${p1}</span>`
            : `<br><br><span class="list-number">${p1}</span>`;
        }
      );

      // Format recipe steps
      formattedText = formattedText.replace(
        /(Step \d+:)/gi,
        '<span class="recipe-step">$1</span>'
      );

      // Format ingredients
      formattedText = formattedText.replace(
        /(Ingredients:|Ingredients)/gi,
        '<span class="ingredients-title">$1</span>'
      );

      // Format instructions
      formattedText = formattedText.replace(
        /(Instructions:|Directions:|Method:)/gi,
        '<span class="instructions-title">$1</span>'
      );

      // Format tips and notes
      formattedText = formattedText.replace(
        /(Tip:|Note:|Hint:)/gi,
        '<span class="tip-title">$1</span>'
      );

      return formattedText;
    },

    checkAuthState() {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.currentUser = user;
          console.log("User is logged in:", user.email);
          try {
            await this.fetchData(
              "json",
              "/food-waste-reduction-using-json",
              "foodWasteReductionSuggestions"
            );
            await this.fetchData(
              "json",
              "/mood-changer-using-json",
              "moodChangerSuggestions"
            );
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
        this.loading = true;
        let response;
        if (type === "json") {
          response = await fetch(baseURL + endpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          });
        } else if (type === "gpt") {
          await fetch(baseURL + endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ prompt: this.selectedOption }),
          });
          response = await fetch(baseURL + endpoint, {
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
        this.loading = false;
      } catch (error) {
        console.error("Error in fetchData:", error);
        this.loading = false;
      }
    },

    querySearch(queryString, cb) {
      let suggestions = [];
      if (this.selectedPrompt === "foodWasteReduction") {
        suggestions = [
          "How can I reduce food waste with the items in my inventory?",
          "What are creative ways to use leftover vegetables?",
          "Tips for preserving fruits and vegetables longer",
          "How to properly store food to reduce waste",
          "Recipes that use food scraps",
        ];
      } else if (this.selectedPrompt === "moodChanger") {
        suggestions = [
          "What foods can improve my mood when I'm feeling down?",
          "Foods that boost energy and focus",
          "Comfort foods that are also healthy",
          "Foods that help reduce stress and anxiety",
          "Mood-boosting snacks for work",
        ];
      } else if (this.selectedPrompt === "cusineSuggestion") {
        suggestions = [
          "Fusion cuisine ideas combining Italian and Asian flavors",
          "Mexican-Mediterranean fusion dishes",
          "Creative fusion desserts",
          "Fusion breakfast ideas",
          "Modern fusion cuisine trends",
        ];
      } else if (this.selectedPrompt === "definedDishes") {
        suggestions = [
          "Tell me interesting facts about pasta dishes",
          "Fun facts about chocolate desserts",
          "History of curry dishes around the world",
          "Interesting facts about breakfast foods globally",
          "Cultural significance of bread in different countries",
        ];
      } else if (this.selectedPrompt === "uniqueRecipes") {
        suggestions = [
          "Create a unique recipe using chicken and seasonal vegetables",
          "Innovative dessert recipe with chocolate and fruit",
          "Quick and easy dinner recipe with pantry staples",
          "Healthy breakfast recipe that's ready in 10 minutes",
          "Vegetarian main dish that will impress dinner guests",
        ];
      }

      const results = queryString
        ? suggestions.filter(this.createFilter(queryString))
        : suggestions;
      cb(results);
    },

    createFilter(queryString) {
      return (suggestion) => {
        return (
          suggestion.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    handleSelect(item) {
      this.selectedOption = item;
      this.resetDisplays();
      this.loading = true;

      // Set timeout to simulate loading
      setTimeout(() => {
        if (this.selectedPrompt === "foodWasteReduction") {
          this.fetchData(
            "gpt",
            "/food-waste-reduction-using-gpt",
            "foodWasteReductionSuggestions"
          ).then(() => {
            this.displayWasteReduction = true;
            this.loading = false;
          });
        } else if (this.selectedPrompt === "moodChanger") {
          this.fetchData(
            "gpt",
            "/mood-changer-using-gpt",
            "moodChangerSuggestions"
          ).then(() => {
            this.displayMood = true;
            this.loading = false;
          });
        } else if (this.selectedPrompt === "cusineSuggestion") {
          this.fetchData(
            "gpt",
            "/fusion-cuisine-suggestions-using-gpt",
            "fusionSuggestions"
          ).then(() => {
            this.displaySuggestions = true;
            this.loading = false;
          });
        } else if (this.selectedPrompt === "definedDishes") {
          this.fetchData(
            "gpt",
            "/user-defined-dish-using-gpt",
            "definedDishes"
          ).then(() => {
            this.displayDishes = true;
            this.loading = false;
          });
        } else if (this.selectedPrompt === "uniqueRecipes") {
          this.fetchData(
            "gpt",
            "/unique-recipes-using-gpt",
            "uniqueRecipes"
          ).then(() => {
            this.displayRecipe = true;
            this.loading = false;
          });
        }
      }, 500);
    },

    resetDisplays() {
      this.displayWasteReduction = false;
      this.displayMood = false;
      this.displaySuggestions = false;
      this.displayDishes = false;
      this.displayRecipe = false;
    },
  },
  watch: {
    selectedPrompt() {
      this.selectedOption = "";
      this.resetDisplays();
    },
  },
};
</script>

<style scoped>
/* Main container styling */
.user-prompts-container {
  position: relative;
  padding: 20px 0;
  animation: fadeIn 0.8s ease-in-out;
  min-height: 100vh;
}

/* Page header styling */
/* .custom-page-header {
  margin-bottom: 20px;
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.custom-page-header:hover {
  transform: translateY(-2px);
}

.page-title {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #303133;
}

.page-title i {
  margin-right: 10px;
  color: #409eff;
  font-size: 28px;
} */

/* Background pattern */
.user-prompts-container:before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.6;
  z-index: -1;
}

/* Decorative food header */
.decorative-food-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px 0;
  background: linear-gradient(to right, #f0f9eb, #e1f3d8);
  border-radius: 8px;
}

.food-icon {
  width: 40px;
  height: 40px;
  margin: 0 15px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.food-icon:hover {
  transform: scale(1.2) rotate(10deg);
}

.apple {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23e74c3c" d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" /></svg>');
}

.banana {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23f1c40f" d="M16.5,2.83C14.76,2.83 13.96,4.16 13.34,5.15C12.76,6.24 12.87,7.79 13.71,8.75C14.13,9.37 15.03,9.97 16.26,9.97C17.05,9.97 17.87,9.45 18.34,8.95C19.5,7.75 20.15,4.3 18.96,3.11C18.14,2.29 17.43,2.83 16.5,2.83M18.54,10.61C17.57,11.39 16.57,11.31 15.61,10.95C14.98,11.65 14.25,12.38 13.54,13.24C12.45,14.86 11.5,16.76 11.13,19.55C11.1,19.94 11.43,20.29 11.83,20.29C11.85,20.29 11.86,20.29 11.88,20.29C12.31,20.26 12.65,19.88 12.68,19.44C13.01,17.01 13.89,15.39 14.76,14.04C14.95,13.82 15.16,13.61 15.36,13.41C15.29,14.38 15.36,15.34 15.36,16.34C15.36,17.34 15.36,18.34 15.61,19.34C15.67,19.61 15.93,19.81 16.21,19.81C16.25,19.81 16.29,19.8 16.34,19.8C16.65,19.73 16.87,19.45 16.87,19.13C16.76,18.35 16.8,17.37 16.8,16.38C16.8,15.38 16.8,14.38 16.8,13.38C17.07,13.35 17.35,13.31 17.64,13.24C18.34,13.05 19.03,12.66 19.61,12.07C20.18,11.5 20.63,10.5 20.63,9.5C20.63,8.5 19.63,7.23 18.63,10.61" /></svg>');
}

.carrot {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23e67e22" d="M16,10L15.8,11H13.5A0.5,0.5 0 0,0 13,11.5A0.5,0.5 0 0,0 13.5,12H15.6L14.6,17H12.5A0.5,0.5 0 0,0 12,17.5A0.5,0.5 0 0,0 12.5,18H14.4L14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20L9,15H10.5A0.5,0.5 0 0,0 11,14.5A0.5,0.5 0 0,0 10.5,14H8.8L8,10H9.5A0.5,0.5 0 0,0 10,9.5A0.5,0.5 0 0,0 9.5,9H7.8L7.6,8A2,2 0 0,1 9.5,6A2,2 0 0,1 11.5,8H13.5C13.5,7.58 13.39,7.19 13.21,6.85C12.22,5.2 11,4.39 11,2.5C11,1.12 12.12,0 13.5,0C14.88,0 16,1.12 16,2.5C16,4.39 14.78,5.2 13.79,6.85C13.61,7.19 13.5,7.58 13.5,8H21L16,10Z" /></svg>');
}

.broccoli {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%232ecc71" d="M17,8C16.25,8 15.55,8.15 14.9,8.46C14.5,7.57 13.8,6.82 12.91,6.42C13.15,5.85 13.25,5.24 13.25,4.59A4.61,4.61 0 0,0 8.64,0C7.15,0 5.83,0.86 5.17,2.12C5,2.12 4.83,2.09 4.66,2.09C2.09,2.09 0,4.18 0,6.75C0,8.72 1.21,10.42 2.96,11.06C2.92,11.37 2.9,11.69 2.9,12C2.9,14.07 3.86,15.86 5.34,17C5.03,17.45 4.86,17.97 4.86,18.5C4.86,19.88 5.95,21 7.33,21C7.85,21 8.35,20.82 8.75,20.54C9.89,21.42 11.27,22 12.8,22C14.33,22 15.74,21.42 16.87,20.54C17.29,20.82 17.79,21 18.33,21C19.71,21 20.83,19.88 20.83,18.5C20.83,17.94 20.63,17.42 20.32,17C21.8,15.86 22.76,14.07 22.76,12C22.76,9.73 21.53,7.76 19.7,6.71C19.06,7.59 18,8.15 16.85,8.15C16.85,8.16 17,8 17,8Z" /></svg>');
}

.orange {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23f39c12" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M7,15A1,1 0 0,0 8,16C8,16.55 7.55,17 7,17A1,1 0 0,0 6,16A1,1 0 0,0 7,15M7,11A1,1 0 0,0 8,12A1,1 0 0,0 7,13A1,1 0 0,0 6,12A1,1 0 0,0 7,11M10,15A1,1 0 0,0 11,16A1,1 0 0,0 10,17A1,1 0 0,0 9,16A1,1 0 0,0 10,15M10,11A1,1 0 0,0 11,12A1,1 0 0,0 10,13A1,1 0 0,0 9,12A1,1 0 0,0 10,11M13,15A1,1 0 0,0 14,16A1,1 0 0,0 13,17A1,1 0 0,0 12,16A1,1 0 0,0 13,15M13,11A1,1 0 0,0 14,12A1,1 0 0,0 13,13A1,1 0 0,0 12,12A1,1 0 0,0 13,11M16,15A1,1 0 0,0 17,16A1,1 0 0,0 16,17A1,1 0 0,0 15,16A1,1 0 0,0 16,15M16,11A1,1 0 0,0 17,12A1,1 0 0,0 16,13A1,1 0 0,0 15,12A1,1 0 0,0 16,11M7,8A1,1 0 0,0 8,9A1,1 0 0,0 7,10A1,1 0 0,0 6,9A1,1 0 0,0 7,8M13,8A1,1 0 0,0 14,9A1,1 0 0,0 13,10A1,1 0 0,0 12,9A1,1 0 0,0 13,8M16,8A1,1 0 0,0 17,9A1,1 0 0,0 16,10A1,1 0 0,0 15,9A1,1 0 0,0 16,8Z" /></svg>');
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
.prompt-decoration {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 600px;
  padding: 10px 0;
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
  will-change: transform; /* Performance optimization */
}

.decoration-item i {
  font-size: 20px;
  color: #409eff;
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

/* Main content */
.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Card styling */
.prompt-card {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: none;
  background: linear-gradient(to bottom right, #ffffff, #f9f9f9);
  margin-bottom: 30px;
  transition: box-shadow 0.3s ease;
}

.prompt-card:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  margin-bottom: 20px;
  background: linear-gradient(to right, #ecf5ff, #d7ebff);
  border-bottom: 2px dashed #409eff;
  position: relative;
  overflow: hidden;
}

.card-header:before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(
    45deg,
    transparent 49%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 51%
  );
  background-size: 20px 20px;
  z-index: 0;
  animation: moveBackground 60s linear infinite;
}

@keyframes moveBackground {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.card-header i {
  font-size: 24px;
  color: #409eff;
  margin: 0 15px;
  position: relative;
  z-index: 1;
}

.card-header h2 {
  margin: 0;
  color: #409eff;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

/* Prompt selection */
.prompt-selection {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.prompt-selection:hover {
  transform: translateY(-3px);
}

.selection-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #606266;
  font-size: 16px;
}

.selection-header i {
  margin-right: 10px;
  color: #409eff;
  font-size: 20px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.prompt-select {
  width: 100%;
}

.option-content {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.option-content i {
  margin-right: 10px;
  font-size: 16px;
}

/* Prompt input container */
.prompt-input-container {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f0f9eb;
  border-radius: 10px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

.prompt-input-container:hover {
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.08);
}

.input-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #67c23a;
  font-size: 16px;
  font-weight: 600;
}

.input-header i {
  margin-right: 10px;
  font-size: 20px;
}

.prompt-autocomplete {
  width: 100%;
}

.suggestion-option {
  display: flex;
  align-items: center;
  padding: 8px 0;
  transition: background-color 0.2s ease;
}

.suggestion-option:hover {
  background-color: #f5f7fa;
}

.suggestion-option i {
  margin-right: 10px;
  font-size: 16px;
  color: #409eff;
}

/* Loading container */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  min-height: 200px;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner i {
  font-size: 40px;
  color: #409eff;
  margin-bottom: 15px;
}

.loading-spinner span {
  color: #606266;
  font-size: 16px;
  animation: fadeInOut 1.5s infinite;
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Results container */
.results-container {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.5s ease-out;
  transition: transform 0.3s ease;
}

.results-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.results-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ebeef5;
  position: relative;
}

.results-header:after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.results-container:hover .results-header:after {
  width: 100px;
}

.results-header i {
  font-size: 24px;
  margin-right: 15px;
}

.results-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

/* Different header styles for each type */
.waste-reduction-header i,
.waste-reduction-header h3 {
  color: #f56c6c;
}
.mood-header i,
.mood-header h3 {
  color: #e6a23c;
}
.fusion-header i,
.fusion-header h3 {
  color: #409eff;
}
.dishes-header i,
.dishes-header h3 {
  color: #67c23a;
}
.recipe-header i,
.recipe-header h3 {
  color: #909399;
}

/* Suggestion items */
.suggestion-item {
  position: relative;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f5f7fa;
  transition: all 0.3s ease;
}

.suggestion-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Different item styles for each type */
.waste-reduction-item {
  border-left: 4px solid #f56c6c;
  background: linear-gradient(to right, rgba(245, 108, 108, 0.05), #f5f7fa);
}
.mood-item {
  border-left: 4px solid #e6a23c;
  background: linear-gradient(to right, rgba(230, 162, 60, 0.05), #f5f7fa);
}
/* Continuing from previous code */
.fusion-item {
  border-left: 4px solid #409eff;
  background: linear-gradient(to right, rgba(64, 158, 255, 0.05), #f5f7fa);
}
.dishes-item {
  border-left: 4px solid #67c23a;
  background: linear-gradient(to right, rgba(103, 194, 58, 0.05), #f5f7fa);
}
.recipe-item {
  border-left: 4px solid #909399;
  background: linear-gradient(to right, rgba(144, 147, 153, 0.05), #f5f7fa);
}

.suggestion-content {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #606266;
  font-size: 15px;
}

/* Recipe specific styling */
.recipe-content,
.encouragement-content {
  margin-bottom: 20px;
  position: relative;
}

.recipe-title {
  font-weight: 600;
  font-size: 18px;
  color: #303133;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #dcdfe6;
  position: relative;
}

.recipe-title:after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 30px;
  height: 1px;
  background-color: #909399;
  transition: width 0.3s ease;
}

.recipe-item:hover .recipe-title:after {
  width: 60px;
}

.encouragement-content {
  background-color: rgba(230, 162, 60, 0.05);
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.encouragement-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: #e6a23c;
  margin-bottom: 10px;
}

.encouragement-title i {
  margin-right: 8px;
  animation: twinkle 2s infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Suggestion footer */
.suggestion-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.suggestion-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.suggestion-item:hover .suggestion-tag {
  transform: scale(1.05);
}

/* Different tag styles for each type */
.waste-tag {
  background-color: #fef0f0;
  color: #f56c6c;
  box-shadow: 0 2px 4px rgba(245, 108, 108, 0.2);
}
.mood-tag {
  background-color: #fdf6ec;
  color: #e6a23c;
  box-shadow: 0 2px 4px rgba(230, 162, 60, 0.2);
}
.fusion-tag {
  background-color: #ecf5ff;
  color: #409eff;
  box-shadow: 0 2px 4px rgba(64, 158, 255, 0.2);
}
.dishes-tag {
  background-color: #f0f9eb;
  color: #67c23a;
  box-shadow: 0 2px 4px rgba(103, 194, 58, 0.2);
}
.recipe-tag {
  background-color: #f4f4f5;
  color: #909399;
  box-shadow: 0 2px 4px rgba(144, 147, 153, 0.2);
}

.suggestion-number {
  font-size: 12px;
  color: #909399;
  font-weight: 500;
}

/* Fancy divider */
.fancy-divider {
  height: 1px;
  margin: 25px 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.1),
    transparent
  );
  position: relative;
}

.fancy-divider:before {
  content: "•";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(0, 0, 0, 0.2);
  font-size: 12px;
}

/* Custom alert */
.custom-alert {
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-alert:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.alert-title {
  font-weight: 600;
  font-size: 16px;
}

.alert-content {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.5;
}

/* Text formatting styles */
.list-number {
  font-weight: 600;
  color: #409eff;
  margin-right: 5px;
}

.recipe-step {
  display: block;
  font-weight: 600;
  color: #409eff;
  margin: 15px 0 5px;
  padding-left: 5px;
  border-left: 2px solid #409eff;
}

.ingredients-title,
.instructions-title {
  display: block;
  font-weight: 600;
  font-size: 18px;
  color: #303133;
  margin: 20px 0 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ebeef5;
  position: relative;
}

.ingredients-title:after,
.instructions-title:after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #409eff;
}

.tip-title {
  display: block;
  font-weight: 600;
  color: #e6a23c;
  margin: 15px 0 5px;
  padding-left: 5px;
  border-left: 2px solid #e6a23c;
}

/* Custom styles for the autocomplete dropdown */
.my-autocomplete {
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  border: none;
  overflow: hidden;
}

.my-autocomplete li {
  line-height: 1.5;
  padding: 10px 15px;
  transition: all 0.2s ease;
}

.my-autocomplete li:hover {
  background-color: #ecf5ff;
}

.my-autocomplete li.highlighted {
  background-color: #409eff;
  color: white;
}

.my-autocomplete li.highlighted .suggestion-option i {
  color: white;
}

/* Responsive adjustments */
@media screen and (max-width: 992px) {
  .main-content {
    padding: 15px;
  }

  .card-header h2 {
    font-size: 22px;
  }

  .results-header h3 {
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .prompt-decoration {
    max-width: 400px;
  }

  .card-header h2 {
    font-size: 20px;
  }

  .results-header h3 {
    font-size: 18px;
  }

  .suggestion-item {
    padding: 15px;
  }

  .decoration-item {
    width: 30px;
    height: 30px;
  }

  .decoration-item i {
    font-size: 16px;
  }

  .food-icon {
    width: 30px;
    height: 30px;
    margin: 0 10px;
  }

  /* Reduce animation for better performance on mobile */
  .decoration-item {
    animation: float 8s ease-in-out infinite;
  }
}

@media screen and (max-width: 480px) {
  .user-prompts-container {
    padding: 10px 0;
  }

  .main-content {
    padding: 10px;
  }

  .prompt-decoration {
    max-width: 300px;
  }

  .card-header i {
    font-size: 20px;
    margin: 0 10px;
  }

  .card-header h2 {
    font-size: 18px;
  }

  .selection-header,
  .input-header {
    font-size: 14px;
  }

  .results-header i {
    font-size: 20px;
  }

  .results-header h3 {
    font-size: 16px;
  }

  .suggestion-item {
    padding: 12px;
  }

  .recipe-title {
    font-size: 16px;
  }

  .encouragement-title {
    font-size: 14px;
  }

  .food-icon {
    width: 25px;
    height: 25px;
    margin: 0 8px;
  }

  /* Disable some animations for better performance */
  @media (prefers-reduced-motion: reduce) {
    .decoration-item,
    .food-icon,
    .selection-header i,
    .encouragement-title i {
      animation: none;
    }

    .card-header:before {
      animation: none;
    }

    .suggestion-item:hover,
    .results-container:hover,
    .prompt-selection:hover,
    .prompt-input-container:hover,
    .custom-alert:hover {
      transform: none;
    }
  }
}

/* Print styles */
@media print {
  .user-prompts-container {
    padding: 0;
    background: none;
  }

  .prompt-decoration,
  .decorative-food-header {
    display: none;
  }

  .prompt-card {
    box-shadow: none;
    border: 1px solid #ddd;
  }

  .card-header:before {
    display: none;
  }

  .suggestion-item {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
