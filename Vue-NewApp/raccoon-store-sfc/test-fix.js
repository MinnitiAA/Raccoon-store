import Cart from './src/models/Cart.js';
import CartItem from './src/models/CartItem.js';

const mockProduct = { id: 1, name: 'Test Product', price: 100 };
const cart = new Cart();

console.log('--- Testing Cart Totals ---');
cart.addProduct(mockProduct, 2);

console.log('Cart count (expected 2):', cart.count);
console.log('Cart subtotal (expected 200):', cart.subtotal);
console.log('Cart tax (expected 11):', cart.tax);
console.log('Cart shipping (expected 0):', cart.shippingCost(200));
console.log('Cart total (expected 211):', cart.total(200));

if (isNaN(cart.total())) {
    console.error('FAILED: Total is NaN');
    process.exit(1);
} else {
    console.log('SUCCESS: Total is a number: ', cart.total());
}
