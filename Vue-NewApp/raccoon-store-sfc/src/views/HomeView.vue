<template>
  <div class="app-bg">

    <HeaderBar
        :cart-count="cartCount"
        :search-query="searchQuery"
        :user="user"
        @update-search-query="updateSearchQuery"
        @open-cart="handleOpenCart"
        @open-checkout="handleOpenCheckout"
        @logout="handleLogout"
    />
    <main class="container py-4" style="max-width: 1100px;">
      <section class="app-hero p-5 p-md-6 rounded-4 mb-4">
        <div class="row align-items-center g-4">
          <div class="col-12 col-md-8">
            <span class="badge bg-warning text-dark mb-3 px-3 py-2 fs-6 fw-semibold">Built for gamers, to be better gamers</span>
            <h1 class="display-6 fw-bold mb-2">Raccoon Store</h1>
            <p class="text-secondary mb-3">
              Shop gaming accessories with the best mix of comfort, sound, and personality. From headsets to keyboards.
            </p>
          </div>

          <div class="col-12 col-md-4 text-center">
            <img src="../assets/img/Raccoon.png" alt="Raccoon mascot" class="app-hero-mascot img-fluid">
          </div>
        </div>
      </section>

      <section class="app-toolbar p-3 p-md-4 rounded-4 mb-4">
        <div class="d-flex flex-column flex-lg-row gap-3 align-items-lg-center justify-content-between">

          <div class="d-flex flex-column flex-sm-row gap-2 flex-wrap">

            <select v-model="selectedCategory" class="form-select app-select app-select-wide" aria-label="Category">
              <option value="all">Category: All</option>
              <option value="Headsets">Headsets</option>
              <option value="Mouses">Mouses</option>
              <option value="Keyboards">Keyboards</option>
            </select>

            <select v-model="selectedSort" class="form-select app-select app-select-wide" aria-label="Sort">
              <option value="priceLow">Sort: Price Low → High</option>
              <option value="priceHigh">Price High → Low</option>
              <option value="ratingHigh">Rating High → Low</option>
            </select>
          </div>

          <div class="d-flex flex-wrap gap-2 align-items-center">
            <span class="text-secondary small me-1">Shop by:</span>

            <button
                type="button"
                class="badge border-0"
                :class="selectedFeature === 'Great Sound' ? 'bg-warning text-dark' : 'app-chip'"
                @click="toggleFeature('Great Sound')"
            >
              Great Sound
            </button>

            <button
                type="button"
                class="badge border-0"
                :class="selectedFeature === 'Great Mic' ? 'bg-warning text-dark' : 'app-chip'"
                @click="toggleFeature('Great Mic')"
            >
              Great Mic
            </button>

            <button
                type="button"
                class="badge border-0"
                :class="selectedFeature === 'Comfort' ? 'bg-warning text-dark' : 'app-chip'"
                @click="toggleFeature('Comfort')"
            >
              Comfort
            </button>

            <button
                type="button"
                class="badge border-0"
                :class="selectedFeature === 'Wireless' ? 'bg-warning text-dark' : 'app-chip'"
                @click="toggleFeature('Wireless')"
            >
              Wireless
            </button>
          </div>

        </div>
      </section>

      <div
          v-if="toastMessage"
          class="alert mb-4"
          :class="toastType === 'success' ? 'alert-success' : 'alert-warning'"
          role="alert"
      >
        {{ toastMessage }}
      </div>


      <ProductGrid
          :products="filteredProducts"
          @view-details="handleDetails"
          @add-to-cart="handleAddToCart"
          @add-to-wishlist="handleAddToWishlist"
      />
    </main>


    <ProductDetailsModal
        :product="selectedProduct"
        :is-open="showDetails"
        @close="closeDetails"
        @add-to-cart="handleAddToCart"
    />

    <CartDrawer
        :is-open="showCart"
        :cart="cart.items"
        :discount-code="discountCode"
        :discount-message="discountMessage"
        :discount-ok="discountOk"
        :discount-percent="discountPercent"
        :free-shipping-threshold="freeShippingThreshold"
        @close="closeCart"
        @remove-item="removeFromCart"
        @increase-qty="increaseQty"
        @decrease-qty="decreaseQty"
        @update-discount-code="updateDiscountCode"
        @apply-discount="applyDiscount"
        @open-checkout="handleOpenCheckout"
    />

    <CheckoutModal
        :is-open="showCheckout"
        :checkout="checkout"
        :checkout-error="checkoutError"
        :cart="cart.items"
        :discount-percent="discountPercent"
        :free-shipping-threshold="freeShippingThreshold"
        @close="closeCheckout"
        @place-order="placeOrder"
    />

    <OrderConfirmationModal
        :is-open="showOrderConfirmation"
        :total="lastOrderTotal"
        :items="lastOrderItems"
        @close="showOrderConfirmation = false"
        @leave-review="showOrderConfirmation = false"
    />

  </div>
</template>

<script>
import ProductGrid from '../components/ProductGrid.vue'
import { products } from '../data/products'
import HeaderBar from "../components/HeaderBar.vue"
import ProductDetailsModal from "../components/ProductDetailsModal.vue"
import CartDrawer from "../components/CartDrawer.vue";
import OrderConfirmationModal from "../components/OrderConfirmationModal.vue";
import CheckoutModal from "../components/CheckoutModal.vue";
import Cart from "../models/Cart.js";
import { addWishlistItem} from "../services/wishlist.js";
import { saveOrder} from "../services/orders.js";
import { watchAuth, logoutUser} from "../services/auth.js";


