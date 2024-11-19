import React, { useState } from 'react';
import { Tarjeta } from "./Tarjeta";
import { Modal } from "./Modal";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DetallesTarjeta } from "../components/DetallesTarjeta";
import { DropArea } from './DropArea';

export function Lista({
    listaId, token, titulo, tareas, cant_max,
    allTasks, usuario, onEliminarLista, onActualizarTitulo, setActiveCard,
    onDrop, setEstadoTarjetas, setTarjetas
}) {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarAcciones, setMostrarAcciones] = useState(false);
    const [mostrarEditarTitulo, setMostrarEditarTitulo] = useState(false);

    const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
    const [maxTarjetas, setMaxTarjetas] = useState(cant_max);

    const [mostrarDetalleTarjeta, setMostrarDetalleTarjeta] = useState(false)
    const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);
    const [subtareas, setSubtareas] = useState([])

    const { register, handleSubmit } = useForm()


    const getTarea = (idTarea) => {
        return allTasks.find(t => t['id'] === idTarea)
    }

    const postNuevaTarea = handleSubmit(async (data) => {
        try {
            const tareaCreada = {
                nombre_actividad: data.nombre_actividad,
                descripcion: data.descripcion,
                etiqueta: data.etiqueta,
                fecha_creacion: new Date(data.inicioTarea).toISOString(),
                fecha_vencimiento: new Date(data.finTarea).toISOString(),
                creador_tarjeta: usuario.id
            }

            const response = await axios.post('http://localhost:8000/api/tarjetas/', tareaCreada, {
                headers: { Authorization: `Token ${token}` }
            })

            await insertarUnion(response.data)

        } catch (error) {
            console.log(error)
        }
    })

    const insertarUnion = async (tarjetaNueva) => {

        try {
            const unionObj = {
                estado: listaId,
                tarjeta: tarjetaNueva.id,
                fecha_inicio_estado: tarjetaNueva.fecha_creacion
            }

            const union = await axios.post('http://localhost:8000/api/estadoTarjetas/', unionObj, { headers: { Authorization: `Token ${token}` } })
            if (union.status === 201) {
                toast.success('Tenemos una nueva tarjeta ✨')
                console.log(union.data)
                setEstadoTarjetas(prevTareas => [...prevTareas, union.data])
                setTarjetas(prevTarjetero => [...prevTarjetero, tarjetaNueva])
            }
            setMostrarModal(false);

        } catch (error) {
            console.log(error)
            setMostrarModal(false);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/estados/${listaId}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            if (response.status === 204) { // Estado 204 para "No Content", es decir, eliminado correctamente
                onEliminarLista(listaId);
                toast.success("La lista fue eliminada")
            } else {
                console.log("No se pudo eliminar la Lista.");
            }
        } catch (error) {
            console.error("Error al eliminar la lista:", error);
        }
    };

    const abrirDetallesTarjeta = async (tarea) => {
        setTarjetaSeleccionada(tarea);
        await getSubtareas(tarea.id)
        setMostrarDetalleTarjeta(true);
    };

    const getSubtareas = async (idTarea) => {
        const response = await axios.get('http://localhost:8000/api/subtareas/', {
            headers: { Authorization: `Token ${token}` }
        })

        setSubtareas(response.data.filter(listaSubtareas => listaSubtareas.tarjeta === idTarea))
    }

    const postNuevaSubtarea = async (descripcion, fechaVencimiento) => {
        try {
            const subtarea = {
                descripcion: descripcion,
                estado_subtarea: false,
                fecha_vencimiento: new Date(fechaVencimiento).toISOString(),
                tarjeta: tarjetaSeleccionada.id
            }

            const response = await axios.post('http://localhost:8000/api/subtareas/', subtarea, {
                headers: { Authorization: `Token ${token}` }
            })

            if (response.status === 201) {
                toast.success('Tenemos una nueva subtarea ✨')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const isListaLlena = false
    return (
        <div className={`bg-white h-auto min-w-64 shadow-[.5rem_.5rem_#121212] border-4 border-[#121212] p-4 w-80 ${isListaLlena ? 'border-red-500' : ''}`}>

            {isListaLlena && (
                <span className="block w-full text-center text-red-500 font-bold mb-2">
                    Lleno
                </span>
            )}

            <div className="flex justify-between items-center py-2 mb-4">
                <h4 className="montserrat-bold text-2xl mr-1">{titulo}</h4>
                <button
                    className="w-8 h-8 bg-slate-300 rounded hover:bg-slate-200 flex items-center justify-center"
                    onClick={() => setMostrarAcciones(true)}>
                    <span className="text-lg">⋮</span>
                </button>
            </div>

            <div className="space-y-2">

                {tareas.map(tarea => {
                    const tarjeta = getTarea(tarea.tarjeta);
                    if (tarea.estado === listaId) {
                        return (
                            <React.Fragment key={tarjeta.id}>
                                <Tarjeta
                                    key={Date.now()}
                                    tarea={tarjeta}
                                    assignedTo="asignado"
                                    onClick={() => abrirDetallesTarjeta(tarjeta)}
                                    setActiveCard={setActiveCard}
                                />
                                <DropArea onDrop={() => onDrop(listaId)} />
                            </React.Fragment>

                        );
                    }
                    return null; // Si la condición no se cumple, no se renderiza nada
                })}

                <DropArea onDrop={() => onDrop(listaId)} />
                {!isListaLlena && (
                    <button
                        onClick={() =>
                            setMostrarModal(true)

                        }
                        className="bg-[#FFE500] shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full"
                        type="submit"
                    >
                        + Nueva tarjeta
                    </button>
                )}
            </div>

            {/* Modal de Acciones */}
            <Modal isOpen={mostrarAcciones} onClose={() => setMostrarAcciones(false)}>
                <h3 className="text-lg montserrat-bold mb-4">Acciones de la Lista</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => {
                            setMostrarAcciones(false);
                            setMostrarEditarTitulo(true);
                        }}
                        className="bg-blue-500 text-white py-2 px-4 rounded-sm mb-2 w-full"
                    >
                        Cambiar nombre
                    </button>
                    <div className="flex items-center space-x-2 mb-2">
                        <label className="flex-grow">Máximo de tarjetas:</label>
                        <input
                            type="number"
                            value={maxTarjetas}
                            onChange={(e) => setMaxTarjetas(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-20 p-1 border border-gray-300 rounded"
                            min="1"
                        />
                    </div>
                    <button
                        onClick={() => {
                            handleDelete();
                            setMostrarAcciones(false);
                        }}
                        className="bg-red-500 text-white py-2 px-4 rounded-sm w-full"
                    >
                        Eliminar Lista
                    </button>
                    <button
                        onClick={() => setMostrarAcciones(false)}
                        className="bg-gray-500 text-white py-2 px-4 rounded-sm w-full"
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>

            {/* Modal de Editar Título */}
            <Modal isOpen={mostrarEditarTitulo} onClose={() => setMostrarEditarTitulo(false)}>
                <h3 className="text-lg montserrat-bold mb-4">Editar nombre de la lista</h3>
                <input
                    type="text"
                    value={nuevoTitulo}
                    onChange={(e) => setNuevoTitulo(e.target.value)}
                    className="p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <div className="flex justify-between">
                    <button
                        onClick={() => {
                            setNuevoTitulo(titulo);
                            setMostrarEditarTitulo(false);
                        }}
                        className="bg-[#ff9292] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => { }}
                        className="bg-[#9eb0ff] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
                    >
                        Guardar
                    </button>
                </div>
            </Modal>

            {/* Modal de Nueva Tarea */}
            <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
                <div className='p-5 mt-3'>
                    <h3 className="text-lg montserrat-bold mb-4">Agregar Nueva Tarea</h3>

                    <form onSubmit={postNuevaTarea}>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Título"
                                id='nombre_actividad'
                                className="p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("nombre_actividad", { required: true })}
                            />
                            <textarea
                                placeholder="Descripción"
                                id='descripcion'
                                className="p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("descripcion", { required: true })}
                            />
                            <input
                                type="text"
                                placeholder="Asignado a"
                                id='asignado'
                                className="p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("asignado", { required: true })}
                            />
                            <input
                                type="text"
                                placeholder="Nueva etiqueta"
                                id='etiqueta'
                                className="flex-grow p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("etiqueta", { required: true })}
                            />

                            <label className='text-sm montserrat-medium mr-2' htmlFor="incioTarea">Inicio:</label>
                            <input
                                type="date"
                                name="inicioTarea"
                                id="inicioTarea"
                                {...register("inicioTarea", { required: true })}
                            /> <br />

                            <label className='text-sm montserrat-medium mr-2' htmlFor="finTarea">Fin:</label>
                            <input
                                type="date"
                                name="finTarea"
                                id="finTarea"
                                {...register("finTarea", { required: true })}
                            /> <br />

                            <button
                                type="submit"
                                className="items-center bg-[#9eb0ff] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
                            >
                                Guardar Tarea
                            </button>
                        </div>
                    </form>

                    <button
                        onClick={() => setMostrarModal(false)}
                        className="mt-4 bg-[#ff9292] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
                    >
                        Descartar
                    </button>
                </div>


            </Modal>

            {/* Modal que se abre al presionar una tarjeta. */}
            <Modal isOpen={mostrarDetalleTarjeta} onClose={() => setMostrarDetalleTarjeta(false)}>
                {tarjetaSeleccionada && (
                    <DetallesTarjeta
                        tarjeta={tarjetaSeleccionada}
                        onClose={() => setMostrarDetalleTarjeta(false)}
                        listaSubtareas={subtareas}
                        onInsert={postNuevaSubtarea}
                    />
                )}
            </Modal>

        </div>
    )
}