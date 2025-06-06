<template>
  <div class="health-prompts-container">
    <div class="health-decoration top-decoration">
      <div class="decoration-item" v-for="i in 5" :key="`top-${i}`">
        <i :class="`el-icon-${healthIcons[i % healthIcons.length]}`"></i>
      </div>
    </div>

    <el-card class="health-card">
      <div class="card-header">
        <i class="el-icon-first-aid-kit"></i>
        <h2>Health & Wellness</h2>
        <i class="el-icon-first-aid-kit"></i>
      </div>

      <el-collapse :accordion="true" class="custom-collapse">
        <!-- Allergy Information Section -->
        <el-collapse-item title="Allergy Information" name="allergy">
          <template slot="title">
            <div class="collapse-title">
              <i class="el-icon-warning-outline"></i>
              <span>Allergy Information</span>
            </div>
          </template>

          <div class="content-wrapper">
            <div class="content-decoration left">
              <i class="el-icon-umbrella"></i>
            </div>

            <div class="content-body">
              <div v-if="!isLoading">
                <div
                  v-for="(item, index) in AllergyInformation"
                  :key="item.id"
                  class="suggestion-item allergy-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-warning"></i>
                    <h3>Allergy Alert</h3>
                  </div>

                  <p
                    v-if="item['Food Item'] && item['Food Item'].trim()"
                    class="food-item-list"
                  >
                    <i class="el-icon-food"></i>
                    <strong>Food Item: </strong>{{ item["Food Item"] }}
                  </p>

                  <div
                    v-if="
                      item['Allergy Information'] &&
                      item['Allergy Information'].trim()
                    "
                    class="suggestion-content"
                  >
                    <p v-html="formatText(item['Allergy Information'])"></p>
                  </div>

                  <el-divider
                    v-if="index < AllergyInformation.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidAllergyInformation"
                  title="No Allergy Information"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No Allergy Information Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Generate allergy information based on your inventory items.
                  </div>
                </el-alert>
              </div>

              <el-button
                type="danger"
                @click="
                  fetchData(
                    'gpt',
                    '/allergy-information-using-gpt',
                    'AllergyInformation'
                  )
                "
                :loading="isLoading"
                plain
                class="generate-button"
              >
                <i class="el-icon-magic-stick"></i>
                Generate Allergy Information
              </el-button>
            </div>

            <div class="content-decoration right">
              <i class="el-icon-umbrella"></i>
            </div>
          </div>
        </el-collapse-item>

        <!-- Healthier Eating Alternatives Section -->
        <el-collapse-item
          title="Healthier Eating Alternatives"
          name="alternatives"
        >
          <template slot="title">
            <div class="collapse-title">
              <i class="el-icon-refresh"></i>
              <span>Healthier Eating Alternatives</span>
            </div>
          </template>

          <div class="content-wrapper">
            <div class="content-decoration left">
              <i class="el-icon-apple"></i>
            </div>

            <div class="content-body">
              <div v-if="!isLoading">
                <div
                  v-for="(item, index) in alternatives"
                  :key="index"
                  class="suggestion-item alternative-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-refresh-right"></i>
                    <h3>Healthy Alternative</h3>
                  </div>

                  <p
                    v-if="item['Food Item'] && item['Food Item'].trim()"
                    class="food-item-list"
                  >
                    <i class="el-icon-food"></i>
                    <strong>Food Item:</strong> {{ item["Food Item"] }}
                  </p>

                  <p
                    v-if="
                      item['Healthy Alternative'] &&
                      item['Healthy Alternative'].trim()
                    "
                    class="suggestion-content"
                  >
                    <span
                      v-html="formatText(item['Healthy Alternative'])"
                    ></span>
                  </p>

                  <el-divider
                    v-if="index < alternatives.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidAlternatives"
                  title="No Healthy Alternatives"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No Healthy Alternatives Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Discover healthier alternatives to your current food items.
                  </div>
                </el-alert>
              </div>

              <el-button
                type="success"
                @click="
                  fetchData(
                    'gpt',
                    '/healthier-alternatives-using-gpt',
                    'alternatives'
                  )
                "
                :loading="isLoading"
                plain
                class="generate-button"
              >
                <i class="el-icon-magic-stick"></i>
                Generate Healthy Alternatives
              </el-button>
            </div>

            <div class="content-decoration right">
              <i class="el-icon-apple"></i>
            </div>
          </div>
        </el-collapse-item>

        <!-- Healthy Eating Advice Section -->
        <el-collapse-item title="Healthy Eating Advice" name="eating-advice">
          <template slot="title">
            <div class="collapse-title">
              <i class="el-icon-notebook-1"></i>
              <span>Healthy Eating Advice</span>
            </div>
          </template>

          <div class="content-wrapper">
            <div class="content-decoration left">
              <i class="el-icon-fork-spoon"></i>
            </div>

            <div class="content-body">
              <div v-if="!isLoading">
                <div
                  v-for="(item, index) in eatingAdviceList"
                  :key="index"
                  class="suggestion-item advice-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-document"></i>
                    <h3>Eating Advice</h3>
                  </div>

                  <div
                    v-if="item['Health Advice'] && item['Health Advice'].trim()"
                    class="suggestion-content"
                  >
                    <p>
                      <span v-html="formatText(item['Health Advice'])"></span>
                    </p>
                  </div>

                  <el-divider
                    v-if="index < eatingAdviceList.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidEatingAdvice"
                  title="No Healthy Eating Advice"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No Healthy Eating Advice Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Get personalized healthy eating advice based on your
                    inventory.
                  </div>
                </el-alert>
              </div>

              <el-button
                type="primary"
                @click="
                  fetchData(
                    'gpt',
                    '/healthy-eating-advice-using-gpt',
                    'eatingAdviceList'
                  )
                "
                :loading="isLoading"
                plain
                class="generate-button"
              >
                <i class="el-icon-magic-stick"></i>
                Generate Eating Advice
              </el-button>
            </div>

            <div class="content-decoration right">
              <i class="el-icon-fork-spoon"></i>
            </div>
          </div>
        </el-collapse-item>

        <!-- Health Advice Section -->
        <el-collapse-item title="Health Advice" name="health-advice">
          <template slot="title">
            <div class="collapse-title">
              <i class="el-icon-user"></i>
              <span>Health Advice</span>
            </div>
          </template>

          <div class="content-wrapper">
            <div class="content-decoration left">
              <i class="el-icon-medal"></i>
            </div>

            <div class="content-body">
              <div v-if="!isLoading">
                <div
                  v-for="(advice, index) in healthAdviceList"
                  :key="index"
                  class="suggestion-item health-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-help"></i>
                    <h3>Health Guidance</h3>
                  </div>

                  <div
                    class="prompt-container"
                    v-if="advice.Prompt && advice.Prompt.trim()"
                  >
                    <p class="prompt-text">
                      <i class="el-icon-chat-dot-round"></i>
                      <strong>Prompt:</strong> {{ advice.Prompt }}
                    </p>
                  </div>

                  <p
                    v-if="
                      advice['Health Advice'] && advice['Health Advice'].trim()
                    "
                    class="suggestion-content"
                  >
                    <span v-html="formatText(advice['Health Advice'])"></span>
                  </p>

                  <el-divider
                    v-if="index < healthAdviceList.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidHealthAdvice"
                  title="No Health Advice"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title">No Health Advice Available</span>
                  </template>
                  <div class="alert-content">
                    Get general health advice based on your inventory items.
                  </div>
                </el-alert>
              </div>

              <el-button
                type="info"
                @click="
                  fetchData(
                    'gpt',
                    '/health-advice-using-gpt',
                    'healthAdviceList'
                  )
                "
                :loading="isLoading"
                plain
                class="generate-button"
              >
                <i class="el-icon-magic-stick"></i>
                Generate Health Advice
              </el-button>
            </div>

            <div class="content-decoration right">
              <i class="el-icon-medal"></i>
            </div>
          </div>
        </el-collapse-item>

        <!-- Healthy Items Usage Suggestions Section -->
        <el-collapse-item title="Healthy Items Usage" name="usage">
          <template slot="title">
            <div class="collapse-title">
              <i class="el-icon-shopping-bag-1"></i>
              <span>Healthy Items Usage</span>
            </div>
          </template>

          <div class="content-wrapper">
            <div class="content-decoration left">
              <i class="el-icon-shopping-cart-full"></i>
            </div>

            <div class="content-body">
              <div v-if="!isLoading">
                <div
                  v-for="(item, index) in suggestions"
                  :key="index"
                  class="suggestion-item usage-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-shopping-cart-2"></i>
                    <h3>Usage Suggestion</h3>
                  </div>

                  <p
                    v-if="item['Food Item'] && item['Food Item'].trim()"
                    class="food-item-list"
                  >
                    <i class="el-icon-food"></i>
                    <strong>Food Item: </strong>{{ item["Food Item"] }}
                  </p>

                  <p
                    v-if="item['Suggestion'] && item['Suggestion'].trim()"
                    class="suggestion-content"
                  >
                    <span v-html="formatText(item['Suggestion'])"></span>
                  </p>

                  <el-divider
                    v-if="index < suggestions.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidSuggestions"
                  title="No Healthy Items Usage Suggestions"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No Healthy Items Usage Suggestions Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Learn how to use your items in healthy ways.
                  </div>
                </el-alert>
              </div>

              <el-button
                type="warning"
                @click="
                  fetchData(
                    'gpt',
                    '/healthy-items-usage-using-gpt',
                    'suggestions'
                  )
                "
                :loading="isLoading"
                plain
                class="generate-button"
              >
                <i class="el-icon-magic-stick"></i>
                Generate Usage Ideas
              </el-button>
            </div>

            <div class="content-decoration right">
              <i class="el-icon-shopping-cart-full"></i>
            </div>
          </div>
        </el-collapse-item>

        <!-- Health Incompatibilities Section -->
        <el-collapse-item
          title="Health Incompatibilities"
          name="incompatibilities"
        >
          <template slot="title">
            <div class="collapse-title">
              <i class="el-icon-remove"></i>
              <span>Health Incompatibilities</span>
            </div>
          </template>

          <div class="content-wrapper">
            <div class="content-decoration left">
              <i class="el-icon-circle-close"></i>
            </div>

            <div class="content-body">
              <div v-if="!isLoading">
                <div
                  v-for="(item, index) in healthIncompatibilities"
                  :key="item.id"
                  class="suggestion-item incompatibility-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-warning-outline"></i>
                    <h3>Incompatibility Warning</h3>
                  </div>

                  <p
                    v-if="
                      item['Food Combination'] &&
                      Array.isArray(item['Food Combination']) &&
                      item['Food Combination'].length > 0
                    "
                    class="combination-list"
                  >
                    <i class="el-icon-food"></i>
                    <strong>Food Combination: </strong>
                    <span class="combination-items">
                      <span
                        class="food-combo-tag"
                        v-for="(food, idx) in item['Food Combination']"
                        :key="idx"
                      >
                        {{ food }}
                      </span>
                    </span>
                  </p>

                  <p
                    v-if="
                      item['Health-wise Incompatibility Information'] &&
                      item['Health-wise Incompatibility Information'].trim()
                    "
                    class="suggestion-content incompatibility-info"
                  >
                    <i class="el-icon-info"></i>
                    <strong>Health-wise Incompatibilities: </strong>
                    <span
                      v-html="
                        formatText(
                          item['Health-wise Incompatibility Information']
                        )
                      "
                    ></span>
                  </p>

                  <el-divider
                    v-if="index < healthIncompatibilities.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidHealthIncompatibilities"
                  title="No Health Incompatibilities"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No Health Incompatibilities Information Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Discover food combinations that may have health
                    implications.
                  </div>
                </el-alert>
              </div>

              <el-button
                type="danger"
                @click="
                  fetchData(
                    'gpt',
                    '/health_incompatibilities_using_gpt',
                    'healthIncompatibilities'
                  )
                "
                :loading="isLoading"
                plain
                class="generate-button"
              >
                <i class="el-icon-magic-stick"></i>
                Generate Incompatibility Info
              </el-button>
            </div>

            <div class="content-decoration right">
              <i class="el-icon-circle-close"></i>
            </div>
          </div>
        </el-collapse-item>

        <!-- Nutritional Analysis Section -->
        <el-collapse-item title="Nutritional Analysis" name="analysis">
          <template slot="title">
            <div class="collapse-title">
              <i class="el-icon-data-analysis"></i>
              <span>Nutritional Analysis</span>
            </div>
          </template>

          <div class="content-wrapper">
            <div class="content-decoration left">
              <i class="el-icon-pie-chart"></i>
            </div>

            <div class="content-body">
              <div v-if="!isLoading">
                <div
                  v-for="(item, index) in nutritionalAnalysis"
                  :key="item.id"
                  class="suggestion-item analysis-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-data-line"></i>
                    <h3>Nutrition Breakdown</h3>
                  </div>

                  <p
                    v-if="
                      item['Group of Items'] &&
                      Array.isArray(item['Group of Items']) &&
                      item['Group of Items'].length > 0
                    "
                    class="group-list"
                  >
                    <i class="el-icon-collection"></i>
                    <strong>Group of Items: </strong>
                    <span class="group-items">
                      <span
                        class="food-group-tag"
                        v-for="(food, idx) in item['Group of Items']"
                        :key="idx"
                      >
                        {{ food }}
                      </span>
                    </span>
                  </p>

                  <p
                    v-if="
                      item['Nutritional Analysis'] &&
                      item['Nutritional Analysis'].trim()
                    "
                    class="suggestion-content analysis-info"
                  >
                    <i class="el-icon-document-checked"></i>
                    <strong>Nutritional Analysis: </strong>
                    <span
                      v-html="formatText(item['Nutritional Analysis'])"
                    ></span>
                  </p>

                  <el-divider
                    v-if="index < nutritionalAnalysis.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidNutritionalAnalysis"
                  title="No Nutritional Analysis"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No Nutritional Analysis Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Get detailed nutritional analysis of your food items.
                  </div>
                </el-alert>
              </div>

              <el-button
                type="primary"
                @click="
                  fetchData(
                    'gpt',
                    '/nutritional-analysis-using-gpt',
                    'nutritionalAnalysis'
                  )
                "
                :loading="isLoading"
                plain
                class="generate-button"
              >
                <i class="el-icon-magic-stick"></i>
                Generate Nutritional Analysis
              </el-button>
            </div>

            <div class="content-decoration right">
              <i class="el-icon-pie-chart"></i>
            </div>
          </div>
        </el-collapse-item>

        <!-- Nutritional Value Section -->
        <el-collapse-item title="Nutritional Value" name="value">
          <template slot="title">
            <div class="collapse-title">
              <i class="el-icon-star-on"></i>
              <span>Nutritional Value</span>
            </div>
          </template>

          <div class="content-wrapper">
            <div class="content-decoration left">
              <i class="el-icon-trophy"></i>
            </div>

            <div class="content-body">
              <div v-if="!isLoading">
                <div
                  v-for="(item, index) in nutritionalValue"
                  :key="item.id"
                  class="suggestion-item value-item"
                >
                  <div class="suggestion-header">
                    <i class="el-icon-medal-1"></i>
                    <h3>Nutritional Benefits</h3>
                  </div>

                  <p
                    v-if="item['Food Item'] && item['Food Item'].trim()"
                    class="food-item-list"
                  >
                    <i class="el-icon-food"></i>
                    <strong>Food Item: </strong>
                    {{ item["Food Item"] }}
                  </p>

                  <p
                    v-if="
                      item['Nutritional Advice'] &&
                      item['Nutritional Advice'].trim()
                    "
                    class="suggestion-content value-info"
                  >
                    <i class="el-icon-document"></i>
                    <strong>Nutritional Advice: </strong>
                    <span
                      v-html="formatText(item['Nutritional Advice'])"
                    ></span>
                  </p>

                  <el-divider
                    v-if="index < nutritionalValue.length - 1"
                    class="fancy-divider"
                  ></el-divider>
                </div>

                <el-alert
                  v-if="!hasValidNutritionalValue"
                  title="No Nutritional Value Information"
                  type="info"
                  show-icon
                  class="custom-alert"
                >
                  <template slot="title">
                    <span class="alert-title"
                      >No Nutritional Value Information Available</span
                    >
                  </template>
                  <div class="alert-content">
                    Learn about the nutritional benefits of your food items.
                  </div>
                </el-alert>
              </div>

              <el-button
                type="success"
                @click="
                  fetchData(
                    'gpt',
                    '/nutritional-value-using-gpt',
                    'nutritionalValue'
                  )
                "
                :loading="isLoading"
                plain
                class="generate-button"
              >
                <i class="el-icon-magic-stick"></i>
                Generate Nutritional Value Info
              </el-button>
            </div>

            <div class="content-decoration right">
              <i class="el-icon-trophy"></i>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <div class="health-decoration bottom-decoration">
      <div class="decoration-item" v-for="i in 5" :key="`bottom-${i}`">
        <i :class="`el-icon-${healthIcons[(i + 5) % healthIcons.length]}`"></i>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = "http://127.0.0.1:8081/api";
