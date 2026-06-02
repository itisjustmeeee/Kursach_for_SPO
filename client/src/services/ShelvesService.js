import api from "../api/axios.js"

export const fecthShelves = async (rack_id) => {
    const response = await api.get("/api/shelves", 
        { params: {
            rack_id: rack_id
        }}
    )

    return response.data
}