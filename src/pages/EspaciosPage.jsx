import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

export function EspaciosPage() {

    const location = useLocation()
    const token = location.state?.token || "" // Obtener el token como cadena de texto
    const nombreBuscado = location.state?.username || ""

    // Manejamos el estado.
    const [usuario, setUsuario] = useState()
    const [espacios, setEspacios] = useState([])
    
    // Primero. Obtenemos el usuario registrado.
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
                // Ya tenemos el usuario. Ahora necesitamos sus espacios.
                getUserEspacios(usuario)
            } else {
                toast.error("Ocurrió algo extraño :(")
            }

        } catch (error) {
            console.error(error)
            toast.error('Algo salió mal 😢 Por favor, vuelva a iniciar sesión.')
        }
    }

    const getUserEspacios = async (userId) => {
        try {
            const response = await axios.get('http://localhost:8000/api/espacios/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            const espaciosEncontrados = response.data.filter(espacio => espacio.propietario === userId)
            
            if (espaciosEncontrados) {
                setEspacios(espaciosEncontrados)
                console.log(userId)
                console.log(espacios)
            } else {
                console.log("Desastre")
            }

        } catch (error) {
            console.error(error)
            toast.error('Algo salió mal 😢 Por favor, vuelva a iniciar sesión.')
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    

    return (
        <div>
            <h1>Bienvenido a tus Espacios, Diego</h1>
        </div>
    )
}