import api from "../api/axios.js"

export const fetchShelves = async (params = {}) => {
    const response = await api.get("/shelves", 
        { params }
    )

    return response.data
}

export const fetchShelfById = async (id) => {
    const response = await api.get(`/shelves/${id}`)

    return response.data
}

export const createShelf = async (data) => {
    const response = await api.post("/shelves", data)

    return response.data
}

export const updateShelf = async (id, data) => {
    const response = await api.put(`/shelves/${id}`, data)

    return response.data
}

export const deleteShelf = async (id) => {
    const response = await api.delete(`/shelves/${id}`)

    return response.data
}