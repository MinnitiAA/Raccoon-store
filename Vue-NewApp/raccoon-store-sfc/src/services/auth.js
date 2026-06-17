import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import {auth} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// User Registration
export async function registerUser(email, password){
    return await createUserWithEmailAndPassword(auth, email, password)
}

//User Login
export async function loginUser(email, password){
    return await signInWithEmailAndPassword(auth, email, password)
}

// User LogOut
export async function logoutUser(){
    return await signOut(auth)
}

export function watchAuth(callback){
    return onAuthStateChanged(auth, callback)
}


