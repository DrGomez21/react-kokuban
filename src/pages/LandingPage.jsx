import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <div className="flex px-16 place-items-center justify-between h-screen bg-[#E7E6EF]">
            <div className="block">
                <div className="mb-12">
                    <h1 className="source-serif-4-bold text-6xl mb-4">Kokuban</h1>
                    <p className="montserrat-medium text-xl">Organiza tus proyectos y colabora con tu equipo de forma simple y visual. ¡Empieza ahora y transforma tu productividad!</p>
                </div>
                <div className="space-x-3">
                    <Link to={"/login"}>
                        <button className="bg-[#B2FF9E] hover:shadow-[.2rem_.2rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none">
                            Iniciar sesión
                        </button>
                    </Link>

                    <Link to={"/registro"}>
                        <button className="bg-white text-black hover:shadow-[.2rem_.2rem_#121212] montserrat-medium duration-150 py-2 px-4 border-2 border-[#121212] rounded-sm focus:outline-none focus:shadow-outline">
                            Crear cuenta
                        </button>
                    </Link>
                </div>
            </div>

            <img src="/kanban-method.png" alt="Imagen de referencia" />

        </div>

    )
}