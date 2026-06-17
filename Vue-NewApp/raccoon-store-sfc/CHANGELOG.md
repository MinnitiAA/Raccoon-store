# Raccoon Store App – Changelog

## Overview
Over the past week and these last days, I worked on improving my application based on feedback and what we covered in class. I focused on making the app more organized, reusable, and easier to maintain, while also improving the UI and user experience.

## Assignment Refactor Work

### Models and Structure
- Created a `Product` model for the store items.
- Created a `CartItem` model to separate product data from cart behavior (like quantity and totals).
- Improved how data is structured so the app is more modular and scalable.

### Cart Logic (Collection)
- Created a `Cart` class to manage all cart operations.
- Moved logic like add, remove, increase/decrease quantity, clear cart, and discount handling out of `App.vue`.
- This helped reduce duplicated logic and made the code cleaner (DRY and SRP).

### General Refactoring
- Cleaned up `App.vue` by removing unnecessary logic.
- Improved separation of concerns by keeping logic in models and UI in components.
- Applied concepts from class like DRY, SRP, and component-based design.

## Component Improvements
- Split the app into multiple components instead of one large file.
- Reused the `CartSummary` component in both cart and checkout.
- Improved communication between components using props and emits.
- Added better prop validation for debugging and structure.

## Search Feature
- Added a working search bar in the header.
- Connected the input to the app state.
- Implemented filtering so users can search by product name, description, and features.
- Products update dynamically while typing.

## Checkout & Confirmation
- Improved checkout validation.
- Replaced the browser alert with a custom order confirmation modal.
- Added purchased items and total price to the confirmation screen.
- Added options like continuing shopping or leaving a review.

## UI / UX Improvements
- Made the hero section more visible and better spaced.
- Improved the badge text size and layout.
- Updated colors and contrast to improve readability.
- Rounded and improved the mascot image.
- Made product images uniform for a cleaner layout.
- Cleaned up the header and toolbar.
- Replaced links with buttons for better interaction.

## Bug Fixes
- Fixed issues with running the project (Vite setup).
- Fixed checkout and modal interaction problems.
- Fixed total showing as NaN in confirmation.
- Fixed cart updates when adding/removing items.
- Fixed state reset after placing an order.

## Final Result
Overall, the app is now more organized, easier to maintain, and more user-friendly. The structure is cleaner, the logic is separated properly, and the UI feels more like a real application.