import React, {useState} from 'react';

export function DetallesTarjeta({ tarjeta, onClose }) {
  
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [tareas, setTareas] = useState(tarjeta.tasks || []);
  
  const getUserName = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/`, {
            headers: { Authorization: `Token ${token}` }
        })

        return response.data.username
    } catch (error) {
        return ""
    }
  }

  return (
    <div className="bg-[#F5FF70] p-5 w-full">
      <h2 className="text-xl justify-self-start montserrat-bold mt-3 mb-1">{tarjeta.nombre_actividad}</h2>
      
      <div className="mb-4">
            <span className="bg-[#956fff] text-white border border-[#121212] px-2 py-1 rounded-sm text-xs montserrat-regular">
              {tarjeta.etiqueta}
            </span>
      </div>
      
      <div className="mb-4">
        <h3 className="montserrat-semibold justify-self-start mb-2">Descripción</h3>
        <p className="bg-white shadow-[.2rem_.2rem_#121212] border-2 text-left border-[#121212] p-2 max-w-sm">
          {tarjeta.descripcion}
        </p>
      </div>
{/*       
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Task</h3>
        <div className="space-y-2">
          {tareas.map((tarea, index) => (
            <div key={index} className="flex items-center bg-white p-2 rounded">
              <input 
                type="checkbox" 
                checked={tarea.completed} 
                onChange={() => toggleTarea(index)}
                className="mr-2" 
              />
              <span>{tarea.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nueva tarea"
            className="flex-grow p-2 rounded-l"
          />
          <button 
            onClick={agregarTarea}
            className="bg-green-500 text-white px-3 py-2 rounded-r hover:bg-green-600"
          >
            Agregar tarea
          </button>
        </div>
      </div>
       */}
      
      <h3 className='justify-self-start mb-4 montserrat-semibold'>Detalles</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="bg-[#F0CA81] p-2 rounded-sm text-sm montserrat-medium border border-[#121212] mb-2">
          Creador: Creador
          </div>
          <div className="bg-[#F0CA81] p-2 rounded-sm text-sm montserrat-medium border border-[#121212]">
            Asignado a: Asignado
          </div>
        </div>
        <div>
          <div className="bg-blue-200 p-2 border border-[#121212] montserrat-medium text-sm rounded-sm mb-2">
            {/* Desde: {tarjeta.startDate} */}
            From: {tarjeta.fecha_creacion.split('T')[0]}
          </div>
          <div className="bg-red-200 p-2 border border-[#121212] montserrat-medium text-sm rounded-sm">
            To: {tarjeta.fecha_vencimiento.split('T')[0]}
          </div>
        </div>
      </div>
      
      <button 
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        onClick={onClose}
      >
        Cerrar
      </button>
    </div>
  );
}