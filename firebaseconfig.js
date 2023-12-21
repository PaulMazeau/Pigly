// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import {PROJECTID, APIKEY, AUTHDOMAIN, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID} from '@env'


const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
    measurementId: MEASUREMENTID
  };

// Initialize Firebase
export const FB_APP = initializeApp(firebaseConfig);
export const FB_AUTH = getAuth(FB_APP);
export const FB_DB = getFirestore(FB_APP);
export const FB_STORE = getStorage(FB_APP);