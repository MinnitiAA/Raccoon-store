<template>
<div class="app-summary p-3 rounded-3 mt-4">
<div class="d-flex justify-content-between">
  <span class="text-secondary">Subtotal</span>
  <span>{{ formatMoney(subtotal) }}</span>
</div>

<div class="d-flex justify-content-between">
  <span class="text-secondary">Tax</span>
  <span>{{ formatMoney(tax) }}</span>
</div>

<div class="d-flex justify-content-between">
  <span class="text-secondary">Shipping</span>
  <span>{{ formatMoney(shipping) }}</span>
</div>

<div class="d-flex justify-content-between fw-bold border-top pt-2 mt-2">
  <span>Total</span>
  <span>{{ formatMoney(total) }}</span>
</div>
</div>
</template>

<script>
export default {
  name: 'CartSummary',

  props: {
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    shipping: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },

  methods: {
    formatMoney(n) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(n)
    }
  }
}
</script>