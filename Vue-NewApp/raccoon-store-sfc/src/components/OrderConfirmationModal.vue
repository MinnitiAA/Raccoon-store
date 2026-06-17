<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-panel modal-wide confirmation-modal position-relative overflow-hidden">

      <div class="confetti" aria-hidden="true">
        <span v-for="n in 18" :key="n" class="confetti-piece"></span>
      </div>

      <div class="d-flex justify-content-between align-items-start mb-3 position-relative">
        <h3 class="mb-0">Order Confirmed!</h3>

        <button
            type="button"
            class="btn btn-sm btn-outline-light"
            @click="$emit('close')"
        >
          ✕
        </button>
      </div>

      <div class="d-flex align-items-center gap-3 mb-4 position-relative">
        <img
            src="/src/assets/img/Raccoon.png"
            alt="Mascot"
            class="confirmation-mascot"
        >

        <div>
          <div class="fw-semibold fs-5">Thank you for your purchase!</div>
          <div class="text-secondary small">Order Number: #{{ orderNumber }}</div>
          <div class="text-secondary small">
            Your order is being prepared. Want to continue shopping or leave a review later?
          </div>
        </div>
      </div>

      <div class="app-surface p-3 rounded-3 mb-3 position-relative">
        <h5 class="mb-3">What you bought</h5>

        <div v-if="items.length === 0" class="text-secondary">
          No products found.
        </div>

        <div
            v-for="item in items"
            :key="item.id"
            class="d-flex align-items-center gap-3 py-2 border-bottom border-secondary-subtle"
        >
          <img :src="item.image" :alt="item.name" class="confirmation-item-img">

          <div class="flex-grow-1">
            <div class="fw-semibold">{{ item.name }}</div>
            <div class="text-secondary small">Qty: {{ item.qty }}</div>
          </div>

          <div class="fw-semibold">
            {{ formatMoney(item.lineTotal ?? (item.price * item.qty)) }}
          </div>
        </div>
      </div>

      <div class="app-surface p-3 rounded-3 mb-3 position-relative">
        <div class="d-flex justify-content-between">
          <span>Total</span>
          <strong>{{ formatMoney(total) }}</strong>
        </div>
      </div>

      <div class="d-grid gap-2 position-relative">
        <button
            type="button"
            class="btn btn-warning text-dark"
            @click="$emit('close')"
        >
          Continue Shopping
        </button>

        <button
            type="button"
            class="btn btn-outline-light"
            @click="$emit('leave-review')"
        >
          Leave a Review
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirmationModal',

  props: {
    isOpen: Boolean,
    total: Number,
    items: Array
  },

  emits: ['close', 'leave-review'],

  computed: {
    orderNumber() {
      return 'BGUMLR' + Math.floor(1000 + Math.random() * 9000)
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

<style scoped>
.confirmation-modal {
  background: linear-gradient(180deg, #0b0f19, #111827);
}

.confirmation-mascot {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
}

.confirmation-item-img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 12px;
}

.confetti {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  top: -20px;
  width: 10px;
  height: 18px;
  border-radius: 4px;
  animation: fall 2.8s linear infinite;
  opacity: 0.85;
}

.confetti-piece:nth-child(1) { left: 5%; animation-delay: 0s; background: #facc15; }
.confetti-piece:nth-child(2) { left: 12%; animation-delay: 0.2s; background: #60a5fa; }
.confetti-piece:nth-child(3) { left: 18%; animation-delay: 0.4s; background: #f472b6; }
.confetti-piece:nth-child(4) { left: 25%; animation-delay: 0.1s; background: #34d399; }
.confetti-piece:nth-child(5) { left: 32%; animation-delay: 0.5s; background: #f97316; }
.confetti-piece:nth-child(6) { left: 40%; animation-delay: 0.3s; background: #a78bfa; }
.confetti-piece:nth-child(7) { left: 48%; animation-delay: 0.7s; background: #facc15; }
.confetti-piece:nth-child(8) { left: 55%; animation-delay: 0.25s; background: #22c55e; }
.confetti-piece:nth-child(9) { left: 61%; animation-delay: 0.6s; background: #38bdf8; }
.confetti-piece:nth-child(10) { left: 68%; animation-delay: 0.15s; background: #fb7185; }
.confetti-piece:nth-child(11) { left: 74%; animation-delay: 0.45s; background: #facc15; }
.confetti-piece:nth-child(12) { left: 80%; animation-delay: 0.35s; background: #60a5fa; }
.confetti-piece:nth-child(13) { left: 84%; animation-delay: 0.55s; background: #f472b6; }
.confetti-piece:nth-child(14) { left: 88%; animation-delay: 0.75s; background: #34d399; }
.confetti-piece:nth-child(15) { left: 92%; animation-delay: 0.9s; background: #f97316; }
.confetti-piece:nth-child(16) { left: 15%; animation-delay: 1s; background: #a78bfa; }
.confetti-piece:nth-child(17) { left: 45%; animation-delay: 1.15s; background: #22c55e; }
.confetti-piece:nth-child(18) { left: 70%; animation-delay: 1.3s; background: #fb7185; }

@keyframes fall {
  0% {
    transform: translateY(-20px) rotate(0deg);
  }
  100% {
    transform: translateY(420px) rotate(360deg);
  }
}
</style>