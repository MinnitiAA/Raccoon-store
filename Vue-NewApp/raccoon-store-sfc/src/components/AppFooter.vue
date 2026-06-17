<template>
  <footer class="app-footer border-top py-4">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
      <div class="d-flex align-items-center gap-3 text-center text-md-start">
        <img
            :src="logo"
            alt="Raccoon Store logo"
            class="footer-logo"
        >

        <div>
          <p class="fw-bold mb-1">Raccoon Store</p>
          <p class="text-secondary small mb-0">
            Gaming accessories built for comfort, performance, and personality.
          </p>
        </div>
      </div>

      <div class="d-flex flex-wrap justify-content-center gap-3 small">
        <router-link to="/" class="text-secondary text-decoration-none">
          Home
        </router-link>

        <router-link to="/wishlist" class="text-secondary text-decoration-none">
          Wishlist
        </router-link>

        <router-link to="/orders" class="text-secondary text-decoration-none">
          Orders
        </router-link>

        <router-link to="/profile" class="text-secondary text-decoration-none">
          Profile
        </router-link>
      </div>

      <p class="text-secondary small mb-0">
        © 2026 Raccoon Store
      </p>
    </div>
  </footer>
</template>

<script>
import logo from '../assets/img/Raccoon.png'

export default {
  name: 'AppFooter',

  data() {
    return {
      logo
    }
  }
}
</script>

<style scoped lang="scss">
.app-footer {
  margin-top: auto;
  background: rgba(11, 16, 32, 0.96);
  color: #fff7ed;
  border-color: rgba(230, 91, 43, 0.22) !important;

  a {
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: #ff8a4c !important;
      transform: translateY(-1px);
    }
  }
}

.footer-logo {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  object-fit: cover;
  background: #fff7ed;
  padding: 3px;
}
</style>