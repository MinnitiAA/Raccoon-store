import CartItem from "./CartItem.js";

export default class Cart {
    constructor(items = []) {
        this.items = items;
        this.discountPercent = 0;
    }

    addProduct(product, qty = 1) {
        const existing = this.items.find(item => item.id === product.id);

        if (existing) {
            existing.increase(qty);
        } else {
            this.items.push(new CartItem(product, qty));
        }
    }

    removeProduct(id) {
        this.items = this.items.filter(item => item.id !== id)
    }

    increaseQty(id) {
        const item = this.items.find(item => item.id === id)
        if (item) item.increase()
    }

    decreaseQty(id) {
        const item = this.items.find(item => item.id === id)
        if (!item) return

        if (item.qty <= 1) {
            this.removeProduct(id)
        } else {
            item.decrease()
        }
    }

    applyDiscountCode(code) {
        const cleanedCode = code.trim().toUpperCase()

        if (cleanedCode === 'RACCOON10') {
            this.discountPercent = 0.10
            return {
                ok: true,
                message: 'Discount applied: 10% off!'
            }
        }

        if (cleanedCode === '') {
            this.discountPercent = 0
            return {
                ok: false,
                message: 'Enter a code to apply a discount.'
            }
        }

        this.discountPercent = 0
        return {
            ok: false,
            message: 'Invalid code. Try RACCOON10.'
        }
    }

    clear() {
        this.items = []
        this.discountPercent = 0
    }

    get count() {
        return this.items.reduce((sum, item) => sum + item.qty, 0)
    }

    get subtotal() {
        return this.items.reduce((sum, item) => sum + item.lineTotal, 0)
    }

    get discountAmount() {
        return this.subtotal * this.discountPercent
    }

    get subtotalAfterDiscount() {
        return this.subtotal - this.discountAmount
    }

    get tax() {
        return this.subtotalAfterDiscount * 0.055
    }

    shippingCost(freeShippingThreshold = 200) {
        return this.subtotal >= freeShippingThreshold ? 0 : 18
    }

    total(freeShippingThreshold = 200) {
        return this.subtotalAfterDiscount + this.tax + this.shippingCost(freeShippingThreshold)
    }

    freeShippingMessage(freeShippingThreshold = 200) {
        if (this.subtotal >= freeShippingThreshold) {
            return 'You have free shipping!'
        }

        const amountLeft = freeShippingThreshold - this.subtotal
        return `You’re $${amountLeft.toFixed(2)} away from free shipping.`
    }
}