import { auth } from "../Firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      AllergyInformation: [],
      eatingAdviceList: [],
      alternatives: [],
      suggestions: [],
      healthIncompatibilities: [],
      nutritionalAnalysis: [],
      nutritionalValue: [],
      healthAdviceList: [],
      isLoading: false,
      error: false,
      activeNames: ["allergy"], // Default open section
      healthIcons: [
        "first-aid-kit",
        "apple",
        "umbrella",
        "medal",
        "trophy",
        "data-analysis",
        "user",
        "warning-outline",
        "medicine-bottle",
        "bell",
      ],
    };
  },
  computed: {
    hasValidAllergyInformation() {
      if (!this.AllergyInformation || this.AllergyInformation.length === 0) {
        return false;
      }
      return this.AllergyInformation.some(
        (item) =>
          (item["Food Item"] && item["Food Item"].trim() !== "") ||
          (item["Allergy Information"] &&
            item["Allergy Information"].trim() !== "")
      );
    },

    hasValidAlternatives() {
      if (!this.alternatives || this.alternatives.length === 0) {
        return false;
      }
      return this.alternatives.some(
        (item) =>
          (item["Food Item"] && item["Food Item"].trim() !== "") ||
          (item["Healthy Alternative"] &&
            item["Healthy Alternative"].trim() !== "")
      );
    },

    hasValidEatingAdvice() {
      if (!this.eatingAdviceList || this.eatingAdviceList.length === 0) {
        return false;
      }
      return this.eatingAdviceList.some(
        (item) => item["Health Advice"] && item["Health Advice"].trim() !== ""
      );
    },

    hasValidHealthAdvice() {
      if (!this.healthAdviceList || this.healthAdviceList.length === 0) {
        return false;
      }
      return this.healthAdviceList.some(
        (advice) =>
          (advice.Prompt && advice.Prompt.trim() !== "") ||
          (advice["Health Advice"] && advice["Health Advice"].trim() !== "")
      );
    },

    hasValidSuggestions() {
      if (!this.suggestions || this.suggestions.length === 0) {
        return false;
      }
      return this.suggestions.some(
        (item) =>
          (item["Food Item"] && item["Food Item"].trim() !== "") ||
          (item["Suggestion"] && item["Suggestion"].trim() !== "")
      );
    },

    hasValidHealthIncompatibilities() {
      if (
        !this.healthIncompatibilities ||
        this.healthIncompatibilities.length === 0
      ) {
        return false;
      }
      return this.healthIncompatibilities.some((item) => {
        const hasCombination =
          item["Food Combination"] &&
          Array.isArray(item["Food Combination"]) &&
          item["Food Combination"].length > 0;
        const hasInfo =
          item["Health-wise Incompatibility Information"] &&
          item["Health-wise Incompatibility Information"].trim() !== "";
        return hasCombination || hasInfo;
      });
    },

    hasValidNutritionalAnalysis() {
      if (!this.nutritionalAnalysis || this.nutritionalAnalysis.length === 0) {
        return false;
      }
      return this.nutritionalAnalysis.some((item) => {
        const hasItems =
          item["Group of Items"] &&
          Array.isArray(item["Group of Items"]) &&
          item["Group of Items"].length > 0;
        const hasAnalysis =
          item["Nutritional Analysis"] &&
          item["Nutritional Analysis"].trim() !== "";
        return hasItems || hasAnalysis;
      });
    },

    hasValidNutritionalValue() {
      if (!this.nutritionalValue || this.nutritionalValue.length === 0) {
        return false;
      }
      return this.nutritionalValue.some(
        (item) =>
          (item["Food Item"] && item["Food Item"].trim() !== "") ||
          (item["Nutritional Advice"] &&
            item["Nutritional Advice"].trim() !== "")
      );
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

      // Enhance health warnings with better formatting
      formattedText = formattedText.replace(
        /(Warning:|Caution:|Alert:|Note:|Important:)/gi,
        '<span class="health-warning-title">$1</span><br>'
      );

      // Enhance benefits section
      formattedText = formattedText.replace(
        /(Benefits:|Advantages:|Pros:|Positives:)/gi,
        '<span class="health-benefit-title">$1</span><br>'
      );

      // Format nutritional information
      formattedText = formattedText.replace(
        /(Contains:|Rich in:|High in:|Source of:)(\s*[\w\s,]+)/gi,
        '<span class="nutrition-highlight"><i class="el-icon-star-on"></i> $1$2</span>'
      );

      return formattedText;
    },

    async checkAuthState() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.currentUser = user;
          console.log("User is logged in"), user.email;
          try {
            await this.fetchData(
              "json",
              "/allergy-information-using-json",
              "AllergyInformation"
            );
            await this.fetchData(
              "json",
              "/healthier-alternatives-using-json",
              "alternatives"
            );
            await this.fetchData(
              "json",
              "/healthy-eating-advice-using-json",
              "eatingAdviceList"
            );
            await this.fetchData(
              "json",
              "/healthy-items-usage-using-json",
              "suggestions"
            );
            await this.fetchData(
              "json",
              "/health_incompatibilities_using_json",
              "healthIncompatibilities"
            );
            await this.fetchData(
              "json",
              "/nutritional-analysis-using-json",
              "nutritionalAnalysis"
            );
            await this.fetchData(
              "json",
              "/nutritional-value-using-json",
              "nutritionalValue"
            );
            await this.fetchData(
              "json",
              "/health-advice-using-json",
              "healthAdviceList"
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
        console.error("Error in fetchData:", error);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped></style>
