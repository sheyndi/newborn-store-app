import axios from "axios"

let baseUrl = "https://baby-store-node-backend.onrender.com/api/gift";

export const pagesProductsApi = (limit, category) => {
    return axios.get(baseUrl + `/numPages/${category ? category : ""}?limit=${limit}`)
}

export const getAllProductsApi = (limit, page, category) => {
    return axios.get(baseUrl + `/all${category ? "/" + category : ""}/?limit=${limit}&page=${page}`)
}

export const addProductApi = (product, token) => {
    return axios.post(baseUrl, product, {
        headers: { 'authorization': token }
    })
}

export const updateProductApi = (product, token) => {
    return axios.put(baseUrl + `/${product._id}`, product, {
        headers: { 'authorization': token }
    })
}

export const deleteProductApi = (id, token) => {
    return axios.delete(baseUrl + `/${id}`, {
        headers: { 'authorization': token }
    })
}

export const getProductByIdApi = (id) => {
    return axios.get(baseUrl + `/${id}`)
}