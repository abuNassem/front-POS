'use client'
import { useApi } from "@/context";
import { useEffect } from "react";
import apiClient from ".";


export const ApiInterceptorBridge = () => {
    const { setNotify } = useApi();

    useEffect(() => {
        const resInterceptor = apiClient.interceptors.response.use(
            (response) => {
                if (["post", "put", "delete"].includes(response.config.method || "")) {
                    setNotify({ message: response.data.message??'تمت  العملية  بنجاح', type: "success" });
                }
                return response;
            },
            (error) => {
                const message = error.response?.data?.message || "خطأ في الاتصال بالسيرفر";
                const errorCode = error.response?.data?.errorCode;
                setNotify({ message, type: "error", errorCode });
                return Promise.reject(error);
            }
        );

        return () => apiClient.interceptors.response.eject(resInterceptor);
    }, [setNotify]);

    return null; // مكون وظيفي فقط لا يرسم شيئاً
};