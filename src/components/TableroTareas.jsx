import React, { useEffect, useState } from 'react';
import { Lista } from './NuevaSuperLista';
import { Modal } from "../components/Modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export function TableroTareas({ token, tablero, usuario, espacio }) {

    const [listas, setListas] = useState([]);
    const [tasks, setTasks] = useState([])
    const [tarjetas, setTarjetas] = useState([])
    const [activeCard, setActiveCard] = useState(null)
    const [usuariosDelEspacio, setUsuariosDelEspacio] = useState([])

    const [mostrarModalNuevaLista, setMostrarModalNuevaLista] = useState(false);

    const [tarjetasSinFiltrar, setTarjetasSinFiltrar] = useState([])

    const { register, handleSubmit } = useForm()

    const getData = async () => {
        try {
            const [columnas, tarjetitas, columnaTarjetas, usuarioEspacio] = await Promise.all([
                axios.get('http://localhost:8000/api/estados/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                }),
                axios.get('http://localhost:8000/api/tarjetas/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                }),
                axios.get('http://localhost:8000/api/estadoTarjetas/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                }),
                axios.get('http://localhost:8000/api/usuarioEspacios/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                })
            ])

            // Filtrar las columnas por el tablero actual.
            const columnasDelTablero = columnas.data.filter(columna => columna.tablero === tablero)

            // Obtener de la tabla intermedia solo las filas necesarias.
            const matchcolumaTarjeta = columnaTarjetas.data.filter(ct =>
                columnasDelTablero.some(c => ct.estado === c.id)
            )

            setListas(columnasDelTablero)
            setTasks(matchcolumaTarjeta)
            setTarjetas(tarjetitas.data)

            setUsuariosDelEspacio(
                usuarioEspacio.data.filter(res => res.espacio === espacio.id)
            )
        } catch (error) {
            console.error(error)
        }
    }

    // Mediante esta función se podrán agregar listas nuevas al tablero.
    const agregarNuevaLista = handleSubmit(async data => {
        try {
            const listaCreada = {
                nombre: data.nombre,
                cant_maxima: 5,
                tablero: tablero
            }

            const response = await axios.post('http://localhost:8000/api/estados/', listaCreada, {
                headers: { Authorization: `Token ${token}` }
            })
            if (response.status === 201) {
                toast.success('Exitoso')
                setMostrarModalNuevaLista(false)

                // Actualizar la UI.
                setListas(prevListas => [...prevListas, response.data]);
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    });

    const handleEliminarLista = (listaId) => {
        setListas(prevListas => prevListas.filter(lista => lista.id !== listaId))
    }

    const getEstadoTarjeta = (cardId) => {
        const estadoTarjeta = tasks.find(t => t['tarjeta'] === cardId)
        return estadoTarjeta.id
    }

    const onDrag = async (estado) => {
        try {
            const update = {
                estado: estado,
                tarjeta: activeCard,
                fecha_inicio_estado: new Date().toISOString()
            }

            const estadoTareaId = getEstadoTarjeta(activeCard)

            const response = await axios.put(`http://127.0.0.1:8000/api/estadoTarjetas/${estadoTareaId}/`,
                update, { headers: { Authorization: `Token ${token}` } }
            )

            setTasks(prevTareas =>
                prevTareas.map(tarea =>
                    tarea.id === response.data.id
                        ? { ...tarea, estado: response.data.estado, fecha_inicio_estado: response.data.fecha_inicio_estado }
                        : tarea
                )
            );

        } catch (error) {
            console.log(error)
        }
    }

    const eliminarTarjeta = async (tarjetaId) => {
        try {
            const tarjetaEliminada = tarjetaId

            const response = await axios.delete(
                `http://localhost:8000/api/tarjetas/${tarjetaId}/`,
                {
                    headers: { Authorization: `Token ${token}` },
                },
            );

            if (response.status === 204) {
                toast.success('Eliminada')
                setTasks(prevTasks => prevTasks.filter(task => task.tarjeta !== tarjetaEliminada))
                setTarjetas(prevTarjetas => prevTarjetas.filter(tarjeta => tarjeta.id !== tarjetaEliminada))
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="h-auto mr-6 ml-6">
            <div className="flex overflow-x-auto overflow-y-hidden gap-6 pb-6">
                {listas.map(lista => (
                    <Lista
                        key={lista.id}
                        listaId={lista.id}
                        tareas={tasks}
                        token={token}
                        allTasks={tarjetas}
                        cant_max={lista.cant_maxima}
                        usuario={usuario}
                        lista={lista}
                        usuariosDelEspacio={usuariosDelEspacio}
                        onEliminarLista={handleEliminarLista}
                        setActiveCard={setActiveCard}
                        onDrop={onDrag}
                        setEstadoTarjetas={setTasks}
                        setTarjetas={setTarjetas}
                        onEliminarTarjeta={eliminarTarjeta}
                    />
                ))}

                {/* Botón para nuevas listas */}
                <button
                    onClick={() => setMostrarModalNuevaLista(true)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center min-w-[200px] h-[50px] justify-center"
                >
                    + Agregar nueva lista
                </button>
            </div>

            <Modal isOpen={mostrarModalNuevaLista} onClose={() => setMostrarModalNuevaLista(false)}>

                <div className='p-6'>
                    <div className='flex justify-between content-center mb-4'>
                        <h3 className="text-lg montserrat-semibold">Agregar Nueva Lista</h3>
                        <button
                            onClick={() => setMostrarModalNuevaLista(false)}
                            className="text-red-400 montserrat-medium hover:scale-110 transition duration-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" /><path d="M9 9l6 6m0 -6l-6 6" /></svg>
                        </button>

                    </div>

                    <form onSubmit={agregarNuevaLista} className="mt-4">
                        <input
                            type="text"
                            id='nombre'
                            placeholder="Nombre de la lista"
                            className="w-full p-2 border rounded mb-4"
                            {...register("nombre", { required: true })}
                        />
                        <div className="flex justify-center">

                            <button
                                onClick={agregarNuevaLista}
                                className="px-4 py-2 bg-green-300 shadow-[.1rem_.1rem_#121212] text-[#121212] montserrat-semibold border-2 border-[#121212] transition duration-100 hover:shadow-[.4rem_.4rem_#121212] hover:bg-green-400 w-full"
                            >
                                Agregar Lista
                            </button>
                        </div>
                    </form>

                </div>

            </Modal>

        </div>
    );
}