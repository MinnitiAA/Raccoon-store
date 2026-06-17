export default class CartItem {
    constructor(product, qty = 1) {
        this.product = product;
        this.qty = qty;
    }

    increase(amount = 1){
        this.qty += amount;
    }

    decrease(amount = 1){
        this.qty = Math.max(1, this.qty - amount);
    }

    get lineTotal() {
        return this.product.price * this.qty;
    }

    get id() {
        return this.product.id;
    }

    get name() {
        return this.product.name;
    }

    get price() {
        return this.product.price;
    }

    get image() {
        return this.product.image;
    }

    get features() {
        return this.product.features;
    }
}