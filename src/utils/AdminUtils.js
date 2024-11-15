// AdminUtils.js

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Asegúrate de que firebase.js exporte correctamente la instancia de Firestore

// UID del usuario al que quieres asignar el rol de administrador
const ADMIN_UID = "tU1ROMtXMjWQxgGZzUcuc2Gm64m1";

// Función para asignar el rol de administrador a un usuario específico
export const isAdminUser = async () => {
    const result = { statusResponse: true, error: null };

    try {
        await setDoc(doc(db, 'users', ADMIN_UID), { role: 'admin' }, { merge: true });
        console.log("Rol de administrador asignado correctamente.");
    } catch (error) {
        result.statusResponse = false;
        result.error = error.message;
        console.error("Error al asignar el rol de administrador:", error);
    }

    return result;
};
