<template>
  <div class="faqs-container">
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="FAQs" class="custom-page-header">
        <template slot="content">
          <div class="page-title">
            <i class="el-icon-question"></i>
            <span>Frequently Asked Questions</span>
          </div>
        </template>
      </el-page-header>
    </router-link>

    <el-main class="main-content">
      <!-- Animated header section -->
      <div class="faq-header">
        <div class="faq-icon-container">
          <i class="el-icon-question faq-icon"></i>
        </div>
        <h2 class="faq-title">Frequently Asked Questions</h2>
        <p class="faq-subtitle">
          Find answers to common questions about our app features and
          functionality
        </p>
      </div>

      <!-- Decorative food-themed header -->
      <div class="decorative-food-header">
        <div class="food-icon apple"></div>
        <div class="food-icon banana"></div>
        <div class="food-icon carrot"></div>
        <div class="food-icon broccoli"></div>
        <div class="food-icon orange"></div>
      </div>

      <div class="faq-content">
        <el-collapse
          :accordion="true"
          v-model="activeName"
          class="faq-collapse"
        >
          <el-collapse-item
            v-for="(item, index) in faqs"
            :key="index"
            :title="item.question"
            :name="index"
            class="faq-item"
          >
            <div class="faq-answer">
              <p
                v-for="(line, lineIndex) in item.answer.split('\n')"
                :key="lineIndex"
                class="answer-line"
              >
                {{ line }}
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <!-- FAQ categories section -->
      <div class="faq-categories">
        <h3 class="categories-title">
          <i class="el-icon-collection-tag"></i>
          FAQ Categories
        </h3>

        <div class="category-container">
          <div class="category-item" @click="filterByCategory('app')">
            <div class="category-icon">
              <i class="el-icon-mobile-phone"></i>
            </div>
            <div class="category-name">App Features</div>
          </div>

          <div class="category-item" @click="filterByCategory('ocr')">
            <div class="category-icon">
              <i class="el-icon-camera"></i>
            </div>
            <div class="category-name">OCR & Scanning</div>
          </div>

          <div class="category-item" @click="filterByCategory('data')">
            <div class="category-icon">
              <i class="el-icon-document"></i>
            </div>
            <div class="category-name">Data & Privacy</div>
          </div>

          <div class="category-item" @click="filterByCategory('food')">
            <div class="category-icon">
              <i class="el-icon-food"></i>
            </div>
            <div class="category-name">Food Items</div>
          </div>

          <div class="category-item" @click="filterByCategory('all')">
            <div class="category-icon">
              <i class="el-icon-menu"></i>
            </div>
            <div class="category-name">View All</div>
          </div>
        </div>
      </div>

      <!-- Decorative food-themed footer -->
      <div class="decorative-food-footer">
        <div class="food-icon apple"></div>
        <div class="food-icon banana"></div>
        <div class="food-icon carrot"></div>
        <div class="food-icon broccoli"></div>
        <div class="food-icon orange"></div>
      </div>

      <!-- Still have questions section -->
      <div class="more-questions">
        <h3 class="more-questions-title">Still have questions?</h3>
        <p class="more-questions-text">
          If you couldn't find the answer to your question, feel free to contact
          us.
        </p>
        <el-button type="primary" class="contact-button">
          <i class="el-icon-message"></i>
          Contact Support
        </el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      currentCategory: "all",
      faqs: [
        {
          question: "How does the app use ChatGPT for prompts?",
          answer:
            "The app uses ChatGPT to generate prompts related to food items found in the receipts.\n This can include recipe suggestions, nutritional information, and more.",
          category: "app",
        },
        {
          question:
            "How does the app analyze the frequency of items purchased?",
          answer:
            "The app tracks the items extracted from receipts over time and provides reports on the frequency of specific items purchased.\n This helps users understand their purchasing habits.",
          category: "data",
        },
        {
          question: "Is there a way to view the history of receipts scanned?",
          answer:
            "Yes, the app maintains a history of all scanned receipts, allowing users to review past purchases and analyze their spending patterns.",
          category: "app",
        },
        {
          question: "Can the app categorize the items from the receipts?",
          answer:
            "Yes, the app can categorize items based on the extracted text, such as grouping food items by type (e.g., fruits, vegetables, dairy).",
          category: "food",
        },
        {
          question: "How accurate is the OCR feature in your app?",
          answer:
            "The OCR feature is designed to be highly accurate, using advanced algorithms to recognize and extract text from receipts.\n However, accuracy can vary depending on the quality of the receipt image.",
          category: "ocr",
        },
        {
          question: "Is the data from receipts stored securely?",
          answer:
            "Yes, the app ensures that all extracted data is stored securely, protecting user privacy and confidentiality.",
          category: "data",
        },
        {
          question: "Can the app provide insights on spending habits?",
          answer:
            "Yes, the app analyzes the extracted data to provide insights on spending habits,\n such as identifying frequently purchased items and total spending over time.",
          category: "app",
        },
        {
          question: "Does the app support multiple languages?",
          answer:
            "Currently, the app supports OCR and text extraction primarily in English.\n Support for additional languages may be added in future updates.",
          category: "ocr",
        },
        {
          question:
            "What kind of prompts related to food items does the app provide?",
          answer:
            "The app provides prompts such as recipe ideas, nutritional information,\n and suggestions for alternative ingredients based on the items found in the receipts.",
          category: "food",
        },
        {
          question:
            "Can the app integrate with other budgeting or expense tracking tools?",
          answer:
            "Integration with other budgeting or expense tracking tools is not currently available but may be considered for future updates.",
          category: "app",
        },
        {
          question: "What is the purpose of your app?",
          answer:
            "The app uses OCR technology to extract textual data from receipts and displays it.\n It also uses ChatGPT to provide prompts related to food items and analyzes the frequency of items purchased.",
          category: "app",
        },
        {
          question: "How to use the OCR feature in your app?",
          answer:
            "You can use the OCR feature by uploading a receipt image. The app will process the image and display the extracted textual data.",
          category: "ocr",
        },
        {
          question: "What are the key features of your app?",
          answer:
            "The app offers OCR to extract text from receipts, displays the extracted data, \nprovides ChatGPT prompts related to food items, and analyzes the frequency of items purchased.",
          category: "app",
        },
      ],
      displayedFaqs: [],
    };
  },
  created() {
    this.displayedFaqs = this.faqs;
  },
  methods: {
    filterByCategory(category) {
      this.currentCategory = category;
      this.activeName = "";

      if (category === "all") {
        this.displayedFaqs = this.faqs;
      } else {
        this.displayedFaqs = this.faqs.filter(
          (faq) => faq.category === category
        );
      }
    },
  },
  computed: {
    filteredFaqs() {
      if (this.currentCategory === "all") {
        return this.faqs;
      }
      return this.faqs.filter((faq) => faq.category === this.currentCategory);
    },
  },
};
</script>

<style scoped></style>
