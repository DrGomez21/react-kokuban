import { TableroTareas } from "../components/TableroTareas";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Estadisticas } from "../components/Estadisticas";
import { EstadisticaAsignados } from "../components/EstadisticaAsignados";

export function KanbanPage() {

    const location = useLocation()
    const token = location.state?.token || "" // Obtener el token como cadena de texto
    const usuario = location.state?.user
    const espacio = location.state?.espacio
    const tablero = location.state?.tab

    const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);

    return (

        <div className="container mx-auto">

            <Header user={usuario} nombreEspacio={espacio.nombre} />

            <button
                onClick={() => setMostrarEstadisticas(!mostrarEstadisticas)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
                {mostrarEstadisticas ? "Ocultar estadísticas" : "Ver estadísticas"}
            </button>

            <div className="justify-center mx-12 mt-6">
                <TableroTareas token={token} tablero={tablero.id} usuario={usuario} espacio={espacio} />
            </div>

            {/* Mostrar estadísticas solo si mostrarEstadisticas es true */}
            {mostrarEstadisticas && (

                <div className="flex flex-col mt-6 w-full">
                    <h3 className="montserrat-bold text-2xl">Dashboard</h3>
                    <div className="flex justify-between w-full">
                        <div className="w-96 p-6 h-80 bg-white shadow-[.3em_.3em_#121212] border-2 border-[#121212] m-9">
                            <Estadisticas tablero={tablero} token={token} />
                        </div>

                        <div className="w-96 p-6 h-80 bg-white shadow-[.3em_.3em_#121212] border-2 border-[#121212] m-9">
                            <h4 className="montserrat-semibold text-lg">Asignados</h4>
                            <EstadisticaAsignados tablero={tablero} token={token} />
                        </div>

                    </div>

                </div>



            )}

        </div>
    )
}