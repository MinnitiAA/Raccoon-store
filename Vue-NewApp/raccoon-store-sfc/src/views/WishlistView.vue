<template>
  <main class="container py-5" style="max-width: 1100px;">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div>
        <span class="badge bg-warning text-dark mb-2">Saved Gear</span>
        <h1 class="mb-1">Wishlist</h1>
        <p class="text-secondary mb-0">
          Keep track of the gaming accessories you want to buy later.
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
        v-if="wishlist.length === 0 && !message"
        class="app-surface p-5 rounded-4 text-center"
    >
      <div class="display-5 mb-3">🦝</div>

      <h2 class="h4 mb-2">Your wishlist is empty</h2>

      <p class="text-secondary mb-4">
        Save your favorite headsets, keyboards, and mice so you can come back to them later.
      </p>

      <router-link to="/" class="btn btn-warning text-dark">
        Browse Products
      </router-link>
    </section>

    <section v-else class="row g-4">
      <div
          v-for="item in wishlist"
          :key="item.id"
          class="col-12 col-md-6 col-lg-4"
      >
        <div class="app-surface p-3 rounded-4 h-100 d-flex flex-column">
          <img
              :src="item.image"
              :alt="item.name"
              class="img-fluid rounded-3 mb-3 wishlist-img"
          >

          <div class="d-flex flex-column flex-grow-1">
            <h5>{{ item.name }}</h5>

            <p class="text-secondary flex-grow-1">
              {{ item.description }}
            </p>

            <div class="fw-bold text-warning mb-3">
              {{ formatMoney(item.price) }}
            </div>

            <button
                class="btn btn-outline-light w-100"
                @click="removeItem(item.id)"
            >
              Remove from Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { getWishlistItems, removeWishlistItem } from '../services/wishlist'

export default {
  name: 'WishlistView',

  data() {
    return {
      wishlist: [],
      message: ''
    }
  },

  async mounted() {
    try {
      this.wishlist = await getWishlistItems()
    } catch (error) {
      this.message = error.message
    }
  },

  methods: {
    async removeItem(id) {
      try {
        await removeWishlistItem(id)
        this.wishlist = this.wishlist.filter(item => item.id !== id)
      } catch (error) {
        this.message = error.message
      }
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
.wishlist-img {
  width: 100%;
  height: 190px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.04);
}
</style>