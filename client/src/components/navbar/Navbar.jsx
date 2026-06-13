import { NavLink, Link, useLocation } from "react-router-dom"
import useAuth from '../../hooks/useAuth.js'
import { adminNavigation, baseNavigation, ROLES } from './navigation.js'
import DropDown from "../../services/DropDown.jsx"
import ProfileMenu from "../../services/ProfileMenu.jsx"

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
        <nav>
            <Link to="/">
                Simple Archive
            </Link>
            <div>
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
                            className={({ isActive }) => isActive ? '' : ''}
                        >
                            {item.label}
                        </NavLink>
                    )
                ))}
            </div>
            <div>
                {!user ? (
                    <div>
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
        </nav>
    )
}