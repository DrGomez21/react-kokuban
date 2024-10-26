import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "./Modal"
import axios from "axios";

export function EspacioItem({ espacio, token, usuario, onDelete }) {

    const navigate = useNavigate()

    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)

    const irAlTablero = () => {
        navigate('/tablero', {state: { token : token, user : usuario, espacio : espacio }})
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/espacios/${espacio.id}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            if (response.status === 204) { // Estado 204 para "No Content", es decir, eliminado correctamente
                onDelete(espacio.id);
            } else {
                console.log("No se pudo eliminar el espacio.");
            }
        } catch (error) {
            console.error("Error al eliminar el espacio:", error);
        }
    };

    return (
        <div className="flex justify-between items-center bg-[#F5FF70] border-[3px] shadow-[.2rem_.2rem_#121212] border-[#121212] hover:shadow-[.4rem_.4rem_#121212] hover:cursor-pointer duration-150  w-full">
            <div 
            onClick={irAlTablero}
            className="py-4 w-full h-full">
                <h3 className="ml-4 montserrat-semibold">{espacio.nombre}</h3>
            </div>

            <button 
                className="w-8 h-8 mr-4 bg-slate-300 rounded hover:bg-slate-200 flex items-center justify-center"
                onClick={() => setMostrarModalEliminar(true)}>
                    <span className="text-lg">⋮</span>
            </button>


            <Modal isOpen={mostrarModalEliminar} onClose={() => setMostrarModalEliminar(false)}>
                <h3 className="montserrat-semibold">Acciones</h3>
                <button
                    onClick={() => {
                        handleDelete()
                        setMostrarModalEliminar(false)
                    }} 
                    className="bg-[#ff8686] mt-4 hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full">
                        Eliminar espacio
                </button>

                <button onClick={() => setMostrarModalEliminar(false)} className="mt-2 bg-gray-200 p-2 rounded">X</button>
            </Modal>

        </div>
    )
}