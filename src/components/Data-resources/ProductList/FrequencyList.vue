<template>
  <div>
    <el-select v-model="interval" placeholder="Select interval">
      <el-option label="Biweekly" value="biweekly"></el-option>
      <el-option label="Monthly" value="monthly"></el-option>
      <el-option label="Today" value="today"></el-option>
    </el-select>
    <el-button type="primary" @click="fetchItemFrequency"
      >Fetch Item Frequency</el-button
    >
    <div v-if="itemFrequency">
      <ul>
        <li v-for="item in itemFrequency" :key="item.name">
          {{ item.name }}: {{ item.frequency }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: "biweekly",
      itemFrequency: null,
    };
  },
  methods: {
    async fetchItemFrequency() {
      try {
        const response = await fetch(
          `/api/item-frequency?interval=${this.interval}`
        );
        const data = await response.json();

        this.itemFrequency = data.itemFrequency;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
