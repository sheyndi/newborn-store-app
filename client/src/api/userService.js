import axios from "axios"

let baseUrl = "https://baby-store-node-backend.onrender.com/api/user";

export const addUserApi = (user) => {
    return axios.post(baseUrl, user);
}

export const loginApi = (user) => {
    return axios.post(baseUrl + '/login', user);
}

export const forgotPasswordApi = (email) => {
    return axios.post(baseUrl + '/forgot-password', { email });
}

export const resetPasswordApi = (token, password) => {
    return axios.put(baseUrl + '/reset-password', { password }, {
        headers: { 'authorization': token }
    });
}