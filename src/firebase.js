import{ initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyAi_06_Be8wDnDimBqxTgDy14feHKric3o',
  authDomain: 'chatter-project-7eb98.firebaseapp.com',
  projectId: 'chatter-project-7eb98',
  storageBucket: 'chatter-project-7eb98.appspot.com',
  messagingSenderId: '905398250628',
  appId: '1:905398250628:web:0fc6aecdbaeaa1b94666d1',
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export { db, storage, auth }
