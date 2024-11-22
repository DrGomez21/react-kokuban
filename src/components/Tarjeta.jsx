
export function Tarjeta({ tarea, assignedTo, onClick, setActiveCard }) {


  return (

    // TODO: COLOCAR LA CONDICIÓN DE COLOR POR FECHA DE VENCIMIENTO
    <div
      className={`bg-[#F5FF70] border-[3px] border-[#121212] hover:shadow-[.4rem_.4rem_#121212] hover:cursor-pointer duration-150 
            p-4 w-full shadow-md relative
            active:opacity-75 active:rounded-lg`}
      onClick={onClick}
      draggable
      onDragStart={() => setActiveCard(tarea.id)}
      onDragEnd={() => setActiveCard(null)}
    >
      <h2 className="text-lg montserrat-semibold mb-1">{tarea.nombre_actividad}</h2>
      <p className="text-sm mb-4">{tarea.descripcion}</p>
      <div className="flex flex-wrap gap-2 ">
        <span className="bg-[#4F1DDE] text-white border border-[#121212] px-2 py-1 rounded-sm text-xs montserrat-regular">
          {tarea.etiqueta}
        </span>
      </div>
      {assignedTo && (
        <div className="bg-[#F0CA81] px-2 mt-1 w-auto py-1 rounded-full text-xs montserrat-regular border border-[#121212]">
          {assignedTo}
        </div>
      )}
    </div>
  );
}
