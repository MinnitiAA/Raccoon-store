<template>
  <main class="container py-5" style="max-width: 1100px;">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div>
        <span class="badge bg-warning text-dark mb-2">Purchase History</span>
        <h1 class="mb-1">Order History</h1>
        <p class="text-secondary mb-0">
          Review your past Raccoon Store purchases and saved order details.
        </p>
      </div>

      <router-link to="/" class="btn btn-outline-warning">
        Continue Shopping
      </router-link>
    </div>

    <div v-if="message" class="alert alert-warning">
      {{ message }}
    </div>

    <section
        v-if="orders.length === 0 && !message"
        class="app-surface p-5 rounded-4 text-center"
    >
      <div class="display-5 mb-3">🛒</div>

      <h2 class="h4 mb-2">No orders yet</h2>

      <p class="text-secondary mb-4">
        Once you place an order, your purchased gaming gear will appear here.
      </p>

      <router-link to="/" class="btn btn-warning text-dark">
        Start Shopping
      </router-link>
    </section>

    <div v-else class="vstack gap-4">
      <div
          v-for="order in orders"
          :key="order.id"
          class="app-surface p-4 rounded-4"
      >
        <div class="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
          <div>
            <span class="badge bg-warning text-dark mb-2">
              Order
            </span>

            <div class="text-secondary small">
              {{ formatDate(order.createdAt) }}
            </div>
          </div>

          <div class="text-md-end">
            <p class="text-secondary small mb-1">Total</p>
            <div class="fw-bold text-warning fs-5">
              {{ formatMoney(order.total) }}
            </div>
          </div>
        </div>

        <div class="vstack gap-3">
          <div
              v-for="item in order.items"
              :key="item.id"
              class="order-item d-flex flex-column flex-sm-row gap-3 align-items-sm-center border-top pt-3"
          >
            <img
                :src="item.image"
                :alt="item.name"
                class="order-img rounded-3"
            >

            <div class="flex-grow-1">
              <div class="fw-semibold">
                {{ item.name }}
              </div>

              <div class="text-secondary small">
                Qty: {{ item.qty }}
              </div>
            </div>

            <div class="fw-semibold text-sm-end">
              {{ formatMoney(item.lineTotal) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getOrders } from '../services/orders'

export default {
  name: 'OrderHistoryView',

  data() {
    return {
      orders: [],
      message: ''
    }
  },

  async mounted() {
    try {
      this.orders = await getOrders()
    } catch (error) {
      this.message = error.message
    }
  },

  methods: {
    formatDate(dateValue) {
      if (!dateValue) return ''

      const date =
          typeof dateValue.toDate === 'function'
              ? dateValue.toDate()
              : new Date(dateValue)

      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(date)
    },

    formatMoney(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    }
  }
}
</script>

<style scoped lang="scss">
.order-img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.04);
}

@media (max-width: 575.98px) {
  .order-img {
    width: 100%;
    height: 150px;
  }

  .order-item {
    text-align: center;
  }
}
</style>