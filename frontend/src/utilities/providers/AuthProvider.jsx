/* eslint-disable react/prop-types */
import axios from "axios";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../config/firebase.congig";


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState("")


    //sign up users
    const signup = async (email, password) => {
        try {
            setLoader(true)
            return await createUserWithEmailAndPassword(auth, email, password)


        } catch (err) {
            setError(err.message)
            throw err;
        }

    }

    //login user
    const login = async (email, password) => {
        try {
            setLoader(true)
            return await signInWithEmailAndPassword(auth, email, password)

        } catch (err) {
            setError(err.message)
            throw err;
        }
    }
    // log out user
    const logout = async () => {
        try {
            setLoader(true)
            return await signOut(auth);

        } catch (err) {
            setError(err.message)
            throw err;
        }

    }

    // update user profile
    const updateUser = async (name, photo) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            })
            setUser(auth.currentUser)

        } catch (err) {
            setError(err.message)
            throw err;
        }

    }

    // googole login
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = async () => {
        try {
            setLoader(true)
            return await signInWithPopup(auth, googleProvider);

        } catch (err) {
            setError(err.message)
            throw err;
        }
    }

    // observer the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged((user) => {
            setUser(user)
            if (user) {
                axios.post('http://localhost:9000/api/set-token', {
                    email: user.email,
                    name: user.displayName
                }).then((data) => {
                    if (data.data.token) {
                        localStorage.getItem('token', data.data.token)
                        setLoader(false)
                    }
                })
            } else {
                localStorage.removeItem('token')
                setLoader(false)
            }

        })
        return () => {
            unsubscribe()
        }

    }, [])

    const contextValue = {
        user,
        loader,
        error,
        signup,
        login,
        logout,
        updateProfile,
        googleProvider,
        setError
    }


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider