
export function Header({ user, nombreEspacio }) {
    return (
        <div className="flex justify-between p-3 place-items-center">
            <div className="flex">
                <img src="/Kokuban-logo-minimal.svg" width={56} height={56} alt="Logotipo Mini" />
                <div className="my-3 mx-3">
                    <h2 className="montserrat-bold text-2xl">Bienvenido, {user ? user.username : ""}</h2>
                    {
                        nombreEspacio &&
                        <h4 className="montserrat-medium text-xs">Espacio: {nombreEspacio}</h4> 
                    }
                </div>
            </div>

            <div className="flex">
                <button className="bg-[#AE84F7] text-white border-2 border-[#121212] montserrat-medium px-4 h-12 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150">
                    <span className="montserrat-bold text-[#121212]">⋮</span>
                </button>
                <button >
                    {/* TODO: Agregar otro botones necesarios. */}
                </button>
            </div>
        </div>
    )
}