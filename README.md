# 🦝 Raccoon Store

A full-featured e-commerce web app for gaming accessories, built with Vue 3, Vite, and Firebase.

**[Live Demo →]https://fir-demo-77a8d.web.app/**
---

## Overview

Raccoon Store is a single-page application where users can browse gaming peripherals (headsets, mice, keyboards), manage a shopping cart, apply discount codes, and place orders — all backed by Firebase Authentication and Firestore.

Built as a final project for a JavaScript 2 / Vue course at Waukesha County Technical College. The goal was to apply real-world patterns: component-based architecture, separation of concerns, model classes, and Firebase integration.

---

## Features

- **Product catalog** — browse 12 gaming accessories with images, ratings, and descriptions
- **Search & filtering** — live search by name, description, or feature tag; filter by category; sort by price or rating
- **Shopping cart** — add/remove items, adjust quantities, view running totals
- **Discount codes** — apply promo codes for percentage discounts (try `RACCOON10`)
- **Free shipping threshold** — automatically calculated at checkout
- **Checkout flow** — form validation, order summary, and confirmation modal
- **Firebase Auth** — user registration and login with email/password
- **Wishlist** — save items to a personal wishlist stored in Firestore
- **Order history** — past orders saved to Firestore and viewable on your profile
- **Page transitions** — smooth fade animations between routes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Options API) |
| Build Tool | Vite |
| Styling | Bootstrap 5 + SCSS |
| Routing | Vue Router |
| Backend | Firebase (Auth + Firestore + Hosting) |
| Language | JavaScript (ES6+) |

---

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── HeaderBar.vue
│   ├── ProductCard.vue
│   ├── ProductGrid.vue
│   ├── CartDrawer.vue
│   ├── CartSummary.vue
│   ├── CheckoutModal.vue
│   ├── OrderConfirmationModal.vue
│   └── ProductDetailsModal.vue
├── views/            # Route-level pages
│   ├── HomeView.vue
│   ├── LoginView.vue
│   ├── ProfileView.vue
│   ├── WishlistView.vue
│   └── OrderHistoryView.vue
├── models/           # Business logic classes
│   ├── Product.js
│   ├── Cart.js
│   └── CartItem.js
├── services/         # Firebase service layer
│   ├── auth.js
│   ├── orders.js
│   └── wishlist.js
├── data/
│   └── products.js   # Product catalog data
└── router/
    └── index.js
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Authentication and Firestore enabled

### Installation

```bash
# Clone the repo
git clone https://github.com/MinnitiAA/raccoon-store.git
cd raccoon-store/raccoon-store-sfc

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Environment
Create a `.env` file in the `raccoon-store-sfc` directory with your Firebase config:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## What I Learned

- Structuring a Vue app with multiple components, views, and routes
- Separating business logic into model classes (`Cart`, `CartItem`, `Product`) following DRY and SRP principles
- Connecting a frontend app to Firebase Auth and Firestore
- Managing component communication with props and emits
- Deploying to Firebase Hosting

---

## Author

**Andres Minniti** — [LinkedIn](https://www.linkedin.com/in/andres-minniti-paez-01675b376) · [GitHub](https://github.com/MinnitiAA)
