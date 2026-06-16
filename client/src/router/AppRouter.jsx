import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layout/MainLayout.jsx"
import AuthLayout from "../layout/AuthLayout.jsx"
import ProtectedRoute from "../services/ProtectedRoute.jsx"
import { ROLES } from "../components/navbar/navigation.js"
import HomePage from "../pages/MainPage.jsx"
import LoginPage from "../pages/Auth/LoginPage.jsx"
import RegisterPage from "../pages/Auth/RegisterPage.jsx"
import ProfilePage from "../pages/user/ProfilePage.jsx"
import RacksPage from "../pages/user/RacksPage.jsx"
import ShelvesPage from "../pages/user/ShelfPage.jsx"
import CellsPage from "../pages/user/CellPage.jsx"
import DocumentsPage from "../pages/user/DocsPage.jsx"
import DocumentPage from "../pages/user/DocPage.jsx"
import ActiveLoansPage from "../pages/user/ActiveLoansPage.jsx"
import HistoryLoansPage from "../pages/user/HistoryLoanPage.jsx"
import ArchiveStatsPage from "../pages/AdminOnlyPages/ArchiveDataPage.jsx"
import UsersDataPage from "../pages/AdminOnlyPages/UsersDataPage.jsx"
import DocumentsStatsPage from "../pages/AdminOnlyPages/DocumentsDataPage.jsx"
import CreateDocumentPage from "../pages/AdminOnlyPages/AddingDocPage.jsx"
import LoanRequestPage from "../pages/AdminOnlyPages/RequestsPage.jsx"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />
                </Route>
                <Route element={<MainLayout />}>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/racks"
                        element={
                            <ProtectedRoute>
                                <RacksPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/racks/:rack_id/shelves"
                        element={
                            <ProtectedRoute>
                                <ShelvesPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/racks/:rack_id/shelves/:shelf_id/cells"
                        element={
                            <ProtectedRoute>
                                <CellsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/shelves/:shelf_id/cells/:cell_id/documents"
                        element={
                            <ProtectedRoute>
                                <DocumentsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/shelves/:shelf_id/cells/:cell_id/documents/:id"
                        element={
                            <ProtectedRoute>
                                <DocumentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/loans/loan-active"
                        element={
                            <ProtectedRoute>
                                <ActiveLoansPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/loans/loan-history"
                        element={
                            <ProtectedRoute>
                                <HistoryLoansPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/archive"
                        element={
                            <ProtectedRoute roles={[ROLES.ADMIN]}>
                                <ArchiveStatsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/admin/users"
                        element={
                            <ProtectedRoute roles={[ROLES.ADMIN]}>
                                <UsersDataPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/documents"
                        element={
                            <ProtectedRoute roles={[ROLES.ADMIN]}>
                                <DocumentsStatsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/documents/create"
                        element={
                            <ProtectedRoute roles={[ROLES.ADMIN]}>
                                <CreateDocumentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/loans/loan-requests"
                        element={
                            <ProtectedRoute roles={[ROLES.ADMIN]}>
                                <LoanRequestPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}