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

    const [loading, setLoading] = useState(true)

    console.log(usuario)
    console.log(token)

    return (

        <div className="container mx-auto">
            
            <Header user={usuario} nombreEspacio={espacio.nombre} />

            <div className="flex justify-center">
                <TableroTareas />
            </div>

        </div>
    )
}