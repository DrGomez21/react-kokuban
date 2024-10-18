import React, { useState } from 'react';
import { Lista } from './SuperLista';

export function TableroTareas() {
    const [listas, setListas] = useState([
        { id: 1, titulo: "Por hacer", tareas: [] },
        { id: 2, titulo: "En progreso", tareas: [] },
        { id: 3, titulo: "Terminado", tareas: [] },
    ]);

    const agregarTareaALista = (listaId, nuevaTarea) => {
        setListas(listas.map(lista => 
            lista.id === listaId 
                ? { ...lista, tareas: [...lista.tareas, nuevaTarea] }
                : lista
        ));
    };

    return (
        <div className="flex space-x-4 p-4">
            {listas.map(lista => (
                <Lista
                    key={lista.id}
                    titulo={lista.titulo}
                    tareas={lista.tareas}
                    onAgregarTarea={(tarea) => agregarTareaALista(lista.id, tarea)}
                />
            ))}
        </div>
    );
}