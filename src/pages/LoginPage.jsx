import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUsuario } from "../api/kokuban.api";
import { toast } from "react-hot-toast";

export function LoginPage() {

    const {register, handleSubmit, formState: { errors } } = useForm()

    const navigate = useNavigate()

    const onSubmit = handleSubmit(async data => {
        try {
            const response = await loginUsuario(data)
            if (response.status === 200) {
                toast.success('Bienvenido', {
                    style: {
                        border: '2px solid #121212',
                        backgroundColor: '#B2FF9E',
                        color: '#121212',
                        fontFamily: 'monospace',
                        boxShadow: '.3rem .3rem #121212',
                        borderRadius: '1px'
                    }
                })
                navigate('/espacios', { state: { token : response.data.token, username : data.username } })
            }
        } catch(error) {
            if (error.response && error.response.status === 400) {
                toast.error('Credenciales incorrectas. Vuelva a intentarlo', {
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
    <div className="flex items-center justify-center h-screen bg-[#E7E6EF]">
      <div className="bg-white shadow-[.5rem_.5rem_#121212] border-4 border-black p-8 max-w-sm w-full">
        <img src="/Kokuban-logo-full.png" alt="Logooooo" className="mb-8 self-center" />
        
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              {...register ("username", {required:true})}
            />
            {errors.username && <span className="mt-1 ml-1 montserrat-medium text-red-400 text-xs">El nombre de usuario es requerido</span>}
          </div>

          <div className="mb-6">
            <label className="block text-[#121212] text-sm mb-2 montserrat-semibold" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              {...register ("password", {required:true})}
            />
            {errors.password && <span className="mt-1 ml-1 montserrat-medium text-red-400 text-xs">Contraseña de usuario es requerido</span>}
          </div>

          <div className="flex items-center justify-between">
            {/* <Link to={"/tablero"} className="w-full"> */}
              <button
                className="bg-[#B2FF9E] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full"
                type="submit"
              >
                Iniciar sesión
              </button>
            {/* </Link> */}
          </div>
        </form>

        <div className="mt-4 flex justify-center">
          <Link to="/registro">
            <button className="bg-[#EFE6FD] text-black hover:shadow-[.4rem_.4rem_#121212] montserrat-medium duration-150 py-2 px-4 border-2 border-[#121212] rounded-sm focus:outline-none focus:shadow-outline">
              Crear cuenta
            </button>
          </Link>
          
        </div>
      
      </div>
    </div>
  );
}