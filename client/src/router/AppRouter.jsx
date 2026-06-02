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
                        path="/racks/:rack_id/shelves/:shelf_id/cells"
                        element={<CellsPage />}
                    />
                    <Route
                        path="/racks/:rack_id/shelves/:shelf_id/cells/:cell_id/documents"
                        element={<DocumentsPage />}
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
                        path="/users"
                        element={
                            <ProtectedRoute roles={[ROLES.ADMIN]}>

                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/documents"
                        element={
                            <ProtectedRoute roles={[ROLES.ADMIN]}>
                            
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/archive"
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