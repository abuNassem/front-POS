'use client';

import { useApi } from "@/context";
import { useEffect } from "react";
import apiClient from ".";

export const ApiInterceptorBridge = () => {

   const { setNotify, handlePing } = useApi();

   useEffect(() => {

      const interceptor =
         apiClient.interceptors.response.use(

            (response) => {

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

            (error) => {
                  handlePing(false);

               if (!error.response) {

                  setNotify({
                     message: "فشل الاتصال بالسيرفر",
                     type: "error",
                  });

                  return Promise.reject(error);
               }

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