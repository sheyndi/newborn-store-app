import axios from "axios"

let baseUrl = "https://baby-store-node-backend.onrender.com/api/order";

export const addOrderApi = (order, token) => {
    return axios.post(baseUrl, order, {
        headers: { 'authorization':  token }
    })
}
