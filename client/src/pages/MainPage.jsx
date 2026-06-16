import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth.js"
import "../assets/styles/mainStyle.scss"

export default function HomePage() {
    const { user } = useAuth()

    return (
        <section className="home">
            <div className="home__content">
                <h1 className="home__title">
                    Simple Archive
                </h1>

                {!user ? (
                    <h3 className="home__subtitle">
                        Ищите документы на интересующие темы
                    </h3>
                ) : (
                    <h3 className="home__subtitle">
                        Начните {" "}
                        <Link to="/racks" className="home__link">
                            поиск
                        </Link>
                        {" "} прямо сейчас
                    </h3>
                )}
            </div>
        </section>
    )
}