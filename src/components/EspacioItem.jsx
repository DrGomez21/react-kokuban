import { useNavigate } from "react-router-dom"

export function EspacioItem({ espacio, token, usuario }) {

    const navigate = useNavigate()

    const irAlTablero = (params) => {
        navigate('/tablero', {state: { token : token, user : usuario, espacio : espacio }})
    }

    return (
        <div  
            onClick={ irAlTablero }
            className="bg-[#F5FF70] border-[3px] shadow-[.2rem_.2rem_#121212] border-[#121212] hover:shadow-[.4rem_.4rem_#121212] hover:cursor-pointer duration-150 p-4 w-full"
        >
            <h3 className="montserrat-semibold">{espacio.nombre}</h3>
        </div>
    )
}