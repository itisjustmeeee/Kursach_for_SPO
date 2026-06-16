import { Link } from "react-router-dom"
import { useState } from "react"

export default function DropDown({ item }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div style={{ position: "relative" }}>
            <button onClick={() => setIsOpen(prev => !prev)}>
                {item.label}
            </button>
            {isOpen && (
                <div style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #ccc",
                    padding: "8px",
                    minWidth: "200px",
                    zIndex: 1000
                }}>
                    {item.dropdown.map(sub => (
                        <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            style={{
                                padding: "6px 0",
                                textDecoration: "none"
                            }}
                        >
                            {sub.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}