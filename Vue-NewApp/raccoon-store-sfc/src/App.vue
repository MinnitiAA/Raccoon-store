<template>
  <div class="app-shell">
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <AppFooter />
  </div>
</template>

<script>
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',

  components: {
    AppFooter
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  min-height: 100%;
  background: #0b1020;
}

body {
  margin: 0;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
      radial-gradient(circle at top left, rgba(230, 91, 43, 0.16), transparent 32%),
      linear-gradient(180deg, #111827 0%, #0f172a 50%, #0b1020 100%);
  color: #fff7ed;
}

.app-shell > main,
.app-shell > .app-bg {
  flex: 1;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>