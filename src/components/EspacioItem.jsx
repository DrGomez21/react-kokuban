import { useNavigate } from "react-router-dom"

export function EspacioItem({ espacio, token, usuario }) {

    const navigate = useNavigate()

    const irAlTablero = (params) => {
        navigate('/tablero', {state: { token : token, user : usuario, espacio : espacio }})
    }

    return (
        <div  
            onClick={ irAlTablero }
            className="bg-red-300 border-2 border-black p-3 rounded-base hover:cursor-pointer hover:shadow-light"
        >
            <h3 className="montserrat-semibold">{espacio.nombre}</h3>
        </div>
    )
}