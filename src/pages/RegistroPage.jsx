
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../api/kokuban.api";
import { toast } from "react-hot-toast";

export function RegistroPage() {

    const {register, handleSubmit, formState:{
        errors
    }} = useForm()

    const navigate = useNavigate()

    const onSubmit = handleSubmit(async data => {
        // console.log(data)
        try {
            const response = await registrarUsuario(data)
            if (response.status === 201) {
                toast.success('Usuario creado. Inicie Sesión :)', {
                    style: {
                        border: '2px solid #121212',
                        backgroundColor: '#B2FF9E',
                        color: '#121212',
                        fontFamily: 'monospace',
                        boxShadow: '.3rem .3rem #121212',
                        borderRadius: '1px'
                    }
                })

                navigate('/login')
            }
        } catch(error) {
            if (error.response && error.response.status === 400) {
                toast.error('Verifique sus datos.', {
                    style: {
                        border: '2px solid #121212',
                        backgroundColor: '#ff9e9e',
                        color: '#121212',
                        fontFamily: 'monospace',
                        boxShadow: '.3rem .3rem #121212',
                        borderRadius: '1px'
                    }
                })
                
            } else {
                toast.error('Ocurrió un error inesperado')
            }
        }
    })

    return (
        <div className="flex px-16 items-center justify-center h-screen bg-[#E7E6EF]">

            <div className="bg-white shadow-[.5rem_.5rem_#121212] border-4 border-black  p-8 max-w-4xl w-full">

                <img src="/Kokuban-logo-full.png" alt="Logo Kokuban" className="mb-4" />

                <form onSubmit={onSubmit}>

                    <div className="columns-2 mb-4">
                        <div>
                            <div className="mb-4">
                                <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="username">
                                Nombre de usuario
                                </label>
                                <input
                                className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Nombre de usuario"
                                { ...register("username", {required:true} ) }
                                />
                                {errors.username && <span className="mt-1 ml-1 montserrat-medium text-red-400 text-xs">El nombre de usuario es requerido</span>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="email">
                                Email
                                </label>
                                <input
                                className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="Email"
                                { ...register("email", {required:true} ) }
                                />
                                {errors.email && <span className="mt-1 ml-1 montserrat-medium text-red-400 text-xs">El email es requerido</span>}
                            </div>
    
                        </div>

                        <div>
                            <div className="mb-4">
                                <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="pass">
                                Contraseña
                                </label>
                                <input
                                className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="pass"
                                type="password"
                                placeholder="Contraseña"
                                { ...register("password", {required:true} ) }
                            />
                            {errors.password && <span className="mt-1 ml-1 montserrat-medium text-red-400 text-xs">La contraseña es requerido</span>}

                            </div>

                            <div className="mb-4">
                                <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="confirm-pass">
                                Confirmar contraseña
                                </label>
                                <input
                                className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirm-pass"
                                type="password"
                                placeholder="Confirmar contraseña"
                                />
                            </div>
    
                        </div>

                    </div>

                    <button
                    className="bg-[#B2FF9E] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full"
                    type="submit"
                    >
                        Crear usuario
                    </button>
                </form>
            </div>
        </div>
    )
}