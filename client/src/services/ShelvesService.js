import api from "../api/axios.js"

export const fecthShelves = async (rack_id) => {
    const response = await api.get("/api/shelves", 
        { params: {
            rack_id: rack_id
        }}
    )

    return response.data
}

export const fetchShelfById = async (id) => {
    const response = await api.get(`/api/shelves/${id}`)

    return response.data
}

export const createShelf = async (data) => {
    const response = await api.post("/api/shelves", data)

    return response.data
}

export const updateShelf = async (id, data) => {
    const response = await api.put(`/api/shelves/${id}`, data)

    return response.data
}

export const deleteShelf = async (id) => {
    const response = await api.delete(`/api/shelves/${id}`)

    return response.data
}