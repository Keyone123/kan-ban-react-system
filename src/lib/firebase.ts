// src/lib/firebase.ts
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Se preferir, jogue isso em variáveis de ambiente.
// (Atenção: essas chaves são públicas por design; proteja com regras)
const firebaseConfig = {
  apiKey: "AIzaSyCnVui9hldqhF1qUZPTwgIrIW2d90cJfyM",
  authDomain: "kanban-react-b1110.firebaseapp.com",
  projectId: "kanban-react-b1110",
  storageBucket: "kanban-react-b1110.firebasestorage.app",
  messagingSenderId: "416674671096",
  appId: "1:416674671096:web:b80e11264a2522b706ce0d",
  measurementId: "G-9HP2RL6Y3T",
};

// Garante singleton (evita "Firebase App named '[DEFAULT]' already exists")
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Exporte os serviços que você for usar
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Analytics é só no browser e nem sempre suportado (modo privado, etc.)
// Exporte um init opcional para chamar no cliente quando fizer sentido
export async function initAnalytics() {
  if (typeof window === "undefined") return; // SSR não
  const { isSupported, getAnalytics } = await import("firebase/analytics");
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return undefined;
}

export default app;
