import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { EspacioItem } from "../components/EspacioItem";
import { Modal } from "../components/Modal";

export function EspaciosPage() {

    const location = useLocation()
    const token = location.state?.token || "" // Obtener el token como cadena de texto
    const nombreBuscado = location.state?.username || ""

    // Manejamos el estado.
    const [usuario, setUsuario] = useState()
    const [espacios, setEspacios] = useState([])
    const [loading, setLoading] = useState(true)
    const [espaciosInvitado, setEspaciosInvitado] = useState([])
    const [allSpaces, setAllSpaces] = useState([])
    const [allUsers, setAllUsers] = useState([])

    const [mostrarModalNuevoEspacio, setMostrarModalNuevoEstado] = useState(false);

    const { register, handleSubmit } = useForm()

    const getAllUsers = async () => {
        const response = await axios.get('http://localhost:8000/api/users/', { headers: { Authorization: `Token ${token}` } })
        setAllUsers(response.data)
    }

    // Obtenemos el usuario registrado.
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
            const [response, invitado] = await Promise.all([
                axios.get('http://localhost:8000/api/espacios/', { headers: { Authorization: `Token ${token}` } }),
                axios.get(`http://localhost:8000/api/usuarioEspacios/`, { headers: { Authorization: `Token ${token}` } })
            ])

            const espaciosPropios = response.data.filter(espacio => espacio.propietario === userId)
            const espaciosInvitado = invitado.data.filter(espacio => espacio.usuario === userId)

            if (espaciosPropios) {
                setEspacios(espaciosPropios)
            } else {
                console.log("No se encontraron los espacios del usuario")
            }

            if (espaciosInvitado) {
                setEspaciosInvitado(espaciosInvitado)
                console.log(espaciosInvitado)
            }
            setAllSpaces(response.data)

        } catch (error) {
            console.error(error)
            toast.error('Algo salió mal 😢 Por favor, vuelva a iniciar sesión.')
        }
    }

    const getEspacioCompartido = (idEspacio) => {
        return allSpaces.find(e => e['id'] === idEspacio)
    }

    const crearEspacio = handleSubmit(async data => {
        try {
            const espacioCreado = {
                nombre: data.nombre,
                propietario: usuario.id
            }

            const response = await axios.post('http://localhost:8000/api/espacios/', espacioCreado, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            if (response.status === 201) {

                if (data.selectedOption) {
                    await compartirEspacio(response.data.id, data.selectedOption)
                }
                setMostrarModalNuevoEstado(false)
                // Actualizar la UI.
                setEspacios(prevEspacios => [...prevEspacios, response.data]);
                toast.success('Nuevo espacio creado 🚀')
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    })

    const compartirEspacio = async (idEspacio, idUsuarioCompartido) => {
        const userEspacioCreado = {
            espacio: idEspacio,
            fecha_fin_asignacion: null,
            fecha_inicio_asignacion: new Date().toISOString(),
            usuario: parseInt(idUsuarioCompartido)
        }

        const conn = await axios.post('http://localhost:8000/api/usuarioEspacios/', userEspacioCreado, { headers: { Authorization: `Token ${token}` } })

        if (conn.status === 201) {
            toast.success('Espacio compartido 🔗')
        }
    }

    // Función para actualizar el estado al eliminar un espacio
    const handleDeleteEspacio = (espacioId) => {
        setEspacios(prevEspacios => prevEspacios.filter(espacio => espacio.id !== espacioId));
    };

    useEffect(() => {
        getUserData()
        getAllUsers()
    }, [])

    if (loading) return (
        <div>
            Cargando...
        </div>
    )

    return (
        <div className="bg-[#E7E6EF] h-screen">

            <h1 className="py-6 px-6 montserrat-bold text-3xl">Bienvenido, {usuario ? usuario.username : ""}</h1>

            {/* Mini header */}
            <div className="flex px-6 justify-between items-center w-screen">

                <h2 className="montserrat-bold text-xl">Tus espacios</h2>

                <button
                    onClick={() => setMostrarModalNuevoEstado(true)}
                    className="bg-[#B2FF9E] hover:shadow-[.2rem_.2rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none">
                    Crear espacio
                </button>
            </div>

            {/* Contenedor de espacios */}
            <div className="px-8">
                <div className="grid grid-cols-3 gap-3 my-3">
                    {
                        espacios.map(espacio => (
                            <EspacioItem key={espacio.id} espacio={espacio} token={token} usuario={usuario} onDelete={handleDeleteEspacio} mostrarOpciones={true} allUsers={allUsers} onShare={compartirEspacio} />
                        ))
                    }
                </div>
            </div>

            <div className={`px-6 py-6 ${espaciosInvitado.length > 0 ? 'visible' : 'invisible'}`}>
                <h2 className="montserrat-bold text-xl">Espacios a los que estás invitado</h2>
                {/* Contenedor de espacios */}
                <div className="py-2 px-2">
                    <div className="grid grid-cols-3 gap-3 my-3">
                        {
                            espaciosInvitado.map(espacioInvi => {
                                const espace = getEspacioCompartido(espacioInvi.espacio)
                                return (
                                    <EspacioItem key={espacioInvi.id} espacio={espace} token={token} usuario={espace.propietario} onDelete={handleDeleteEspacio} mostrarOpciones={false} allUsers={[]} onShare={compartirEspacio} />
                                )
                            })
                        }
                    </div>
                </div>

            </div>


            <Modal isOpen={mostrarModalNuevoEspacio} onClose={() => setMostrarModalNuevoEstado(false)}>
                <div className="px-4 my-3">
                    <h3 className="text-lg montserrat-semibold mb-4">Crear espacio</h3>
                    <form onSubmit={crearEspacio} className="mt-4">
                        <div className="mb-2">
                            <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="nombre">
                                Nombre del espacio
                            </label>
                            <input
                                className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre del espacio"
                                {...register("nombre", { required: true })}
                            />
                        </div>

                        <div className="mb-2 py-2">
                            <label htmlFor="option" className="montserrat-medium text-xs mr-4">Compartir con:</label>
                            <select
                                id="option"
                                className="px-2 py-1 bg-white border border-[#121212] hover:cursor-pointer"
                                {...register("selectedOption")}
                            >
                                <option className="montserrat-regular" value="">Nadie...</option>
                                {
                                    allUsers.map((user) => (
                                        <option className="montserrat-regular" key={user.id} value={user.id}>{user.username}</option>
                                    ))
                                }

                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-[#B2FF9E] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full"
                                type="submit"
                            >
                                Crear ahora
                            </button>
                        </div>
                    </form>

                    <button
                        className="bg-[#ff8686] mt-4 hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full"
                        onClick={() => setMostrarModalNuevoEstado(false)}
                    >
                        Cancelar
                    </button>

                </div>
            </Modal>

        </div>
    )
}