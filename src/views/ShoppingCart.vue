<template>
  <div class="cart-page">

    <!-- Page header -->
    <div class="page-header">
      <router-link to="/" class="back-link">
        <span class="back-arrow">←</span> Home
      </router-link>
      <div class="page-title">
        <span>🛒</span>
        <h2>Shopping Cart</h2>
      </div>
      <div class="item-count-badge">{{ cartItems.length }} item{{ cartItems.length !== 1 ? 's' : '' }}</div>
    </div>

    <div class="cart-layout">

      <!-- Add item form -->
      <div class="form-card">
        <div class="form-card-header">
          <span>➕</span>
          <h3>Add Item</h3>
        </div>
        <div class="form-body">
          <div class="form-field">
            <label class="field-label">Item Name</label>
            <el-input v-model="newItem.name" placeholder="e.g. Apples" prefix-icon="el-icon-goods" clearable></el-input>
          </div>
          <div class="form-field">
            <label class="field-label">Category</label>
            <el-input v-model="newItem.category" placeholder="e.g. Fruits" prefix-icon="el-icon-menu" clearable></el-input>
          </div>
          <div class="form-field">
            <label class="field-label">Description</label>
            <el-input v-model="newItem.description" placeholder="Optional notes" prefix-icon="el-icon-document" clearable></el-input>
          </div>
          <div class="form-field">
            <label class="field-label">Price ($)</label>
            <el-input v-model="newItem.price" type="number" placeholder="0.00" prefix-icon="el-icon-price-tag" clearable></el-input>
          </div>
          <el-button class="add-btn" type="success" @click="addItem" :disabled="!newItem.name">
            <i class="el-icon-plus"></i> Add to Cart
          </el-button>
        </div>
      </div>

      <!-- Cart table -->
      <div class="table-card">
        <div class="table-card-header">
          <span>🧺</span>
          <h3>Cart Items</h3>
        </div>

        <div v-if="cartItems.length === 0" class="empty-cart">
          <span class="empty-icon">🛒</span>
          <p>Your cart is empty</p>
          <span class="empty-hint">Add items using the form</span>
        </div>

        <el-table v-else :data="cartItems" class="cart-table" stripe>
          <el-table-column prop="name" label="Name" min-width="120">
            <template slot-scope="scope">
              <span class="item-name">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="category" label="Category" min-width="110">
            <template slot-scope="scope">
              <span class="category-tag">{{ scope.row.category }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="Price" min-width="90">
            <template slot-scope="scope">
              <span class="price-val">${{ parseFloat(scope.row.price || 0).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="Description" min-width="140">
            <template slot-scope="scope">
              <span class="desc-text">{{ scope.row.description || '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="" width="70">
            <template slot-scope="scope">
              <el-tooltip content="Remove" placement="top">
                <el-button type="danger" size="mini" circle icon="el-icon-delete" plain @click="removeFromCart(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- Totals & checkout -->
        <div v-if="cartItems.length > 0" class="cart-footer">
          <div class="total-row">
            <span class="total-label">Total</span>
            <span class="total-amount">${{ totalPrice.toFixed(2) }}</span>
          </div>
          <el-button type="primary" class="checkout-btn" @click="checkout">
            <i class="el-icon-check"></i> Checkout
          </el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: { name: "", category: "", description: "", price: "" },
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
    },
  },
  methods: {
    addItem() {
      if (!this.newItem.name) return;
      this.cartItems.push({ ...this.newItem });
      this.newItem = { name: "", category: "", description: "", price: "" };
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter(i => i !== item);
    },
    checkout() {
      this.$message({ message: "Checking out…", type: "success" });
    },
  },
};
</script>

<style scoped>
.cart-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 16px 48px;
  min-height: 100vh;
}

/* ── Page header ── */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
.back-link {
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #606266;
  font-size: 14px;
  padding: 6px 14px;
  border-radius: 20px;
  background: rgba(255,255,255,0.8);
  border: 1px solid rgba(0,0,0,0.08);
  transition: background 0.18s, color 0.18s;
}
.back-link:hover { background: rgba(103,194,58,0.1); color: #43a047; }
.back-arrow { font-size: 16px; }
.page-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.page-title h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #43a047, #1565c0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.page-title span { font-size: 26px; }
.item-count-badge {
  background: linear-gradient(135deg, #43a047, #66bb6a);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(67,160,71,0.25);
}

/* ── Layout ── */
.cart-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
  align-items: start;
}
@media (max-width: 750px) {
  .cart-layout { grid-template-columns: 1fr; }
}

/* ── Shared card ── */
.form-card,
.table-card {
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: 0 3px 18px rgba(0,0,0,0.07);
  overflow: hidden;
}

.form-card-header,
.table-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px 14px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  background: linear-gradient(135deg, rgba(103,194,58,0.08), rgba(64,158,255,0.06));
}
.form-card-header span,
.table-card-header span { font-size: 20px; }
.form-card-header h3,
.table-card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #303133;
}

/* ── Form ── */
.form-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
.form-field { display: flex; flex-direction: column; gap: 5px; }
.field-label { font-size: 13px; font-weight: 600; color: #606266; }

.add-btn {
  margin-top: 6px;
  border-radius: 10px;
  font-weight: 600;
  height: 42px;
}

/* ── Table ── */
.cart-table { width: 100%; }
:deep(.el-table th) {
  background: rgba(103,194,58,0.06) !important;
  color: #606266;
  font-weight: 600;
  font-size: 13px;
}
:deep(.el-table td) { font-size: 13px; }
:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background: rgba(103,194,58,0.03);
}
.item-name { font-weight: 600; color: #303133; }
.category-tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(64,158,255,0.1);
  color: #409eff;
  border: 1px solid rgba(64,158,255,0.2);
}
.price-val { font-weight: 700; color: #43a047; }
.desc-text { color: #909399; font-size: 12px; }

/* ── Empty state ── */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 48px 20px;
  color: #c0c4cc;
}
.empty-icon { font-size: 48px; opacity: 0.4; }
.empty-cart p { margin: 0; font-size: 16px; font-weight: 600; color: #909399; }
.empty-hint { font-size: 13px; }

/* ── Cart footer ── */
.cart-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid rgba(0,0,0,0.06);
  background: rgba(103,194,58,0.04);
  flex-wrap: wrap;
  gap: 12px;
}
.total-row { display: flex; align-items: baseline; gap: 10px; }
.total-label { font-size: 14px; font-weight: 600; color: #606266; }
.total-amount { font-size: 24px; font-weight: 800; color: #43a047; }
.checkout-btn {
  border-radius: 12px;
  font-weight: 700;
  padding: 10px 28px;
  font-size: 15px;
}
</style>
