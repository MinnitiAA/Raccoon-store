<template>
  <div
      v-if="isOpen && product"
      class="modal-overlay"
      aria-label="Product details"
      @click.self="$emit('close')"
  >
    <div class="modal-panel modal-wide product-details-modal">
      <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
        <div>
          <span class="badge bg-warning text-dark mb-2">
            {{ product.category }}
          </span>

          <h3 class="mb-1">
            {{ product.name }}
          </h3>

          <div class="d-flex flex-wrap align-items-center gap-2">
            <span class="fw-bold text-warning fs-5">
              {{ formatMoney(product.price) }}
            </span>

            <span class="text-secondary small">
              {{ product.rating }}/5 rating · {{ product.reviews }} reviews
            </span>
          </div>
        </div>

        <button
            type="button"
            class="btn btn-sm btn-outline-light"
            @click="$emit('close')"
            aria-label="Close details"
        >
          ✕
        </button>
      </div>

      <div class="row g-4 align-items-center">
        <div class="col-12 col-md-5">
          <div class="product-details-image-wrap">
            <img
                :src="product.image"
                :alt="product.name"
                class="img-fluid product-details-image"
            >
          </div>
        </div>

        <div class="col-12 col-md-7">
          <p class="text-secondary mb-4">
            {{ product.description }}
          </p>

          <div class="mb-4">
            <div class="fw-semibold mb-2">Best for</div>

            <div class="d-flex flex-wrap gap-2">
              <span
                  v-for="feature in product.features"
                  :key="feature"
                  class="badge rounded-pill bg-warning text-dark"
              >
                {{ feature }}
              </span>
            </div>
          </div>

          <div class="quantity-box p-3 rounded-4 mb-4">
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
              <div>
                <div class="fw-semibold">Quantity</div>
                <div class="text-secondary small">
                  Choose how many you want to add to your cart.
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-center gap-2">
                <button
                    type="button"
                    class="btn btn-outline-light qty-btn"
                    @click="decreaseQty"
                >
                  -
                </button>

                <span class="qty-number">
                  {{ qty }}
                </span>

                <button
                    type="button"
                    class="btn btn-outline-light qty-btn"
                    @click="increaseQty"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column flex-sm-row gap-2">
            <button
                type="button"
                class="btn btn-warning text-dark fw-semibold flex-fill"
                @click="addItem"
            >
              Add {{ qty }} to Cart
            </button>

            <button
                type="button"
                class="btn btn-outline-light flex-fill"
                @click="$emit('close')"
            >
              Keep Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailsModal',

  props: {
    product: {
      type: Object,
      default: null
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'add-to-cart'],

  data() {
    return {
      qty: 1
    };
  },

  watch: {
    product() {
      this.qty = 1;
    },
    isOpen(newVal) {
      if (newVal) {
        this.qty = 1;
      }
    }
  },

  methods: {
    formatMoney(n) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(n);
    },

    increaseQty() {
      this.qty++;
    },

    decreaseQty() {
      if (this.qty > 1) {
        this.qty--;
      }
    },

    addItem() {
      this.$emit('add-to-cart', this.product, this.qty);
      this.$emit('close');
    }
  }
}
</script>

<style scoped lang="scss">
.product-details-modal {
  max-width: 900px;
}

.product-details-image-wrap {
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.04);
}

.product-details-image {
  max-height: 290px;
  width: 100%;
  object-fit: contain;
}

.quantity-box {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.qty-btn {
  width: 42px;
  height: 42px;
}

.qty-number {
  min-width: 42px;
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
}

@media (max-width: 575.98px) {
  .product-details-image-wrap {
    min-height: 220px;
  }

  .product-details-image {
    max-height: 210px;
  }
}
</style>