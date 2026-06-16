import { Link } from "react-router-dom"
import { useState } from "react"
import "../assets/styles/dropDown.scss"

export default function DropDown({ item }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="dropdown">
            <button className="dropdown__button" onClick={() => setIsOpen(prev => !prev)}>
                {item.label}
            </button>
            {isOpen && (
                <div className="dropdown__menu">
                    {item.dropdown.map(sub => (
                        <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="dropdown__link"
                        >
                            {sub.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}