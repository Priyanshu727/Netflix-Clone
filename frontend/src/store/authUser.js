import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand'


export const userAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckinAuth: true,
    isLoggingOut:false,
    singup: async (credentials) => {
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({ user: response.data.user, isSigningUp: false })
            toast.success("Account successfully Created");
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            set({ isSigningUp: false, user: null });
        }
    },
    login: async () => { },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false });
            toast.success("logged out successfully");
        } catch (error) {
            set({ isLoggingOut: false });
           toast.error(error.response.data.message || "Logout Failed")
        }
     },
    authCheck: async () => {
        set({ isCheckinAuth: true });
        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) { 
            set({ isCheckingAuth: false, user: null });
            // toast.error
        }
     },

}))