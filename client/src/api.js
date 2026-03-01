import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const backendURL = isProduction ? "https://theoretical-charo-lmsstudy-88979681.koyeb.app/api" : "http://localhost:5000/api";

export const API = axios.create({ baseURL: backendURL });

export const sendContact = (data) => API.post("/contact", data);
export const getContacts = () => API.get("/contact");
export const markContactAsRead = (id) => API.patch(`/contact/${id}/read`);
export const uploadCV = (formData) => API.post("/cv/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
});
