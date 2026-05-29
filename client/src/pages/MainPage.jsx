import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function HomePage() {
    const { user } = useAuth()

    return (
        <section>
            <h1>
                Simple Archive
            </h1>

            {!user ? (
                <h3>
                    Ищите документы на интересующие темы
                </h3>
            ) : (
                <h3>
                    Начните {" "}
                    <Link to="/racks">
                        поиск
                    </Link>
                    {" "} прямо сейчас
                </h3>
            )}
        </section>
    )
}