<template>
  <div>
    <el-card>
      <el-collapse :accordion="true">
        <!-- Allergy Information Section -->
        <el-collapse-item title="Allergy Information">
          <div>
            <div>
              <div v-if="loadingAllergyInformation" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div
                v-if="AllergyInformation.length === 0"
                class="health-loading"
              >
                Loading...
              </div>
              <div
                v-else-if="
                  AllergyInformation.length > 0 && !loadingAllergyInformation
                "
              >
                <div v-for="item in AllergyInformation" :key="item.id">
                  <div><strong>Food Item: </strong>{{ item["Food Item"] }}</div>
                  <div>
                    <p>{{ item["Allergy Information"] }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="health-loading">
                No allergy information available.
              </div>
              <el-button
                type="info"
                @click="
                  fetchData(
                    'gpt',
                    '/allergy-information-using-gpt',
                    'AllergyInformation'
                  )
                "
                :loading="loading"
                plain
                >Generate Prompt</el-button
              >
            </div>
          </div>
        </el-collapse-item>
        <!-- Healthier Eating Alternatives Section -->
        <el-collapse-item title="Healthier Eating Alternatives">
          <div>
            <div>
              <div>
                <div v-if="loadingAlternatives" class="loading-indicator">
                  <el-spinner></el-spinner>
                </div>
                <div v-if="alternatives.length === 0" class="health-loading">
                  Loading...
                </div>
                <div
                  v-if="
                    alternatives &&
                    alternatives.length > 0 &&
                    !loadingAlternatives
                  "
                >
                  <div v-for="(item, index) in alternatives" :key="index">
                    <div>
                      <strong>Food Item:</strong> {{ item["Food Item"] }}
                    </div>
                    <p>
                      <strong>Healthy Alternative:</strong>
                      {{ item["Healthy Alternative"] }}
                    </p>
                  </div>
                </div>
                <div v-if="!alternatives">
                  <el-alert title="No Suggestions" type="info" show-icon>
                    No healthy alternatives available.
                  </el-alert>
                </div>
                <el-button
                  type="info"
                  @click="
                    fetchData(
                      'gpt',
                      '/healthier-alternatives-using-gpt',
                      'alternatives'
                    )
                  "
                  :loading="loading"
                  plain
                  >Generate Prompt
                </el-button>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <!-- Healthy Eating Advice Section -->
        <el-collapse-item title="Healthy Eating Advice">
          <div>
            <div>
              <div v-if="loadingEatingAdvice" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="eatingAdviceList.length === 0" class="health-loading">
                Loading...
              </div>
              <div v-if="eatingAdviceList.length > 0 && !loadingEatingAdvice">
                <div v-for="(item, index) in eatingAdviceList" :key="index">
                  <div>
                    <p>
                      <strong>Response:</strong> {{ item["Health Advice"] }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="!eatingAdviceList">
                <el-alert title="No Advice" type="info" show-icon>
                  No healthy eating advice available.
                </el-alert>
              </div>
              <el-button
                type="info"
                @click="
                  fetchData(
                    'gpt',
                    '/healthy-eating-advice-using-gpt',
                    'eatingAdviceList'
                  )
                "
                :loading="loading"
                plain
              >
                Generate Prompt
              </el-button>
            </div>
          </div>
        </el-collapse-item>
        <!-- Health Advice Section -->
        <el-collapse-item title="Health Advice">
          <div>
            <div>
              <div v-if="loadingHealthAdvice" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="healthAdviceList.length === 0" class="health-loading">
                Loading...
              </div>
              <div v-if="healthAdviceList.length > 0 && !loadingHealthAdvice">
                <div v-for="(advice, index) in healthAdviceList" :key="index">
                  <div slot="header" class="clearfix">
                    <span>Advice {{ index + 1 }}</span>
                  </div>
                  <div>
                    <p><strong>Prompt:</strong> {{ advice.Prompt }}</p>
                    <p>
                      <strong>Health Advice:</strong>
                      {{ advice["Health Advice"] }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="!healthAdviceList">
                <el-alert title="No Advice" type="info" show-icon>
                  No health available.
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
                :loading="loading"
                plain
              >
                Generate Prompt
              </el-button>
            </div>
          </div>
        </el-collapse-item>
        <!-- Healthy Items Usage Suggestions Section -->
        <el-collapse-item title="Healthy Items Usage">
          <div>
            <div>
              <div v-if="loadingHealthyUsage" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="suggestions.length === 0" class="health-loading">
                Loading...
              </div>
              <div
                v-if="
                  suggestions && suggestions.length > 0 && !loadingHealthyUsage
                "
              >
                <div v-for="(item, index) in suggestions" :key="index">
                  <div>
                    <strong>Food Item: </strong>{{ item["Food Item"] }}
                    <p><strong>Suggestion:</strong> {{ item["Suggestion"] }}</p>
                  </div>
                </div>
              </div>
              <div v-if="!suggestions">
                <el-alert title="No Suggestions" type="info" show-icon>
                  No healthy items usage suggestions available.
                </el-alert>
              </div>
              <el-button
                type="info"
                @click="
                  fetchData(
                    'gpt',
                    '/healthy-items-usage-using-gpt',
                    'suggestions'
                  )
                "
                :loading="loading"
                plain
                >Generate Prompt</el-button
              >
            </div>
          </div>
        </el-collapse-item>
        <!-- Health Incompatabilities Section -->
        <el-collapse-item title="Health Incompatibilities">
          <div>
            <div>
              <div
                v-if="loadingHealthIncompatabilities"
                class="loading-indicator"
              >
                <el-spinner></el-spinner>
              </div>
              <div
                v-if="healthIncompatibilities.length === 0"
                class="health-loading"
              >
                Loading...
              </div>
              <div
                v-else-if="
                  healthIncompatibilities.length > 0 &&
                  !loadingHealthIncompatabilities
                "
              >
                <div v-for="item in healthIncompatibilities" :key="item.id">
                  <strong>Food Combination: </strong>
                  {{ item["Food Combination"] }}
                  <p>
                    <strong>Health-wise Incompatabilities: </strong
                    >{{ item["Health-wise Incompatibility Information"] }}
                  </p>
                </div>
              </div>
              <div v-if="!healthIncompatibilities">
                <el-alert title="No Suggestions" type="info" show-icon>
                  No health incompatabilities suggestions available.
                </el-alert>
              </div>
              <el-button
                type="info"
                @click="
                  fetchData(
                    'gpt',
                    '/health-incompatabilities-suggestions-using-gpt',
                    'healthIncompatibilities'
                  )
                "
                :loading="loading"
                plain
                >Generate Prompt</el-button
              >
            </div>
          </div>
        </el-collapse-item>
        <!-- Nutritional Analysis Section -->
        <el-collapse-item title="Nutritional Analysis">
          <div>
            <div>
              <div v-if="loadingNutritionalAnalysis" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div
                v-if="nutritionalAnalysis.length === 0"
                class="health-loading"
              >
                Loading...
              </div>
              <div
                v-else-if="
                  nutritionalAnalysis.length > 0 && !loadingNutritionalAnalysis
                "
              >
                <div v-for="item in nutritionalAnalysis" :key="item.id">
                  <strong>Group of Items: </strong>
                  {{ item["Group of Items"].join(", ") }}
                  <p>
                    <strong>Nutritional Analysis: </strong>
                    {{ item["Nutritional Analysis"] }}
                  </p>
                </div>
              </div>
              <div v-if="!nutritionalAnalysis">
                <el-alert title="No Suggestions" type="info" show-icon>
                  No nutritional analysis available.
                </el-alert>
              </div>
            </div>
            <el-button
              type="info"
              @click="
                fetchData(
                  'gpt',
                  '/nutritional-analysis-using-gpt',
                  'nutritionalAnalysis'
                )
              "
              :loading="loading"
              plain
              >Generate Prompt</el-button
            >
          </div>
        </el-collapse-item>
        <!-- Nutritional Value Section -->
        <el-collapse-item title="Nutritional Value">
          <div>
            <div>
              <div v-if="loadingNutritionalValue" class="loading-indicator">
                <el-spinner></el-spinner>
              </div>
              <div v-if="nutritionalValue.length === 0" class="health-loading">
                Loading...
              </div>
              <div v-else-if="nutritionalValue.length > 0 && !loading">
                <div v-for="item in nutritionalValue" :key="item.id">
                  <strong>Food Item: </strong>
                  {{ item["Food Item"] }}
                  <p>
                    <strong>Nutritional Advice: </strong>
                    {{ item["Nutritional Advice"] }}
                  </p>
                </div>
              </div>
              <div v-if="!nutritionalValue">
                <el-alert title="No Suggestions" type="info" show-icon>
                  No nutritional value available.
                </el-alert>
              </div>
              <el-button
                type="info"
                @click="
                  fetchData(
                    'gpt',
                    '/nutritional-value-suggestions-using-gpt',
                    'nutritionalValue'
                  )
                "
                :loading="loading"
                plain
                >Generate Prompt</el-button
              >
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
const baseUrl = "https://my-grocery-app-hlai3cv5za-uc.a.run.app/api";
import { auth } from "../Firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      AllergyInformation: [],
      eatingAdviceList: [], // Updated property name
      alternatives: [],
      suggestions: [],
      healthIncompatibilities: [],
      nutritionalAnalysis: [],
      nutritionalValue: [],
      healthAdviceList: [],
      loadingAllergyInformation: false,
      loadingAlternatives: false,
      loadingEatingAdvice: false,
      loadingHealthAdvice: false,
      loadingHealthyUsage: false,
      loadingHealthIncompatabilities: false,
      loadingNutritionalAnalysis: false,
      loadingNutritionalValue: false,
      error: false,
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
          console.log("User is logged in"), user.email;
          try {
            await this.fetchData(
              "json",
              "/allergy-information-using-json",
              "AllergyInformation",
              "loadingAllergyInformation"
            );
            await this.fetchData(
              "json",
              "/healthier-alternatives-using-json",
              "alternatives",
              "loadingAlternatives"
            );
            await this.fetchData(
              "json",
              "/healthy-eating-advice-using-json",
              "eatingAdviceList",
              "loadingEatingAdvice"
            );
            await this.fetchData(
              "json",
              "/healthy-items-usage-using-json",
              "suggestions",
              "loadingHealthyUsage"
            );
            await this.fetchData(
              "json",
              "/health_incompatibilities_using_json",
              "healthIncompatibilities",
              "loadingHealthIncompatabilities"
            );
            await this.fetchData(
              "json",
              "/nutritional-analysis-using-json",
              "nutritionalAnalysis",
              "loadingNutritionalAnalysis"
            );
            await this.fetchData(
              "json",
              "/nutritional-value-using-json",
              "nutritionalValue",
              "loadingNutritionalValue"
            );
            await this.fetchData(
              "json",
              "/health-advice-using-json",
              "healthAdviceList",
              "loadingHealthAdvice"
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
    async fetchData(type, endpoint, property, loadingProperty) {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);
        console.log("idToken", idToken);
        this[loadingProperty] = true;
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
          response = await fetch(baseUrl + endpoint);
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
        this[loadingProperty] = false;
      } catch (error) {
        this.error = error.message;
        console.error("Error in fetchData:", error);
        this[loadingProperty] = false;
      }
    },
  },
};
</script>
<style scoped></style>
