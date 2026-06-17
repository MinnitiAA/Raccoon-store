<template>
<div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
<div class="modal-panel modal-wide">

  <div class="d-flex justify-content-between align-items-start">
    <div>
      <h3 class="mb-1">Checkout</h3>
      <div class="text-secondary">Complete your shipping.</div>
    </div>

    <a class="btn btn-sm btn-outline-light"
       href="#"
       @click.prevent="$emit('close')">
      ✕
    </a>
  </div>

  <div class="row g-4 mt-2">

    <!-- LEFT -->
    <div class="col-12 col-lg-7">
      <div class="app-surface p-3 p-md-4 rounded-3">

        <h5 class="mb-3">Shipping Info</h5>

        <div v-if="checkoutError" class="alert alert-warning">
          {{ checkoutError }}
        </div>

        <input class="form-control app-input mb-2"
               placeholder="Full Name"
               v-model="checkout.name">

        <input class="form-control app-input mb-2"
               placeholder="Email"
               v-model="checkout.email">

        <input class="form-control app-input mb-2"
               placeholder="Address"
               v-model="checkout.address">

        <button class="btn btn-warning w-100 mt-3"
                @click="$emit('place-order')">
          Place Order
        </button>

      </div>
    </div>

    <!-- RIGHT -->
    <div class="col-12 col-lg-5">
      <div class="app-surface p-3 rounded-3">

        <h5 class="mb-3">Order Summary</h5>

        <div v-if="cart.length === 0" class="text-secondary">
          Your cart is empty
        </div>

        <div v-else>
          <div v-for="item in cart" :key="item.id">
            {{ item.name }} x{{ item.qty }}
          </div>
        </div>

        <cart-summary
            :subtotal="subtotal"
            :tax="tax"
            :shipping="shipping"
            :total="total" >
        </cart-summary>

      </div>
    </div>

  </div>
</div>
</div>
</template>

<script>
import CartSummary from './CartSummary.vue'
export default {
  name: 'CheckoutModal',

  components: {
    CartSummary
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    checkout: {
      type: Object,
      required: true
    },
    checkoutError: {
      type: String,
      required: true
    },
    cart: {
      type: Array,
      required: true
    },
    discountPercent: {
      type: Number,
      required: true
    },
    freeShippingThreshold: {
      type: Number,
      required: true
    }
  },

  emits: ['close', 'place-order'],

  methods: {
    formatMoney(n) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(n);
    }
  },

  computed: {
    rawSubtotal() {
      return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    },

    subtotal() {
      return this.rawSubtotal * (1 - this.discountPercent);
    },

    tax() {
      return this.subtotal * 0.07;
    },

    shipping() {
      if (this.cart.length === 0) return 0;
      if (this.subtotal >= this.freeShippingThreshold) return 0;
      return 8.99;
    },

    total() {
      return this.subtotal + this.tax + this.shipping;
    }
  }
}

</script>