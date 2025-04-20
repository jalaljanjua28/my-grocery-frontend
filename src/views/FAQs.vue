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

<style scoped>
/* Main container styling */
.faqs-container {
  animation: fadeIn 0.5s ease-in-out;
  position: relative;
  min-height: 100vh;
}

/* Background pattern */
.faqs-container:before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiPjwvcmVjdD4KPC9zdmc+");
  opacity: 0.6;
  z-index: -1;
  pointer-events: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Page header styling */
.custom-page-header {
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
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffffc9 !important;
}

/* Header section styling */
.faq-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  width: 100%;
  max-width: 800px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.faq-icon-container {
  display: inline-block;
  padding: 20px;
  background-color: #409eff;
  border-radius: 50%;
  margin-bottom: 15px;
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.faq-icon {
  font-size: 40px;
  color: white;
}

.faq-title {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 10px;
}

.faq-subtitle {
  font-size: 16px;
  color: #606266;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Decorative food header and footer */
.decorative-food-header,
.decorative-food-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto 30px;
  max-width: 800px;
}

.decorative-food-footer {
  margin: 30px auto 10px;
}

.food-icon {
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.food-icon:hover {
  transform: rotate(15deg) scale(1.2);
  opacity: 1;
}

.banana {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23f1c40f" d="M70,20c-20-10-40,0-50,20s-10,40,0,50s40,10,50,0s20-30,10-50S90,30,70,20z"/></svg>');
}

.carrot {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23e67e22" d="M30,10L10,30c20,20,40,40,60,60l20-20C70,50,50,30,30,10z"/><path fill="%2327ae60" d="M30,10c0,0-10,5-10,15s10,15,10,15S40,30,30,10z"/></svg>');
}

.broccoli {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%232ecc71" d="M50,20c-15,0-30,15-30,30h60C80,35,65,20,50,20z"/><path fill="%2327ae60" d="M50,20c0,0-10,10-10,30h20C60,30,50,20,50,20z"/><path fill="%23795548" d="M45,50v40h10V50H45z"/></svg>');
}

.orange {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="%23e67e22" cx="50" cy="50" r="40"/><path fill="%2327ae60" d="M50,10c0,0,5,10,0,20h10C60,15,50,10,50,10z"/></svg>');
}

/* FAQ content styling */
.faq-content {
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.faq-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.faq-collapse {
  border: none;
  background-color: transparent;
}

.faq-item {
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Override Element UI collapse styles */
.faq-item >>> .el-collapse-item__header {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  background-color: #f5f7fa;
  padding: 15px 20px;
  border-radius: 8px;
  border-bottom: none;
  position: relative;
  transition: all 0.3s ease;
  height: auto;
  line-height: 1.5;
  display: flex;
  align-items: center;
  width: 100%;
}

.faq-item >>> .el-collapse-item__header:hover {
  background-color: #ecf5ff;
  color: #409eff;
}

.faq-item >>> .el-collapse-item__header.is-active {
  background-color: #ecf5ff;
  color: #409eff;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.faq-item >>> .el-collapse-item__header:before {
  content: "Q:";
  margin-right: 10px;
  font-weight: 700;
  color: #409eff;
}

.faq-item >>> .el-collapse-item__arrow {
  margin-left: auto;
  transition: transform 0.3s;
  font-weight: 700;
  color: #409eff;
}

.faq-item >>> .el-collapse-item__wrap {
  background-color: white;
  border-top: none;
  border-bottom: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.faq-item >>> .el-collapse-item__content {
  padding: 15px 20px;
  background-color: white;
  color: #606266;
}

.faq-answer {
  position: relative;
  padding-left: 25px;
}

.faq-answer:before {
  content: "A:";
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 700;
  color: #67c23a;
}

.answer-line {
  margin: 8px 0;
  line-height: 1.6;
}

/* FAQ categories section */
.faq-categories {
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
}

.categories-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ebeef5;
}

.categories-title i {
  margin-right: 10px;
  color: #409eff;
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 120px;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background-color: #ecf5ff;
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #f5f7fa;
  border-radius: 50%;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.category-item:hover .category-icon {
  background-color: #409eff;
}

.category-icon i {
  font-size: 24px;
  color: #409eff;
  transition: all 0.3s ease;
}

.category-item:hover .category-icon i {
  color: white;
}

.category-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  text-align: center;
  transition: all 0.3s ease;
}

.category-item:hover .category-name {
  color: #409eff;
}

/* Still have questions section */
.more-questions {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  padding: 30px;
  background-color: #f5f7fa;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.more-questions-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 15px;
}

.more-questions-text {
  font-size: 16px;
  color: #606266;
  margin-bottom: 20px;
}

.contact-button {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.contact-button i {
  margin-right: 8px;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
  .faq-title {
    font-size: 24px;
  }

  .faq-subtitle {
    font-size: 14px;
  }

  .faq-item >>> .el-collapse-item__header {
    font-size: 15px;
    padding: 12px 15px;
  }

  .faq-answer {
    padding-left: 20px;
  }

  .category-container {
    gap: 10px;
  }

  .category-item {
    width: 100px;
    padding: 12px;
  }

  .category-icon {
    width: 40px;
    height: 40px;
  }

  .category-icon i {
    font-size: 20px;
  }

  .category-name {
    font-size: 12px;
  }

  .more-questions {
    padding: 20px;
  }

  .more-questions-title {
    font-size: 20px;
  }

  .more-questions-text {
    font-size: 14px;
  }
}

@media screen and (max-width: 480px) {
  .main-content {
    padding: 15px 10px;
  }

  .faq-header {
    padding: 20px 15px;
  }

  .faq-icon-container {
    padding: 15px;
  }

  .faq-icon {
    font-size: 30px;
  }

  .faq-title {
    font-size: 20px;
  }

  .faq-subtitle {
    font-size: 13px;
  }

  .faq-content {
    padding: 15px;
  }

  .faq-item >>> .el-collapse-item__header {
    font-size: 14px;
    padding: 10px 15px;
  }

  .faq-item >>> .el-collapse-item__content {
    padding: 10px 15px;
  }

  .category-container {
    gap: 8px;
  }

  .category-item {
    width: 80px;
    padding: 10px;
  }

  .category-icon {
    width: 35px;
    height: 35px;
  }

  .category-icon i {
    font-size: 18px;
  }

  .category-name {
    font-size: 11px;
  }

  .more-questions {
    padding: 15px;
  }

  .more-questions-title {
    font-size: 18px;
  }

  .more-questions-text {
    font-size: 13px;
  }

  .contact-button {
    padding: 10px 20px;
    font-size: 14px;
  }
}

/* Print styles */
@media print {
  .faqs-container:before {
    display: none;
  }

  .faq-header,
  .decorative-food-header,
  .decorative-food-footer,
  .faq-categories,
  .more-questions {
    display: none;
  }

  .faq-content {
    width: 100%;
    margin: 0;
    box-shadow: none;
    padding: 0;
  }

  .faq-item >>> .el-collapse-item__header {
    background-color: white;
    color: black;
    page-break-inside: avoid;
  }

  .faq-item >>> .el-collapse-item__content {
    display: block !important;
    page-break-inside: avoid;
  }

  .faq-answer {
    display: block !important;
  }
}
</style>
