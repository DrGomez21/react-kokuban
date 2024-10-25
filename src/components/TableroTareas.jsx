import React, { useState } from 'react';
import { Lista } from './NuevaSuperLista';
import { Modal } from "../components/Modal";

export function TableroTareas() {
    const [listas, setListas] = useState([
        { id: 1, titulo: "Por hacer", tareas: [] },
        { id: 2, titulo: "En progreso", tareas: [] },
        { id: 3, titulo: "Terminado", tareas: [] },
    ]);

    const [mostrarModalNuevaLista, setMostrarModalNuevaLista] = useState(false);
    const [nuevaListaNombre, setNuevaListaNombre] = useState('');

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

    return (
        <div className="h-auto  p-6 mr-6 ml-6 max-w-screen-lg">
            <div className="flex overflow-x-auto overflow-y-hidden gap-6 pb-6">
                {listas.map(lista => (
                    <Lista
                        key={lista.id}
                        titulo={lista.titulo}
                        tareas={lista.tareas}
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