export default {
  name: 'HomeView',
  components: {
    ProductGrid,
    HeaderBar,
    ProductDetailsModal,
    CartDrawer,
    CheckoutModal,
    OrderConfirmationModal,
  },

  data() {
    return {
      products,
      cart: new Cart(),
      searchQuery: '',
      selectedCategory: 'all',
      selectedSort: 'priceLow',
      selectedFeature: '',
      showDetails: false,
      selectedProduct: null,
      showCart: false,
      freeShippingThreshold: 200,
      showCheckout: false,

      discountCode: '',
      discountPercent: 0,
      discountMessage: '',
      discountOk: false,

      checkout: {
        name: '',
        email: '',
        address: ''
      },
      checkoutError: '',

      showOrderConfirmation: false,
      lastOrderTotal: 0,
      lastOrderItems: [],

      user: null,
      stopAuthWatcher: null,
      toastMessage: '',
      toastType: 'success',
    }
  },

  mounted() {
    this.stopAuthWatcher = watchAuth(user => {
      this.user = user
    })
  },

  beforeUnmount() {
    if (this.stopAuthWatcher) {
      this.stopAuthWatcher()
    }
  },

  methods: {
    handleDetails(product) {
      this.selectedProduct = product
      this.showDetails = true
    },

    closeDetails() {
      this.showDetails = false
    },

    handleAddToCart(product, qty = 1) {
      this.cart.addProduct(product, qty)
    },

    handleOpenCart() {
      this.showCart = true
    },

    handleOpenCheckout() {
      this.showCheckout = true
      this.showCart = false
    },

    closeCart() {
      this.showCart = false
    },

    removeFromCart(id) {
      this.cart.removeProduct(id)
    },

    increaseQty(id) {
      this.cart.increaseQty(id)
    },

    decreaseQty(id) {
      this.cart.decreaseQty(id)
    },

    updateDiscountCode(value) {
      this.discountCode = value
    },

    applyDiscount() {
      const result = this.cart.applyDiscountCode(this.discountCode)
      this.discountPercent = this.cart.discountPercent
      this.discountMessage = result.message
      this.discountOk = result.ok
    },

    closeCheckout() {
      this.showCheckout = false
    },

     async placeOrder() {
      this.checkoutError = ''

      if (this.cart.items.length === 0) {
        this.checkoutError = 'Your cart is empty'
        return
      }

      if (!this.checkout.name || !this.checkout.email || !this.checkout.address) {
        this.checkoutError = 'Please enter your name, email and address'
        return
      }

      this.lastOrderItems = this.cart.items.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        qty: item.qty,
        price: item.price,
        lineTotal: item.lineTotal
      }))

      this.lastOrderTotal = this.cart.total(this.freeShippingThreshold)
      this.showOrderConfirmation = true

      await saveOrder({
        items: this.lastOrderItems,
        total: this.lastOrderTotal,
        customer: {
          name: this.checkout.name,
          email: this.checkout.email,
          address: this.checkout.address,
        }
      })

      this.cart.clear()
      this.discountCode = ''
      this.discountPercent = 0
      this.discountMessage = ''
      this.discountOk = false

      this.showCheckout = false
      this.checkout = {
        name: '',
        email: '',
        address: ''
      }
    },

    updateSearchQuery(value) {
      this.searchQuery = value
    },

    showToast(message, type = 'success') {
      this.toastMessage = message
      this.toastType = type

      setTimeout(() => {
        this.toastMessage = ''
      }, 3000);
    },

    async handleAddToWishlist(product) {
      try {
        await addWishlistItem(product)

        this.showToast(`${product.name} was added to your wishlist.`, 'success')
      } catch (error) {
        this.showToast(error.message, 'warning')
      }
    },

    async handleLogout() {
      await logoutUser()
      this.user = null
      this.$router.push('/login')
    },

    toggleFeature(feature) {
      if (this.selectedFeature === feature) {
        this.selectedFeature = ''
      } else {
        this.selectedFeature = feature
      }
    },

  },


  computed: {
    cartCount() {
      return this.cart.count
    },

    filteredProducts() {
      const query = this.searchQuery.trim().toLowerCase()

      let result = this.products.filter(product => {
        const matchesSearch =
            !query ||
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.features.some(feature =>
                feature.toLowerCase().includes(query)
            )

        const matchesCategory =
            this.selectedCategory === 'all' ||
            product.category === this.selectedCategory

        const matchesFeature =
            !this.selectedFeature ||
            product.features.includes(this.selectedFeature)

        return matchesSearch && matchesCategory && matchesFeature
      })

      if (this.selectedSort === 'priceLow') {
        result = [...result].sort((a, b) => a.price - b.price)
      }

      if (this.selectedSort === 'priceHigh') {
        result = [...result].sort((a, b) => b.price - a.price)
      }

      if (this.selectedSort === 'ratingHigh') {
        result = [...result].sort((a, b) => b.rating - a.rating)
      }

      return result
    }
  }}
</script>