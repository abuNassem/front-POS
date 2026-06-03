'use client';

import { useApi } from "@/context";
import { useEffect } from "react";
import apiClient from ".";

export const ApiInterceptorBridge = () => {

   const { setNotify, handlePing } = useApi();

   useEffect(() => {

      const interceptor =
         apiClient.interceptors.response.use(

            // SUCCESS
            (response) => {
    console.log("INTERCEPTOR MOUNTED SUCCESS");

               handlePing(true);

               if (
                  ["post", "put", "delete"]
                     .includes(response.config.method || "")
               ) {

                  setNotify({
                     message:
                        response.data?.message ??
                        "تمت العملية بنجاح",

                     type: "success",
                  });
               }

               return response;
            },

            // ERROR
            (error) => {
    console.log("INTERCEPTOR MOUNTED FAIL");
                  handlePing(false);

               // Network Error
               if (!error.response) {


                  setNotify({
                     message: "فشل الاتصال بالسيرفر",
                     type: "error",
                  });

                  return Promise.reject(error);
               }

               // Server Error
               const message =
                  error.response.data?.message ||
                  "حدث خطأ";

               const errorCode =
                  error.response.data?.errorCode;

               setNotify({
                  message,
                  type: "error",
                  errorCode,
               });

               return Promise.reject(error);
            }
         );

      return () => {
         apiClient.interceptors.response.eject(interceptor);
      };

   }, [setNotify, handlePing]);

   return null;
};