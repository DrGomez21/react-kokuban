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
    const nombreBuscado = location.state?.username || ""

    const [usuario, setUsuario] = useState(null)
    const [loading, setLoading] = useState(true)

    const getUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            // Para filtrar el usuario que se desea.
            const userFound = response.data.find(user => user.username === nombreBuscado)

            if (userFound) {
                setUsuario(userFound)
                console.log(usuario)
            } else {
                toast.error("Ocurrió algo extraño :(")
            }
            setLoading(false)

        } catch (error) {
            console.error(error)
            toast.error('Algo salió mal 😢 Por favor, vuelva a iniciar sesión.')
            setLoading(false)
        }
    }


    useEffect(() => {
        getUserData() // Acá están todos los usuarios.
    }, [])


    return (

        <div className="container mx-auto">
            
            <Header user={usuario} />

            <div className="flex justify-center">
                <TableroTareas />
            </div>

        </div>
    )
}