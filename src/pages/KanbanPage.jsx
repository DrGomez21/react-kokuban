import { TableroTareas } from "../components/TableroTareas";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";

export function KanbanPage() {

    const location = useLocation()
    const token = location.state?.token || "" // Obtener el token como cadena de texto
    const usuario = location.state?.user
    const espacio = location.state?.espacio
    const tablero = location.state?.tab

    const [loading, setLoading] = useState(true)

    return (

        <div className="container mx-auto">

            <Header user={usuario} nombreEspacio={espacio.nombre} />

            <div className="justify-center mx-12 mt-6">
                <TableroTareas token={token} tablero={tablero.id} usuario={usuario} espacio={espacio} />
            </div>

        </div>
    )
}