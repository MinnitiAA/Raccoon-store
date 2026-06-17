import Product from '../models/Product.js'

import hyperXCloud from '../assets/img/HyperX Cloud.jpg'
import asusRogDelta from '../assets/img/Asus ROG Delta II.jpg'
import darkMatter from '../assets/img/Dark Matter Hyper-K.webp'
import logitechG502 from '../assets/img/Logitech G502.jpg'
import mageGee from '../assets/img/MageGee.jpg'
import mercuryK1 from '../assets/img/Mercury k1 Gaming Keyboard.webp'
import SteelSeriesArctisNova5 from '../assets/img/SteelSeries Arctis Nova 5.webp'
import RazerBlackSharkV3Pro from '../assets/img/Razer BlackShark V3 Pro.webp'
import LogitechGProX2 from '../assets/img/Logitech G PRO X2.webp'
import ErgoStrike7 from '../assets/img/ErgoStrike7.webp'
import KeyChronJ2 from '../assets/img/Keychron J2.webp'
import AMRGB65R15 from '../assets/img/AM RGB 65  R1.5.webp'

export const
    products = [
    new Product({
        id: 1,
        name: 'HyperX Cloud',
        category: 'Headsets',
        price: 125.99,
        image: hyperXCloud,
        rating: 3,
        reviews: 358,
        description: 'Nice comfortable headphones with solid audio balance.',
        features: ["Great Sound", "Comfort", "Great Mic"]
    }),

    new Product({
        id: 2,
        name: 'ASUS ROG Delta II',
        category: 'Headsets',
        price: 50.87,
        image: asusRogDelta,
        rating: 1,
        reviews: 210,
        description: 'Wireless gaming headset with clear sound.',
        features: ["Wireless", "Comfort"]
    }),

    new Product({
        id: 3,
        name: 'Dark Matter Hyper-K Wireless Gaming Mouse',
        category: 'Mouses',
        price: 28.14,
        image: darkMatter,
        rating: 4,
        reviews: 145,
        description: 'Lightweight gaming mouse designed for speed and precision.',
        features: ["Wireless", "Comfort"]
    }),

    new Product({
        id: 4,
        name: 'Logitech G502 X PLUS Wireless Gaming Mouse',
        category: 'Mouses',
        price: 144.99,
        image: logitechG502,
        rating: 4,
        reviews: 500,
        description: 'Premium wireless gaming mouse with RGB lighting.',
        features: ["Wireless", "Comfort"]
    }),

    new Product({
        id: 5,
        name: 'MageGee Portable 60% Mechanical Gaming Keyboard',
        category: 'Keyboards',
        price: 48.00,
        image: mageGee,
        rating: 3.0,
        reviews: 190,
        description: 'Compact mechanical keyboard great for gaming setups.',
        features: ["Comfort"]
    }),

    new Product({
        id: 6,
        name: 'Mercury K1 Gradient Gaming Keyboard',
        category: 'Keyboards',
        price: 129.95,
        image: mercuryK1,
        rating: 4,
        reviews: 530,
        description: 'Stylish gaming keyboard with a premium feel.',
        features: ["Comfort"]
    }),
        new Product({
            id: 7,
            name: 'SteelSeries Arctis Nova 5',
            category: 'Headsets',
            price: 150.00,
            image: SteelSeriesArctisNova5,
            rating: 2,
            reviews: 1030,
            description: ' versatile, mid-range wireless gaming headset designed for cross-platform play.',
            features: ["Comfort", 'Wireless']
        }),

        new Product({
            id: 8,
            name: 'Razer BlackShark V3 Pro',
            category: 'Headsets',
            price: 249.00,
            image: RazerBlackSharkV3Pro,
            rating: 5,
            reviews: 1340,
            description: 'lightweight wireless esports headset featuring Razer HyperSpeed Wireless Gen-2',
            features: ['Wireless', 'Great Mic']
        }),

        new Product({
            id: 9,
            name: 'Logitech G PRO X2',
            category: 'Mouses',
            price: 249.00,
            image: LogitechGProX2,
            rating: 4,
            reviews: 340,
            description: 'high-performance wireless gaming mouse designed for esports with a 61-gram weight and revolutionary haptic inductive (analog) switches',
            features: ['Wireless', 'Comfort']
        }),

        new Product({
            id: 10,
            name: 'ErgoStrike 7',
            category: 'Mouses',
            price: 1249.00,
            image: ErgoStrike7,
            rating: 4,
            reviews: 2340,
            description: 'a specialized, pistol-shaped vertical gaming mouse designed for FPS games, featuring built-in haptic recoil feedback and a trigger-style left click',
            features: ['Wireless',]
        }),

        new Product({
            id: 11,
            name: 'Keychron J2',
            category: 'Keyboards',
            price: 89.90,
            image: KeyChronJ2,
            rating: 3,
            reviews: 947,
            description: 'a 75% layout, hot-swappable wireless mechanical keyboard featuring QMK/VIA support, 2.4 GHz wireless (1000 Hz), Bluetooth 5.2, and wired connectivity',
            features: ['Comfort']
        }),

        new Product({
            id: 12,
            name: 'AM RGB 65 R1.5',
            category: 'Keyboards',
            price: 620.00,
            image: AMRGB65R15,
            rating: 5,
            reviews: 247,
            description: 'a high-end 65% retro-futuristic mechanical keyboard inspired by the Game Boy, featuring a 200-LED customizable display, adjustable leaf-spring mounting, and tri-mode connectivity (2.4G/BT/Wired).',
            features: ['Wireless', ]
        }),
    ]