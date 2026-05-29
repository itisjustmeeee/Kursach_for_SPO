import { Link } from "react-router-dom"

export default function DropDown ({ item }) {
    return (
        <div>
            <button>
                {item.label}
            </button>
            <div>
                {item.dropdown.map(sub => (
                    <Link
                        key={sub.path}
                        to={sub.path}
                        className=""
                    >
                        {sub.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}