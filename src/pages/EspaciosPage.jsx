import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { EspacioItem } from "../components/EspacioItem";

export function EspaciosPage() {

    const location = useLocation()
    const token = location.state?.token || "" // Obtener el token como cadena de texto
    const nombreBuscado = location.state?.username || ""

    // Manejamos el estado.
    const [usuario, setUsuario] = useState()
    const [espacios, setEspacios] = useState([])
    const [loading, setLoading] = useState(true)
    
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
                setUsuario(userFound) // Ya tenemos el usuario. Ahora necesitamos sus espacios.
                await getUserEspacios(userFound.id)
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
            } else {
                console.log("No se encontraron los espacios del usuario")
            }

        } catch (error) {
            console.error(error)
            toast.error('Algo salió mal 😢 Por favor, vuelva a iniciar sesión.')
        }
    }

    const nuevoEspacio = () => {
        toast.success("Holi")
    }

    useEffect(() => {
        getUserData()
    }, [])
    
    if (loading) return <p>Cargando datos...</p>

    return (
        <div className="bg-[#E7E6EF] h-screen">

            <h1 className="py-6 px-6 montserrat-bold text-3xl">Bienvenido, {usuario ? usuario.username : ""}</h1>

            {/* Mini header */}
            <div className="flex px-6 justify-between items-center w-screen">

                <h2 className="montserrat-bold text-xl">Tus espacios</h2>

                <button 
                    onClick={nuevoEspacio}
                    className="bg-[#B2FF9E] hover:shadow-[.2rem_.2rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none">
                    Crear espacio
                </button>
            </div>

            {/* Contenedor de espacios */}
            <div className="px-8">
                <div className="grid grid-cols-3 gap-3 my-3">
                    {
                        espacios.map(espacio => (
                            <EspacioItem key={espacio.id} espacio={espacio} token={token} usuario={usuario}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}