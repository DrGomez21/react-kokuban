import { TableroTareas } from "../components/TableroTareas";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function KanbanPage() {

    const location = useLocation()
    const token = location.state?.token || "" // Obtener el token como cadena de texto

    const getUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data)
        } catch (error) {
            console.error(error)
            toast.error('Algo salió mal 😢 Por favor, vuelva a iniciar sesión.')
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (

        <div className="container mx-auto">
            
            <Header />
            
            <div className="flex justify-center">
                <TableroTareas />
            </div>

        </div>
    )
}