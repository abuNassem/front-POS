import axios from "axios";

const apiClient = axios.create({
<<<<<<< HEAD
    baseURL: "https://back-pos-8zxn.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
})
apiClient.interceptors.request.use(
    config => {
        // const token = localStorage.getItem("token")
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`
        // }
        return config
    }
)
apiClient.interceptors.response.use(
    response => {
=======
   baseURL: "http://localhost:5000/api",
});
>>>>>>> dev

export default apiClient;