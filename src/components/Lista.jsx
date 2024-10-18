import { Tarjeta } from "./Tarjeta";


export function Lista() {
    return (
        <div className="bg-white shadow-[.5rem_.5rem_#121212] border-4 border-[#121212] p-4 max-w-sm">
            <div className="flex justify-between items-center py-2 mb-4">
                <h4 className="montserrat-bold text-2xl">Todo</h4>
                <button className="w-8 h-8 border-1 rounded hover:bg-slate-200 flex items-center justify-center">
                    <span className="text-lg">⋮</span>
                </button>
            </div>
            
            <div className="space-y-4 px-4">
                <Tarjeta 
                    title="Título"
                    description="Descripción de máximo 2 líneas. Hasta acá."
                    tags={['Web', 'React', 'Mobile']}
                    assignedTo="Ramoooon"
                />

                <Tarjeta 
                    title="Título"
                    description="Descripción de máximo 2 líneas. Hasta acá."
                    tags={['Web', 'React']}
                    assignedTo="Ramoooon"
                />

                <button
                    className="bg-[#FFE500] shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full"
                    type="submit"
                >
                    + Agregar nueva tarea
                </button>
            </div>
            
        </div>
    )
}