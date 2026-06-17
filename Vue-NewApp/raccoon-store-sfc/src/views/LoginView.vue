<template>
  <main class="login-page">
    <section class="container py-5">
      <div class="row justify-content-center align-items-center min-vh-login">
        <div class="col-12 col-lg-10">
          <div class="login-card row g-0 overflow-hidden rounded-4 shadow-lg">

            <div class="col-12 col-lg-6 login-hero p-4 p-md-5 d-flex flex-column justify-content-between">
              <div>
                <span class="badge bg-warning text-dark mb-3">
                  Raccoon Store
                </span>

                <h1 class="display-6 fw-bold mb-3">
                  Welcome back, gamer.
                </h1>

                <p class="text-secondary mb-4">
                  Log in to save wishlist items, view your order history, and keep your setup ready for the next match.
                </p>
              </div>

              <div class="login-benefits vstack gap-3">
                <div class="d-flex gap-3 align-items-center">
                  <span class="benefit-icon">🦝</span>
                  <span>Personal wishlist saved to your account</span>
                </div>

                <div class="d-flex gap-3 align-items-center">
                  <span class="benefit-icon">🛒</span>
                  <span>Order history for your gaming accessories</span>
                </div>

                <div class="d-flex gap-3 align-items-center">
                  <span class="benefit-icon">⚡</span>
                  <span>Fast checkout experience</span>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6 p-4 p-md-5 bg-dark text-light">
              <h2 class="h3 mb-2">Login</h2>

              <p class="text-secondary mb-4">
                Enter your account information to continue.
              </p>

              <form class="vstack gap-3" @submit.prevent="handleLogin">
                <div>
                  <label for="email" class="form-label">Email</label>
                  <input
                      id="email"
                      v-model="email"
                      type="email"
                      class="form-control"
                      placeholder="you@example.com"
                      autocomplete="email"
                  >
                </div>

                <div>
                  <label for="password" class="form-label">Password</label>
                  <input
                      id="password"
                      v-model="password"
                      type="password"
                      class="form-control"
                      placeholder="Enter your password"
                      autocomplete="current-password"
                  >
                </div>

                <button type="submit" class="btn btn-warning text-dark fw-semibold">
                  Login
                </button>

                <button type="button" class="btn btn-outline-light" @click="handleRegister">
                  Create Account
                </button>

                <div
                    v-if="message"
                    class="alert mb-0"
                    :class="messageType === 'success' ? 'alert-success' : 'alert-warning'"
                >
                  {{ message }}
                </div>
              </form>


            </div>

          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { loginUser, registerUser } from "../services/auth";

export default {
  name: 'LoginView',

  data() {
    return {
      email: '',
      password: '',
      message: '',
      messageType: 'warning'
    }
  },

  methods: {
    async handleLogin() {
      try {
        await loginUser(this.email, this.password)

        this.message = 'Login successful!'
        this.messageType = 'success'

        const redirectPath = this.$route.query.redirect || '/'
        this.$router.push(redirectPath)
      } catch (error) {
        this.message = this.getFriendlyError(error)
        this.messageType = 'warning'
      }
    },

    async handleRegister() {
      try {
        await registerUser(this.email, this.password)

        this.message = 'Registration successful!'
        this.messageType = 'success'

        const redirectPath = this.$route.query.redirect || '/'
        this.$router.push(redirectPath)
      } catch (error) {
        this.message = this.getFriendlyError(error)
        this.messageType = 'warning'
      }
    },

    getFriendlyError(error) {
      if (error.code === 'auth/invalid-email') {
        return 'Please enter a valid email address.'
      }

      if (error.code === 'auth/missing-password') {
        return 'Please enter your password.'
      }

      if (error.code === 'auth/weak-password') {
        return 'Password should be at least 6 characters.'
      }

      if (error.code === 'auth/email-already-in-use') {
        return 'This email already has an account. Try logging in instead.'
      }

      if (error.code === 'auth/invalid-credential') {
        return 'Email or password is incorrect.'
      }

      return error.message
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
  min-height: 100%;
  background:
      radial-gradient(circle at top left, rgba(255, 193, 7, 0.16), transparent 34%),
      radial-gradient(circle at bottom right, rgba(89, 111, 255, 0.16), transparent 36%);
}

.min-vh-login {
  min-height: calc(100vh - 180px);
}

.login-card {
  background: rgba(10, 16, 35, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.login-hero {
  background:
      linear-gradient(135deg, rgba(8, 12, 28, 0.96), rgba(28, 36, 72, 0.92)),
      url('../assets/img/Raccoon.png');
  background-repeat: no-repeat;
  background-position: right 1.5rem bottom 1.5rem;
  background-size: 180px;
  color: #fff;
}

.benefit-icon {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(255, 193, 7, 0.16);
}

@media (max-width: 991.98px) {
  .login-hero {
    background-size: 120px;
  }
}
</style>