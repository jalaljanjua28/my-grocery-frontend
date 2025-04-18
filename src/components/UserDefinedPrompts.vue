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
        <div class="prompt-decoration top-decoration">
          <div class="decoration-item" v-for="i in 5" :key="`top-${i}`">
            <i :class="`el-icon-${promptIcons[i % promptIcons.length]}`"></i>
          </div>
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
const baseURL = "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api";
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
.custom-page-header {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
}
/* Main container styling */
.user-prompts-container {
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
.prompt-decoration {
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
}

/* Card styling */
.prompt-card {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: none;
  background: linear-gradient(to bottom right, #ffffff, #f9f9f9);
  margin-bottom: 30px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  margin-bottom: 20px;
  background: linear-gradient(to right, #ecf5ff, #d7ebff);
  border-bottom: 2px dashed #409eff;
}

.card-header i {
  font-size: 24px;
  color: #409eff;
  margin: 0 15px;
}

.card-header h2 {
  margin: 0;
  color: #409eff;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Prompt selection */
.prompt-selection {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
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
}

.prompt-select {
  width: 100%;
}

.option-content {
  display: flex;
  align-items: center;
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
}

/* Results container */
.results-container {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.5s ease-out;
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
}
.mood-item {
  border-left: 4px solid #e6a23c;
}
.fusion-item {
  border-left: 4px solid #409eff;
}
.dishes-item {
  border-left: 4px solid #67c23a;
}
.recipe-item {
  border-left: 4px solid #909399;
}

.suggestion-content {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #606266;
}

/* Recipe specific styling */
.recipe-content,
.encouragement-content {
  margin-bottom: 20px;
}

.recipe-title {
  font-weight: 600;
  font-size: 18px;
  color: #303133;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px dashed #dcdfe6;
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
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

/* Different tag styles for each type */
.waste-tag {
  background-color: #fef0f0;
  color: #f56c6c;
}
.mood-tag {
  background-color: #fdf6ec;
  color: #e6a23c;
}
.fusion-tag {
  background-color: #ecf5ff;
  color: #409eff;
}
.dishes-tag {
  background-color: #f0f9eb;
  color: #67c23a;
}
.recipe-tag {
  background-color: #f4f4f5;
  color: #909399;
}

.suggestion-number {
  font-size: 12px;
  color: #909399;
}

/* Fancy divider */
.fancy-divider {
  height: 1px;
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
}

.alert-title {
  font-weight: 600;
  font-size: 16px;
}

.alert-content {
  margin-top: 8px;
  font-size: 14px;
}

/* Text formatting styles */
.list-number {
  font-weight: 600;
  color: #409eff;
}

.recipe-step {
  display: block;
  font-weight: 600;
  color: #409eff;
  margin: 15px 0 5px;
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
}

.tip-title {
  display: block;
  font-weight: 600;
  color: #e6a23c;
  margin: 15px 0 5px;
}

/* Responsive adjustments */
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
}

@media screen and (max-width: 480px) {
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
}
</style>
