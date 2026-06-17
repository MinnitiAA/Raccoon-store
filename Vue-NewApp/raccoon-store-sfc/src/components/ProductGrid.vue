<template>
<section class='row g-4 align-items-stretch'>
<div class="col-12 col-md-6 col-lg-3" v-for="product in products" :key="product.id">

  <ProductCard
      :product="product"
      @view-details="$emit('view-details', $event)"
      @add-to-cart="$emit('add-to-cart', $event)"
      @addToWishlist="$emit('add-to-wishlist', $event)"
  />

</div>
</section>
</template>

<script>
import ProductCard from "./ProductCard.vue";
export default {
  name: 'ProductGrid',
  components: { ProductCard },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  emits: ['view-details', 'add-to-cart', 'add-to-wishlist'],
}
</script>
