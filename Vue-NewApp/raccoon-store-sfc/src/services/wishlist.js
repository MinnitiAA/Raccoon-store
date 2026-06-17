import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../firebase'

export async function addWishlistItem(product) {
    const user = auth.currentUser

    if (!user) {
        throw new Error('You need to be logged in to save wishlist items. ')
    }

    const itemRef = doc(db, 'users', user.uid, 'wishlist', String(product.id))

    await setDoc(itemRef, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description || '',
        features: product.features || []
    })
}


export async function removeWishlistItem(productId) {
    const user = auth.currentUser

    if (!user) {
        throw new Error('You need to be logged in to remove wishlist items.')
    }

    const itemRef = doc(db, 'users', user.uid, 'wishlist', String(productId))

    await deleteDoc(itemRef)
}

export async function getWishlistItems() {
    const user = auth.currentUser

    if (!user){
        throw new Error('You need to be logged in to view your wishlist.')
    }

    const wishlistRef = collection(db, 'users', user.uid, 'wishlist')
    const snapshot = await getDocs(wishlistRef)

     return snapshot.docs.map(doc => doc.data())
}