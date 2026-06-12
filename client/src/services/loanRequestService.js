import api from "../api/axios.js"

export const fetchPendingLoans = async () => {
    const response = await api.get('/api/loans/pending')

    return response.data
}

export const approveLoan = async (id) => {
    const response = await api.patch(`/api/loans/${id}/approve`)

    return response.data
}

export const rejectLoan = async (id) => {
    const response = await api.patch(`/api/loans/${id}/reject`)

    return response.data
}