import axios from "axios";


// ================= REGISTER =================
export const registerUser = async (data: {
   name: string;
   phone: string;
   password: string;
   birthDate: string;
   documentId: string;
}) => {

   const response = await axios.post(
      "http://localhost:5000/api/user/register",
      data
   );

   return response.data;
};


// ================= LOGIN =================
export const loginUser = async (data: {
   phone: string;
   password: string;
   birthDate: string;
   documentId: string;
}) => {

   const response = await axios.post(
      "http://localhost:5000/api/user/login",
      data
   );

   return response.data;
};


export const logoutUser = async () => {

   const response = await axios.post(
      "http://localhost:5000/api/user/logout"
   );

   return response.data;
};