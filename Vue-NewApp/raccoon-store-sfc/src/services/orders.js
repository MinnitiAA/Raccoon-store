import {collection, addDoc, getDocs, query, orderBy} from 'firebase/firestore'

import { auth, db } from '../firebase'

// Save a new order
export async function saveOrder(orderData) {
    const user = auth.currentUser

    if (!user) {
        throw new Error('You must be logged in to place an order.')
    }

    const ordersRef = collection(db, 'users', user.uid, 'orders')

    await addDoc(ordersRef, {
        ...orderData,
        createdAt: new Date()
    })
}

// Get all orders for current user
export async function getOrders() {
    const user = auth.currentUser

    if (!user) {
        throw new Error('You must be logged in to view orders.')
    }

    const ordersRef = collection(db, 'users', user.uid, 'orders')
    const q = query(ordersRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}
