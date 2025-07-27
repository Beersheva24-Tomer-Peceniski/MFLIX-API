import { create } from 'zustand'

interface UserData {
    token: string | null;
    setToken: (token: string) => void;
    resetToken: () => void;
    role: string | null;
    setRole: (role: string) => void;
    resetRole: () => void;
}


export const useUserData = create<UserData>(set => ({
    token: localStorage.getItem("token"),
    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },
    resetToken: () => {
        localStorage.removeItem("token");
        set({ token: null });
    },
    role: localStorage.getItem("role"),
    setRole: (role) => {
        localStorage.setItem("role", role);
        set({ role });
    },
    resetRole: () => {
        localStorage.removeItem("role");
        set({ role: null });
    },
}))
