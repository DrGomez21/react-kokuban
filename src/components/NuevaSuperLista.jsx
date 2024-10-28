import React, { useState } from 'react';
import { Tarjeta } from "./Tarjeta";
import { Modal } from "./Modal";

export function Lista({ titulo, tareas, cant_max, onAgregarTarea, onEliminarLista, onActualizarTitulo }) {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarAcciones, setMostrarAcciones] = useState(false);
    const [mostrarEditarTitulo, setMostrarEditarTitulo] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
    const [maxTarjetas, setMaxTarjetas] = useState(5);
    const [nuevaTarea, setNuevaTarea] = useState({
        title: '',
        description: '',
        tags: [],
        assignedTo: ''
    });
    const [nuevaEtiqueta, setNuevaEtiqueta] = useState('');

    const agregarTarea = () => {
        if (nuevaTarea.title && nuevaTarea.description && tareas.length < maxTarjetas) {
            onAgregarTarea({ ...nuevaTarea, id: Date.now() });
            setNuevaTarea({ title: '', description: '', tags: [], assignedTo: '' });
            setMostrarModal(false);
        }
    };

    const descartarTarea = () => {
        setNuevaTarea({ title: '', description: '', tags: [], assignedTo: '' });
        setMostrarModal(false);
    };

    const agregarEtiqueta = () => {
        if (nuevaEtiqueta && !nuevaTarea.tags.includes(nuevaEtiqueta)) {
            setNuevaTarea({...nuevaTarea, tags: [...nuevaTarea.tags, nuevaEtiqueta]});
            setNuevaEtiqueta('');
        }
    };

    const eliminarEtiqueta = (tagToRemove) => {
        setNuevaTarea({
            ...nuevaTarea, 
            tags: nuevaTarea.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const guardarNuevoTitulo = () => {
        if (nuevoTitulo.trim()) {
            onActualizarTitulo(titulo, nuevoTitulo.trim());
            setMostrarEditarTitulo(false);
        }
    };

    const isListaLlena = tareas.length >= maxTarjetas;

    return (
        <div className={`bg-white min-w-64 shadow-[.5rem_.5rem_#121212] border-4 border-[#121212] p-4 w-80 ${isListaLlena ? 'border-red-500' : ''}`}>
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
            
            <div className="space-y-4">
                {tareas.map(tarea => (
                    <Tarjeta 
                        key={tarea.id}
                        title={tarea.title}
                        description={tarea.description}
                        tags={tarea.tags}
                        assignedTo={tarea.assignedTo}
                    />
                ))}

                {!isListaLlena && (
                    <button
                        onClick={() => setMostrarModal(true)}
                        className="bg-[#FFE500] shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full"
                        type="submit"
                    >
                        + Nueva tarea
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
                            onEliminarLista();
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
                        onClick={guardarNuevoTitulo}
                        className="bg-[#9eb0ff] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
                    >
                        Guardar
                    </button>
                </div>
            </Modal>

            {/* Modal de Nueva Tarea */}
            <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
                <h3 className="text-lg montserrat-bold mb-4">Agregar Nueva Tarea</h3>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Título"
                        value={nuevaTarea.title}
                        onChange={(e) => setNuevaTarea({...nuevaTarea, title: e.target.value})}
                        className="p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <textarea
                        placeholder="Descripción"
                        value={nuevaTarea.description}
                        onChange={(e) => setNuevaTarea({...nuevaTarea, description: e.target.value})}
                        className="p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                        type="text"
                        placeholder="Asignado a"
                        value={nuevaTarea.assignedTo}
                        onChange={(e) => setNuevaTarea({...nuevaTarea, assignedTo: e.target.value})}
                        className="p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Nueva etiqueta"
                            value={nuevaEtiqueta}
                            onChange={(e) => setNuevaEtiqueta(e.target.value)}
                            className="flex-grow p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button onClick={agregarEtiqueta} className="bg-[#B2FF9E] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none">
                            Agregar
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {nuevaTarea.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                                {tag}
                                <button onClick={() => eliminarEtiqueta(tag)} className="ml-2 text-red-500 font-bold">
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4">
                        <button onClick={descartarTarea} className="bg-[#ff9292] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none">
                            Descartar
                        </button>
                        <button onClick={agregarTarea} className="bg-[#9eb0ff] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none">
                            Guardar Tarea
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}