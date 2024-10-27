import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "./Modal"
import axios from "axios";
import { toast } from "react-hot-toast";

export function TableroItem({ espacio, tablero, token, usuario, onDelete }) {

    const navigate = useNavigate()

    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)

    const irAlTablero = () => {
        navigate('/tablero', {state: { token : token, user : usuario, espacio : espacio, tab : tablero }})
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/tableros/${tablero.id}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            if (response.status === 204) { // Estado 204 para "No Content", es decir, eliminado correctamente
                onDelete(tablero.id);
                toast.success("Tablero eliminado con éxito")
            } else {
                console.log("No se pudo eliminar el espacio.");
            }
        } catch (error) {
            console.error("Error al eliminar el espacio:", error);
        }
    };

    return (
        <div className="flex justify-between items-center bg-[#70b3ff] border-[3px] shadow-[.2rem_.2rem_#121212] border-[#121212] hover:shadow-[.4rem_.4rem_#121212] hover:cursor-pointer duration-150  w-full">
            <div 
            onClick={irAlTablero}
            className="py-4 w-full h-full">
                <h3 className="ml-4 montserrat-semibold">{tablero.nombre_tablero}</h3>
            </div>

            <button 
                className="w-8 h-8 mr-4 bg-slate-300 rounded hover:bg-slate-200 flex items-center justify-center"
                onClick={() => setMostrarModalEliminar(true)}>
                    <span className="text-lg">⋮</span>
            </button>


            <Modal isOpen={mostrarModalEliminar} onClose={() => setMostrarModalEliminar(false)}>
                
                <div className="flex justify-between items-center">
                    <h3 className="montserrat-semibold">Acciones</h3>
                    <button 
                        onClick={() => setMostrarModalEliminar(false)} 
                        className="bg-[#AE84F7] text-white border-2 border-[#121212] montserrat-medium p-1 h-12 shadow-[.1rem_.1rem_#121212] duration-150"
                    >
                        X
                    </button>
                </div>
                
                <button
                    onClick={() => {
                        handleDelete()
                        setMostrarModalEliminar(false)
                    }} 
                    className="bg-[#ff8686] mt-4 hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none">
                        Eliminar tablero
                </button>

            </Modal>

        </div>
    )
}