import api from "../api/axios.js"

export const fetchPendingLoans = async (params = {}) => {
    const response = await api.get('/loans/pending', { params })

    return response.data
}

export const approveLoan = async (id) => {
    const response = await api.patch(`/loans/${id}/approve`)

    return response.data
}

export const rejectLoan = async (id) => {
    const response = await api.patch(`/loans/${id}/reject`)

    return response.data
}