import apiClient from "./index"

export const getProduct = () => {
    return apiClient.get("/")
}