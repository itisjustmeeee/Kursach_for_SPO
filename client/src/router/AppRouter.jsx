import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layout/MainLayout.jsx"
import AuthLayout from "../layout/AuthLayout.jsx"
import ProtectedRoute from "../services/ProtectedRoute.jsx"
import { ROLES } from "../components/navbar/navigation.js"
import HomePage from "../pages/MainPage.jsx"
import LoginPage from "../pages/Auth/LoginPage.jsx"
import RegisterPage from "../pages/Auth/RegisterPage.jsx"


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
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                
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