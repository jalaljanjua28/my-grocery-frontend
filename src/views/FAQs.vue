<template>
  <div>
    <router-link to="/" style="text-decoration: none">
      <el-page-header content="FAQs"> </el-page-header>
    </router-link>
    <el-main class="main-content">
      <el-container>
        <h1>Frequently asked questions</h1>
        <el-main>
          <div
            style="
              background-color: darkcyan;
              padding: 15px;
              border-radius: 20px;
            "
          >
            <el-collapse v-model="activeName" style="color: black">
              <el-collapse-item
                v-for="(item, index) in faqs"
                :key="index"
                :title="item.question"
                :name="index"
              >
                {{ item.answer }}
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-main>
      </el-container>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      faqs: [
        {
          question: "How does the app use ChatGPT for prompts?",
          answer:
            "The app uses ChatGPT to generate prompts related to food items found in the receipts. This can include recipe suggestions, nutritional information, and more.",
        },
        {
          question:
            "How does the app analyze the frequency of items purchased?",
          answer:
            "The app tracks the items extracted from receipts over time and provides reports on the frequency of specific items purchased. This helps users understand their purchasing habits.",
        },
        {
          question: "Is there a way to view the history of receipts scanned?",
          answer:
            "Yes, the app maintains a history of all scanned receipts, allowing users to review past purchases and analyze their spending patterns.",
        },
        {
          question: "Can the app categorize the items from the receipts?",
          answer:
            "Yes, the app can categorize items based on the extracted text, such as grouping food items by type (e.g., fruits, vegetables, dairy).",
        },
        {
          question: "How accurate is the OCR feature in your app?",
          answer:
            "The OCR feature is designed to be highly accurate, using advanced algorithms to recognize and extract text from receipts. However, accuracy can vary depending on the quality of the receipt image.",
        },
        {
          question: "Is the data from receipts stored securely?",
          answer:
            "Yes, the app ensures that all extracted data is stored securely, protecting user privacy and confidentiality.",
        },
        {
          question: "Can the app provide insights on spending habits?",
          answer:
            "Yes, the app analyzes the extracted data to provide insights on spending habits, such as identifying frequently purchased items and total spending over time.",
        },
        {
          question: "Does the app support multiple languages?",
          answer:
            "Currently, the app supports OCR and text extraction primarily in English. Support for additional languages may be added in future updates.",
        },
        {
          question:
            "What kind of prompts related to food items does the app provide?",
          answer:
            "The app provides prompts such as recipe ideas, nutritional information, and suggestions for alternative ingredients based on the items found in the receipts.",
        },
        {
          question:
            "Can the app integrate with other budgeting or expense tracking tools?",
          answer:
            "Integration with other budgeting or expense tracking tools is not currently available but may be considered for future updates.",
        },
        {
          question: "What is the purpose of your app?",
          answer:
            "The app uses OCR technology to extract textual data from receipts and displays it. It also uses ChatGPT to provide prompts related to food items and analyzes the frequency of items purchased.",
        },
        {
          question: "How to use the OCR feature in your app?",
          answer:
            "You can use the OCR feature by uploading a receipt image. The app will process the image and display the extracted textual data.",
        },
        {
          question: "What are the key features of your app?",
          answer:
            "The app offers OCR to extract text from receipts, displays the extracted data, provides ChatGPT prompts related to food items, and analyzes the frequency of items purchased.",
        },
      ],
    };
  },
};
</script>
<style scoped>
.el-card__body,
.el-main {
  padding: 10px;
}
</style>
