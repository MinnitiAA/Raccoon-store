<template>
  <header class="border-bottom sticky-top app-header">
    <nav class="container py-3">
      <div class="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-3">

        <div class="d-flex align-items-center justify-content-between gap-3">
          <router-link to="/" class="d-flex align-items-center gap-2 text-decoration-none text-light">
            <img :src="logo" alt="Store Logo" width="36" height="36" class="rounded-circle">
            <span class="fw-bold fs-5">Raccoon Store</span>
          </router-link>

          <button
              type="button"
              class="btn btn-outline-light position-relative d-lg-none"
              @click="$emit('open-cart')"
              aria-label="Open Cart"
          >
            🛒
            <span
                v-if="cartCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
            >
              {{ cartCount }}
            </span>
          </button>
        </div>

        <form class="flex-grow-1" role="search" @submit.prevent>
          <input
              class="form-control app-search"
              type="search"
              placeholder="Search Products"
              aria-label="Search"
              :value="searchQuery"
              @input="$emit('update-search-query', $event.target.value)"
          >
        </form>

        <div class="d-flex flex-wrap align-items-center gap-2 justify-content-center justify-content-lg-end">
          <router-link to="/wishlist" class="btn btn-outline-light btn-sm">
            Wishlist
          </router-link>

          <router-link to="/orders" class="btn btn-outline-light btn-sm">
            Orders
          </router-link>

          <router-link to="/profile" class="btn btn-outline-light btn-sm">
            Profile
          </router-link>

          <span v-if="user" class="text-light small app-user-email">
            Logged In
          </span>

          <button
              v-if="user"
              type="button"
              class="btn btn-outline-warning btn-sm"
              @click="$emit('logout')"
          >
            Logout
          </button>

          <router-link
              v-else
              to="/login"
              class="btn btn-outline-light btn-sm"
          >
            Login
          </router-link>

          <button
              type="button"
              class="btn btn-outline-light btn-sm position-relative d-none d-lg-inline-block"
              @click="$emit('open-cart')"
              aria-label="Open Cart"
          >
            🛒
            <span
                v-if="cartCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
            >
              {{ cartCount }}
            </span>
          </button>

          <button
              type="button"
              class="btn btn-outline-light btn-sm"
              @click="$emit('open-checkout')"
          >
            Checkout
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import logo from '../assets/img/Raccoon.png'
export default {
  name: 'HeaderBar',
  props: {
    cartCount: {
      type: Number,
      default: 0
    },

    searchQuery: {
      type: String,
      default: ''
    },

    user: {
      type: Object,
      default: null
    }
  },
  emits: ['open-cart', 'open-checkout', 'update-search-query', 'logout'],
    data() {
    return {
      logo
    }
    }
}
</script>

<style scoped lang="scss">
.app-login-badge {
  background: rgba(230, 91, 43, 0.18);
  color: #ffb08a;
  border: 1px solid rgba(255, 138, 76, 0.45);
  padding: 0.55rem 0.8rem;
}

@media (max-width: 576px) {
  .app-login-badge {
    width: 100%;
    text-align: center;
  }

  .btn {
    flex: 1 1 auto;
  }
}
</style>
