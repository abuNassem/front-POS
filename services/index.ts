import axios from "axios";
const apiClient = axios.create({
    baseURL: "https://back-pos-8zxn.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
})


export default apiClient;