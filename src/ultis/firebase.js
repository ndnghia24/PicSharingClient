// src/ultis/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Upload an image file to Firebase Storage and return the download URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The download URL of the uploaded image.
 */
export const uploadImageToFirebase = async (file) => {
  if (!file.type.startsWith('image/')) {
    throw new Error('Uploaded file is not an image. Please upload an image file.');
  }

  const timestamp = new Date().getTime();
  const filename = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `images/${filename}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
