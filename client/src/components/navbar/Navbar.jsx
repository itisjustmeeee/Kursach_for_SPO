import { NavLink, Link, useLocation } from "react-router-dom"
import useAuth from '../../hooks/useAuth.js'
import { adminNavigation, baseNavigation, ROLES } from './navigation.js'
import DropDown from "../../services/DropDown.jsx"
import ProfileMenu from "../../services/ProfileMenu.jsx"
import "../../assets/styles/navBar.scss"

export default function Navbar() {
    const { user } = useAuth()

    const location = useLocation()

    const hideNavbarRoutes = [
        "/login",
        "/register"
    ]

    if (hideNavbarRoutes.includes(location.pathname)) {
        return null
    }

    const userRoles = user?.roles || []

    const navigationItems = [
        ...baseNavigation,

        ...(userRoles.includes(ROLES.ADMIN) ? adminNavigation : [])
    ].filter(item => {
        if (!item.roles) {
            return true
        }

        return item.roles.some(role => userRoles.includes(role))
    })

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link to="/" className="navbar__logo">
                    Simple Archive
                </Link>
                <div className="navbar__links">
                    {navigationItems.map(item => (
                        item.dropdown ? (
                            <DropDown
                                key={item.label}
                                item={item}
                            />
                        ) : (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => isActive 
                                    ? "navbar__link navbar__link--active" 
                                    : "navbar__link"
                                }
                            >
                                {item.label}
                            </NavLink>
                        )
                    ))}
                </div>
                <div className="navbar__profile">
                    {!user ? (
                        <div className="navbar_auth">
                            <Link to="/login">
                                Вход
                            </Link>
                            <Link to="/register">
                                Регистрация
                            </Link>
                        </div>
                    ) : (
                        <ProfileMenu />
                    )}
                </div>
            </div>
        </nav>
    )
}