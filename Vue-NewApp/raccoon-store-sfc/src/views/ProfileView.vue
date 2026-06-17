<template>
  <main class="container py-5" style="max-width: 800px;">
    <section class="card bg-dark text-light border-secondary shadow rounded-4">
      <div class="card-body p-4">
        <div class="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center mb-4">
          <div>
            <span class="badge bg-warning text-dark mb-2">Customer Profile</span>
            <h1 class="h3 mb-1">My Raccoon Store Account</h1>
            <p class="text-secondary mb-0">
              Manage your shopping experience, wishlist, and order history.
            </p>
          </div>

          <button class="btn btn-outline-warning" @click="handleLogout">
            Logout
          </button>
        </div>

        <div v-if="user" class="row g-3">
          <div class="col-12 col-md-6">
            <div class="p-3 rounded-4 border border-secondary h-100">
              <p class="text-secondary small mb-1">Signed in as</p>
              <p class="fw-semibold mb-0">{{ user.email }}</p>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="p-3 rounded-4 border border-secondary h-100">
              <p class="text-secondary small mb-1">Account status</p>
              <p class="fw-semibold text-warning mb-0">Active customer</p>
            </div>
          </div>

          <div class="col-12">
            <div class="p-3 rounded-4 border border-secondary">
              <p class="text-secondary small mb-1">User ID</p>
              <p class="small mb-0 text-break">{{ user.uid }}</p>
            </div>
          </div>
        </div>

        <div v-else class="alert alert-warning mt-3">
          You are not logged in.
        </div>

        <hr class="border-secondary my-4">

        <div class="mb-4">
          <div class="d-flex justify-content-between align-items-center gap-3 mb-3">
            <div>
              <h2 class="h5 mb-1">Recent Orders</h2>
              <p class="text-secondary small mb-0">
                A quick look at your latest purchases.
              </p>
            </div>

            <router-link to="/orders" class="btn btn-outline-warning btn-sm">
              View All
            </router-link>
          </div>

          <div v-if="ordersMessage" class="alert alert-warning">
            {{ ordersMessage }}
          </div>

          <div v-else-if="recentOrders.length === 0" class="p-3 rounded-4 border border-secondary text-secondary">
            No recent orders yet. When you place an order, it will show here.
          </div>

          <div v-else class="vstack gap-3">
            <div
                v-for="order in recentOrders"
                :key="order.id"
                class="p-3 rounded-4 border border-secondary"
            >
              <div class="d-flex justify-content-between gap-3 mb-2">
                <div>
                  <p class="fw-semibold mb-1">Order</p>
                  <p class="text-secondary small mb-0">
                    {{ formatDate(order.createdAt) }}
                  </p>
                </div>

                <p class="fw-bold text-warning mb-0">
                  ${{ order.total.toFixed(2) }}
                </p>
              </div>

              <div class="text-secondary small">
                {{ order.items.length }} item<span v-if="order.items.length !== 1">s</span>
              </div>
            </div>
          </div>
        </div>

        <hr class="border-secondary my-4">

        <div class="d-flex flex-column flex-sm-row gap-2">
          <router-link to="/wishlist" class="btn btn-warning">
            View Wishlist
          </router-link>

          <router-link to="/orders" class="btn btn-outline-light">
            View Order History
          </router-link>

          <router-link to="/" class="btn btn-outline-light">
            Continue Shopping
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { watchAuth, logoutUser} from "../services/auth.js";
import { getOrders} from "../services/orders.js";

export default {
  name: 'ProfileView',

  data() {
    return {
      user: null,
      stopAuthWatcher: null,
      recentOrders: [],
      ordersMessage: '',
    }
  },

  mounted() {
    this.stopAuthWatcher = watchAuth( async user => {
      this.user = user

      if (user) {
        await this.loadRecentOrders()
      }
    })
  },

  beforeUnmount() {
    if (this.stopAuthWatcher) {
      this.stopAuthWatcher()
    }
  },

  methods: {
    async loadRecentOrders() {
      try {
        const orders = await getOrders()
        this.recentOrders = orders.slice(0, 2)
      } catch (error) {
        this.ordersMessage = error.message
      }
    },

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

    async handleLogout() {
      await logoutUser()
      this.user = null
      this.$router.push('/login')
    }
  }
}
</script>