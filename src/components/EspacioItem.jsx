import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "./Modal"
import axios from "axios";
import { useForm } from "react-hook-form";

export function EspacioItem({ espacio, token, usuario, onDelete, mostrarOpciones, allUsers, onShare }) {

    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()

    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)

    const irAlTablero = () => {
        navigate('/tabs', { state: { token: token, user: usuario, espacio: espacio } })
    }

    const llamarACompartir = handleSubmit(async (data) => {
        await onShare(espacio.id, data.selectedOption)
    })

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
                <h3 className="pl-2 montserrat-semibold">{espacio.nombre}</h3>
            </div>

            <button
                className={`${mostrarOpciones ? 'w-8 h-8 mr-4 bg-slate-300 rounded hover:bg-slate-200 flex items-center justify-center' : 'invisible'}`}
                onClick={() => setMostrarModalEliminar(true)}>
                <span className="text-lg">⋮</span>
            </button>


            <Modal isOpen={mostrarModalEliminar} onClose={() => setMostrarModalEliminar(false)}>

                <div className="px-5 py-3">
                    <div className='flex justify-between content-center p-2 mb-4'>
                        <h3 className="text-lg montserrat-bold">Acciones del espacio</h3>
                        <button
                            onClick={() => setMostrarModalEliminar(false)}
                            className="text-red-400 montserrat-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" /><path d="M9 9l6 6m0 -6l-6 6" /></svg>
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            handleDelete()
                            setMostrarModalEliminar(false)
                        }}
                        className="bg-[#ff8686] mt-4 hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full">
                        Eliminar espacio
                    </button>

                    <form onSubmit={llamarACompartir}>
                        <div className="mt-4 py-2 items-center flex gap-2">
                            <label htmlFor="option" className="montserrat-medium text-sm mr-2">Compartir:</label>
                            <select
                                id="option"
                                className="px-2 py-1 bg-white border border-[#121212] hover:cursor-pointer"
                                {...register("selectedOption")}
                            >
                                <option className="montserrat-regular" value="">Nadie...</option>
                                {
                                    allUsers.map((user) => (
                                        <option className="montserrat-regular" key={user.id} value={user.id}>{user.username}</option>
                                    ))
                                }

                            </select>

                            <button
                                className="flex gap-2 justify-center bg-[#B2FF9E] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
                                type="submit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                    <path d="M16 19h6" />
                                    <path d="M19 16v6" />
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                                </svg>
                                Compartir
                            </button>
                        </div>
                    </form>

                </div>

            </Modal>

        </div>
    )
}