<template>
<div v-if="isOpen" class="drawer-overlay" @click.self="$emit('close')">
<aside class="cart-drawer app-surface p-3 p-md-4">
  <div class="d-flex justify-content-between align-items-start">
    <div>
      <h3 class="mb-1">Your Cart</h3>
      <div class="text-secondary">{{ freeShippingMessage }}</div>
    </div>

    <button
        type="button"
        class="btn btn-sm btn-outline-light"
        @click.stop="$emit('close')"
        aria-label="Close cart"
    >
      ✕
    </button>
  </div>

  <div class="vstack gap-3 mt-3">
    <div v-if="cart.length === 0" class="text-secondary">
      Your cart is empty.
    </div>

    <div v-else
         v-for="item in cart"
         :key="item.id"
         class="d-flex gap-3 align-items-start">
      <img :src="item.image" :alt="item.name" class="app-cart-img">

      <div class="flex-grow-1">
        <div class="d-flex justify-content-between">
          <div class="fw-semibold">{{ item.name }}</div>

          <button
              type="button"
              class="btn btn-link text-decoration-none text-secondary p-0 border-0"
              @click.stop="$emit('remove-item', item.id)"
          >
            Remove
          </button>
        </div>

        <div class="text-secondary small">
          {{ item.features.join(' • ') }}
        </div>

        <div class="mt-1">{{ formatMoney(item.price) }}</div>

        <div class="d-flex align-items-center gap-2 mt-2">
          <button class="btn btn-sm btn-outline-light"
                  @click="$emit('decrease-qty', item.id)">
            -
          </button>

          <span class="px-2">{{ item.qty }}</span>

          <button class="btn btn-sm btn-outline-light"
                  @click="$emit('increase-qty', item.id)">
            +
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-4">
    <label class="form-label text-secondary">Discount Code</label>
    <div class="d-flex gap-2">
      <input class="form-control app-input"
             :value="discountCode"
             @input="$emit('update-discount-code', $event.target.value)"
             placeholder="Enter code">
      <button class="btn btn-outline-light"
              @click="$emit('apply-discount')">
        Apply
      </button>
    </div>

    <div v-if="discountMessage"
         class="small mt-2"
         :class="discountOk ? 'text-warning' : 'text-secondary'">
      {{ discountMessage }}
    </div>
  </div>

  <cart-summary
      :subtotal="subtotal"
      :tax="tax"
      :shipping="shipping"
      :total="total" >
  </cart-summary>

  <div class="d-grid gap-2 mt-3">
    <button
        type="button"
        class="btn btn-warning text-dark"
        @click.stop="$emit('open-checkout')"
    >
      Checkout
    </button>

    <a class="btn btn-outline-light"
       href="#"
       @click.prevent="$emit('close')">
      Continue Shopping
    </a>
  </div>
</aside>
</div>
</template>

<script>
import CartSummary from './CartSummary.vue';

export default {
  name: 'CartDrawer',

  components: {
    CartSummary
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true
    },
    discountCode: {
      type: String,
      required: true
    },
    discountMessage: {
      type: String,
      required: true
    },
    discountOk: {
      type: Boolean,
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

  emits: ['close', 'remove-item', 'increase-qty', 'decrease-qty',
    'update-discount-code', 'apply-discount', 'open-checkout'],

  methods: {
    formatMoney(n) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(n);
    },

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
    },

    freeShippingMessage() {
      if (this.cart.length === 0) return 'Add something to start your cart 🦝';
      const remaining = this.freeShippingThreshold - this.subtotal;
      if (remaining <= 0) return 'Free shipping unlocked! 🎉';
      return `You're ${this.formatMoney(remaining)} away from Free Shipping - add a mousepad?`;
    }
  }
}

</script>