'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { 
    User,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';
import type { UserData, UserRole } from '@/types/auth';

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        if (user) {
        // Obtener datos adicionales del usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
        }
        } else {
        setUserData(null);
        }
        setLoading(false);
    });

    return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    
        if (!userDoc.exists()) {
        throw new Error('Usuario no encontrado en la base de datos');
        }

        const userData = userDoc.data() as UserData;
        setUserData(userData);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
    };

    const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        setUserData(null);
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        throw error;
    }
    };

    const isAdmin = userData?.role === 'admin';

    return (
    <AuthContext.Provider value={{ user, userData, loading, signIn, signOut, isAdmin }}>
        {!loading && children}
    </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);