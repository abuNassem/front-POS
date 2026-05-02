'use client'
import { Context, Notification } from "@/types/context";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";




export const ApiContext = createContext<Context | null>(null);

 const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [notify, setNotify] = useState<Notification>({ message: "", type: null });

    const clearNotify = () => setNotify({ message: "", type: null });
    
    return (
        <ApiContext.Provider value={{ notify, setNotify, clearNotify }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ContextProvider

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) throw new Error("useApi must be used within ContextProvider");
    return context;
};