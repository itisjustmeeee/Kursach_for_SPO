import api from "../api/axios.js"

export const fetchCellDocuments = async ({
    cell_id,
    search,
    sort,
    order,
    subject
}) => {
    console.log("cell_id =", cell_id)

    const response = await api.get(`/cells/${cell_id}/documents`, { params: {
        search,
        sort,
        order,
        subject
    } })

    return response.data
}