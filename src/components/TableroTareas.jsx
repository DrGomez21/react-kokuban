import React, { useEffect, useState } from 'react';
import { Lista } from './NuevaSuperLista';
import { Modal } from "../components/Modal";
import axios from "axios";
import { set } from 'react-hook-form';

export function TableroTareas({token, tablero}) {
    
    const [listas, setListas] = useState([]);
    const [tasks, setTasks] = useState([])

    const [mostrarModalNuevaLista, setMostrarModalNuevaLista] = useState(false);
    const [nuevaListaNombre, setNuevaListaNombre] = useState('');

    const getData = async () => {
        try {
            const [columnas, tarjetas, columnaTarjetas] = await Promise.all([
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
                })
            ])
            /**
             * Response de columnas:
             * [{
    "id": 1,
    "nombre": "Por hacer",
    "cant_maxima": 3,
    "tablero": 1
  },
  {
    "id": 2,
    "nombre": "Haciendo",
    "cant_maxima": 3,
    "tablero": 1
  },
  {
    "id": 3,
    "nombre": "Terminado",
    "cant_maxima": 3,
    "tablero": 1
  },
  {
    "id": 4,
    "nombre": "TESTER",
    "cant_maxima": 5,
    "tablero": 3
  },
  {
    "id": 5,
    "nombre": "TEST 2",
    "cant_maxima": 4,
    "tablero": 3
  }
]

                Respuesta de Tarjetas:
                [{
    "id": 2,
    "nombre_actividad": "Tarea desde postman",
    "descripcion": "Tarea creada desde el cliente Thunder",
    "etiqueta": "urgente",
    "fecha_creacion": "2024-10-20T18:56:41.742198Z",
    "fecha_vencimiento": "2024-10-25T17:48:18Z",
    "creador_tarjeta": 3
  },
  {
    "id": 4,
    "nombre_actividad": "Probando nuevo",
    "descripcion": "Descripción de la activiad",
    "etiqueta": null,
    "fecha_creacion": "2024-10-27T19:54:31.854875Z",
    "fecha_vencimiento": "2024-10-31T17:48:18Z",
    "creador_tarjeta": 11
  },
  {
    "id": 5,
    "nombre_actividad": "Seguimos",
    "descripcion": "Descripción de la activiad",
    "etiqueta": "op",
    "fecha_creacion": "2024-10-28T00:06:54.436058Z",
    "fecha_vencimiento": "2024-10-31T17:48:18Z",
    "creador_tarjeta": 11
        }]

            Respuesta de columnaTarjetas
            [
              {
    "id": 2,
    "fecha_inicio_estado": "2024-10-31T17:48:18Z",
    "fecha_fin_estado": null,
    "estado": 4,
    "tarjeta": 4
  },
  {
    "id": 3,
    "fecha_inicio_estado": "2024-10-31T17:48:18Z",
    "fecha_fin_estado": null,
    "estado": 5,
    "tarjeta": 5
  }
]
             */

            // Filtrar las columnas por el tablero actual.
            const columnasDelTablero = columnas.data.filter(columna => columna.tablero === tablero)

            // Obtener de la tabla intermedia solo las filas necesarias.
            const matchcolumaTarjeta = columnaTarjetas.data.filter(ct =>
                columnasDelTablero.some(c => ct.estado === c.id)
            )
        
            // Gracias al match anterior, traer solo las tarjetas necesarias para este tablero.
            const tarjetasDelTablero = tarjetas.data.filter(t =>
                matchcolumaTarjeta.some(m => t.id === m.tarjeta)
            )

            const listaFinal = matchcolumaTarjeta.filter(m =>
                columnasDelTablero.some(c => m.estado === c.id ) &&
                tarjetasDelTablero.some(t => t.id === m.tarjeta )
            )

            // Los 3 arrays de datos por separado ya se encuentran.
            // Ahora se deben de juntar. VAMOS A POR ELLO.
            
            console.log(listaFinal)

        } catch (error) {
            console.error(error)
        }
    }

    const agregarTareaALista = (listaId, nuevaTarea) => {
        setListas(listas.map(lista => 
            lista.id === listaId 
                ? { ...lista, tareas: [...lista.tareas, nuevaTarea] }
                : lista
        ));
    };

    // Mediante esta función se podrán agregar listas nuevas al tablero.
    const agregarNuevaLista = () => {
        if (nuevaListaNombre.trim()) {
            const nuevaLista = {
                id: Date.now(),
                titulo: nuevaListaNombre.trim(),
                tareas: []
            };
            setListas([...listas, nuevaLista]);
            setNuevaListaNombre('');
            setMostrarModalNuevaLista(false);
        }
    };

    const eliminarLista = (listaId) => {
        setListas(listas.filter(lista => lista.id !== listaId));
    };

    const actualizarTarea = (tituloLista, tareaActualizada) => {
        setListas(listas.map(lista => 
          lista.titulo === tituloLista
            ? { ...lista, tareas: lista.tareas.map(tarea => 
                tarea.id === tareaActualizada.id ? tareaActualizada : tarea
              )}
            : lista
        ));
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="h-auto  p-6 mr-6 ml-6 max-w-screen-lg">
            <div className="flex overflow-x-auto overflow-y-hidden gap-6 pb-6">
                {listas.map(lista => (
                    <Lista
                        key={lista.id}
                        titulo={lista.nombre}
                        tareas={[]}
                        cant_max={lista.cant_maxima}
                        onAgregarTarea={(tarea) => agregarTareaALista(lista.id, tarea)}
                        onEliminarLista={() => eliminarLista(lista.id)}
                        onActualizarTarea={actualizarTarea}
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
                <h3 className="text-lg font-semibold mb-4">Agregar Nueva Lista</h3>
                <input
                    type="text"
                    placeholder="Nombre de la lista"
                    value={nuevaListaNombre}
                    onChange={(e) => setNuevaListaNombre(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-between">
                    <button 
                        onClick={() => setMostrarModalNuevaLista(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={agregarNuevaLista}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Agregar Lista
                    </button>
                </div>
            </Modal>

        </div>
    );
}