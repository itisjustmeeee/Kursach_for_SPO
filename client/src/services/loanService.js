import api from "../api/axios.js"

export const fetchActiveLoans = async (params = {}) => {
    const response = await api.get("/api/loans/active", { params })

    return response.data
}

export const returnLoan = async (loan_id) => {
    const response = await api.patch(
        `/api/loans/${loan_id}/return`
    )

    return response.data
}

export const createLoanRequest = async (document_id) => {
    const response = await api.post('/api/loans/request', {
        document_id
    })

    return response.data
}