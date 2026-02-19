import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5000/api",
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

        return response
    },
    error => {
        // const tokenError = error.config
        // if (error.response.status === 401 && !tokenError._retry) {
        //     // tokenError._retry = true
        //     // window.location.href = '/login'
        //     // apiClient.post("/auth/refresh-token").then(response=>{
        //     //     localStorage.setItem("token",response.data.token)
        //     //           tokenError.headers["Authorization"]=`Bearer ${response.data.token}`
        //     //     return apiClient(tokenError)
        //     // }).catch(error=>{

        //     // })

        // }
        return Promise.reject(error)
    }
)
export default apiClient