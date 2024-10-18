

export function RegistroPage() {
    return (
        <div className="flex px-16 items-center justify-center h-screen bg-[#E7E6EF]">

            <div className="bg-white shadow-[.5rem_.5rem_#121212] border-4 border-black  p-8 max-w-4xl w-full">

                <img src="/Kokuban-logo-full.png" alt="Logo Kokuban" className="mb-4" />

                <form action="" className="columns-2 mb-4">

                    <div>
                        <div className="mb-4">
                            <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="username">
                            Nombre de usuario
                            </label>
                            <input
                            className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Nombre de usuario"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="email">
                            Email
                            </label>
                            <input
                            className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Email"
                            />
                        </div>
 
                    </div>

                    <div>
                        <div className="mb-4">
                            <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="pass">
                            Contraseña
                            </label>
                            <input
                            className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="pass"
                            type="password"
                            placeholder="Contraseña"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="confirm-pass">
                            Confirmar contraseña
                            </label>
                            <input
                            className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirm-pass"
                            type="password"
                            placeholder="Confirmar contraseña"
                            />
                        </div>
 
                    </div>

                </form>

                <button
                    className="bg-[#B2FF9E] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full"
                    type="submit"
                >
                  Crear usuario
                </button>

            </div>

        </div>
    )
}