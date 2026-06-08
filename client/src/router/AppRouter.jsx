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

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route
                        path="/Login"
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
                        element={<RacksPage />}
                    />
                    <Route
                        path="/racks/:rack_id/shelves"
                        element={<ShelvesPage />}
                    />
                    <Route
                        path="/shelves/:shelf_id/cells"
                        element={<CellsPage />}
                    />
                    <Route
                        path="/cells/:cell_id/documents"
                        element={<DocumentsPage />}
                    />
                    <Route
                        path="/cells/:cell_id/documents/:id"
                        element={<DocumentPage />}
                    />
                    <Route
                        path="/loans/active"
                        element={
                            <ProtectedRoute>
                                <ActiveLoansPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/loans/history"
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
                        path="/admin/reports"
                        element={
                            <ProtectedRoute roles={[ROLES.ADMIN]}>
                                
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/documents/create"
                        element={
                            <ProtectedRoute roles={[ROLES.ADMIN]}>
                                
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}