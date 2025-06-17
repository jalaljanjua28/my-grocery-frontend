<template>
  <div class="delete-all-container">
    <el-card class="delete-card">
      <div slot="header" class="card-header">
        <span class="card-title">Delete All Items</span>
        <i class="el-icon-delete"></i>
      </div>

      <div class="delete-options">
        <el-row :gutter="20">
          <el-col :span="12" v-for="option in deleteOptions" :key="option.key">
            <el-card class="option-card" :class="{ loading: option.loading }">
              <div class="option-content">
                <i :class="option.icon" class="option-icon"></i>
                <h3>{{ option.title }}</h3>
                <p>{{ option.description }}</p>

                <el-button
                  type="danger"
                  :loading="option.loading"
                  @click="confirmDelete(option)"
                  :disabled="isAnyLoading"
                  class="delete-btn"
                >
                  <i class="el-icon-delete"></i>
                  Delete All {{ option.title }}
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div class="bulk-actions" v-if="!isAnyLoading">
        <el-divider content-position="center">Bulk Actions</el-divider>
        <el-button
          type="danger"
          size="large"
          @click="confirmDeleteAll"
          class="delete-all-btn"
        >
          <i class="el-icon-warning"></i>
          Delete Everything
        </el-button>
      </div>

      <!-- Loading overlay -->
      <div v-if="isAnyLoading" class="loading-overlay">
        <el-loading-spinner></el-loading-spinner>
        <p>Processing deletion...</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { deleteAllItems } from "../plugins/Dataservice.js";

export default {
  name: "DeleteAll",
  data() {
    return {
      deleteOptions: [
        {
          key: "master-nonexpired",
          title: "Non-Expired Items",
          description: "Delete all items that haven't expired yet",
          icon: "el-icon-check",
          loading: false,
          endpoint: "master-nonexpired",
        },
        {
          key: "master-expired",
          title: "Expired Items",
          description: "Delete all expired items from your inventory",
          icon: "el-icon-close",
          loading: false,
          endpoint: "master-expired",
        },
        {
          key: "shopping-list",
          title: "Shopping List",
          description: "Clear your entire shopping list",
          icon: "el-icon-shopping-cart-2",
          loading: false,
          endpoint: "shopping-list",
        },
        {
          key: "purchase-list",
          title: "Purchase List",
          description: "Delete all purchased items",
          icon: "el-icon-goods",
          loading: false,
          endpoint: "purchase-list",
        },
      ],
    };
  },
  computed: {
    isAnyLoading() {
      return this.deleteOptions.some((option) => option.loading);
    },
  },
  methods: {
    confirmDelete(option) {
      this.$confirm(
        `This will permanently delete all ${option.title.toLowerCase()}. Continue?`,
        "Warning",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
          confirmButtonClass: "el-button--danger",
        }
      )
        .then(() => {
          this.deleteItems(option);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete cancelled",
          });
        });
    },

    confirmDeleteAll() {
      this.$confirm(
        "This will permanently delete ALL items from ALL categories. This action cannot be undone. Continue?",
        "Danger Zone",
        {
          confirmButtonText: "Delete Everything",
          cancelButtonText: "Cancel",
          type: "error",
          confirmButtonClass: "el-button--danger",
        }
      )
        .then(() => {
          this.deleteAllCategories();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Bulk delete cancelled",
          });
        });
    },

    async deleteItems(option) {
      option.loading = true;

      try {
        await deleteAllItems(option.endpoint);

        this.$message({
          type: "success",
          message: `${option.title} deleted successfully!`,
          duration: 3000,
        });

        // Emit event to parent component to refresh data
        this.$emit("items-deleted", option.key);
      } catch (error) {
        console.error(`Error deleting ${option.title}:`, error);
        this.$message({
          type: "error",
          message: `Failed to delete ${option.title.toLowerCase()}. Please try again.`,
          duration: 5000,
        });
      } finally {
        option.loading = false;
      }
    },

    async deleteAllCategories() {
      // Set all to loading
      this.deleteOptions.forEach((option) => {
        option.loading = true;
      });

      const results = [];

      try {
        // Delete all categories sequentially to avoid overwhelming the server
        for (const option of this.deleteOptions) {
          try {
            await deleteAllItems(option.endpoint);
            results.push({ option: option.title, success: true });
          } catch (error) {
            console.error(`Error deleting ${option.title}:`, error);
            results.push({ option: option.title, success: false, error });
          }
        }

        // Check results and show appropriate message
        const successful = results.filter((r) => r.success).length;
        const failed = results.filter((r) => !r.success).length;

        if (failed === 0) {
          this.$message({
            type: "success",
            message: "All items deleted successfully!",
            duration: 3000,
          });
        } else if (successful > 0) {
          this.$message({
            type: "warning",
            message: `${successful} categories deleted successfully, ${failed} failed.`,
            duration: 5000,
          });
        } else {
          this.$message({
            type: "error",
            message: "Failed to delete items. Please try again.",
            duration: 5000,
          });
        }

        // Emit event to refresh all data
        this.$emit("all-items-deleted");
      } finally {
        // Reset loading states
        this.deleteOptions.forEach((option) => {
          option.loading = false;
        });
      }
    },
  },
};
</script>

<style scoped>
.el-card__body {
  padding: var(--spacing-sm) !important;
  display: flex;
  flex-direction: column;
}
.el-row {
  display: flex;
  flex-direction: column;
}
.delete-all-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.delete-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.delete-options {
  margin: 20px 0;
}

.option-card {
  margin-bottom: 20px;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.option-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.option-card.loading {
  opacity: 0.7;
}

.option-content {
  text-align: center;
  padding: 20px;
}

.option-icon {
  font-size: 48px;
  color: #409eff;
  margin-bottom: 15px;
  display: block;
}

.option-content h3 {
  margin: 10px 0;
  color: #303133;
  font-size: 18px;
}

.option-content p {
  color: #606266;
  margin-bottom: 20px;
  font-size: 14px;
}

.delete-btn {
  width: 100%;
  height: 40px;
  font-weight: bold;
}

.bulk-actions {
  text-align: center;
  margin-top: 30px;
}

.delete-all-btn {
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  z-index: 10;
}

.loading-overlay p {
  margin-top: 15px;
  color: #606266;
  font-size: 16px;
}

/* Responsive design */
@media (max-width: 768px) {
  .delete-options .el-col {
    margin-bottom: 15px;
  }

  .option-content {
    padding: 15px;
  }

  .option-icon {
    font-size: 36px;
  }
}
</style>
