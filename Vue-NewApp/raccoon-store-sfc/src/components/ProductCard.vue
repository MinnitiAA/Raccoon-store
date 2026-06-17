<template>
<div class="card app-card h-100">
  <img
      :src="product.image"
      class="card-img-top product-img"
      :alt="product.name"
  />

<div class="card-body d-flex flex-column">
  <h5 class="card-title mb-1">{{ product.name }}</h5>

  <div class="text-warning small mb-2">
    {{ '★'.repeat(product.rating)}} {{ '☆'.repeat(5 - product.rating) }}
    <span class="text-secondary">({{ product.reviews }} reviews)</span>
  </div>

  <p class="text-secondary mb-3">
    {{ formatMoney(product.price) }}
  </p>

  <div class="mt-auto">
    <div class="d-flex flex-column flex-sm-row gap-2">
      <button
          type="button"
          class="btn btn-outline-light flex-fill"
          @click="$emit('view-details', product)"
      >
        Details
      </button>

      <button
          type="button"
          class="btn btn-warning text-dark flex-fill"
          @click="$emit('add-to-cart', product)"
      >
        Add to Cart
      </button>
    </div>

    <button
        type="button"
        class="btn btn-outline-warning w-100 mt-2"
        @click="$emit('add-to-wishlist', product)"
    >
      ♡ Save to Wishlist
    </button>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'ProductCard',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  emits: ['view-details', 'add-to-cart', 'add-to-wishlist'],

  methods: {
    formatMoney(n) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(n);
    }
  }
}
</script>