'use client'
import { Context, Notification } from "@/types/context";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";




export const ApiContext = createContext<Context | null>(null);


 const ContextProvider = ({ children }: { children: ReactNode }) => {
    const router=useRouter()
    const [notify, setNotify] = useState<Notification>({ message: "", type: null });
    const [online, setOnline] = useState(true);

 const handlePing=(status:boolean)=>{
        setOnline(status)
        console.log("ping",status)
    }

useEffect(() => {
  const onlineHandler = () => setOnline(true);

  const offlineHandler = () => {
    setOnline(false);
    router.push('/dashboard');
  };

  window.addEventListener("online", onlineHandler);
  window.addEventListener("offline", offlineHandler);

  return () => {
    window.removeEventListener("online", onlineHandler);
    window.removeEventListener("offline", offlineHandler);
  };
}, [router]);

    const clearNotify = () => setNotify({ message: "", type: null });
    
    return (
        <ApiContext.Provider value={{ notify, setNotify, clearNotify,online,handlePing }}>
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