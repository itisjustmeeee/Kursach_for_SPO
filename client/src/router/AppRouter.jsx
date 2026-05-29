import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import AuthLayout from "../layout/AuthLayout"
import ProtectedRoute from "../services/ProtectedRoute"
import { ROLES } from "../components/navbar/navigation"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route
                        path="/Login"
                    />
                    <Route
                        path="/register"
                    />
                </Route>
                <Route element={<MainLayout />}>
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