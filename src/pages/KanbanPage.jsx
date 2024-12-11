import { TableroTareas } from "../components/TableroTareas";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Estadisticas } from "../components/Estadisticas";
import { EstadisticaAsignados } from "../components/EstadisticaAsignados";
import { EstadisticasAtrasadas } from "../components/EstadisticasAtrasadas";

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
                className="flex gap-2 ml-12 mt-4 bg-[#ae60f7] shadow-[.2rem_.2rem_#121212] hover:scale-105 hover:shadow-[.4rem_.4rem_#121212] duration-150 text-white montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-fit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                    <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                    <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                    <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                </svg>
                {mostrarEstadisticas ? "Ocultar dashboard" : "Ver dashboard"}
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

                        <div className="w-96 p-6 h-80 bg-white shadow-[.3em_.3em_#121212] border-2 border-[#121212] m-9">
                            <h4 className="montserrat-semibold text-lg">Atrasadas</h4>
                            <EstadisticasAtrasadas tablero={tablero} token={token} />
                        </div>

                    </div>

                </div>



            )}

        </div>
    )
}