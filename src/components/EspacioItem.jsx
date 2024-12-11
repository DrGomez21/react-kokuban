import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "./Modal"
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function EspacioItem({ espacio, token, usuario, onDelete, mostrarOpciones, allUsers, onShare }) {

  // TODO: HACER QUE SE INACTIVE EL ESPACIO.

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm()

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)
  const [mostrarEditarTitulo, setMostrarEditarTitulo] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(espacio.nombre);
  const [estado, setEstado] = useState(espacio.estado);

  const irAlTablero = () => {
    navigate('/tabs', { state: { token: token, user: usuario, espacio: espacio } })
  }

  const llamarACompartir = handleSubmit(async (data) => {
    await onShare(espacio.id, data.selectedOption)
  })

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/espacios/${espacio.id}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      if (response.status === 204) { // Estado 204 para "No Content", es decir, eliminado correctamente
        onDelete(espacio.id);
      } else {
        console.log("No se pudo eliminar el espacio.");
      }
    } catch (error) {
      console.error("Error al eliminar el espacio:", error);
    }
  };

  const actualizarEstado = async (nuevoEstado) => {
    espacio.estado = nuevoEstado
    setEstado(nuevoEstado)
    try {
      const response = await axios.put(
        `http://localhost:8000/api/espacios/${espacio.id}/`,
        espacio,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );

      if (response.status === 200) {
        console.log("Bien");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const cambiarNombre = async (nuevoNombre) => {
    if (nuevoTitulo === espacio.nombre) {
      return;
    }

    espacio.nombre = nuevoNombre;
    try {
      const response = await axios.put(
        `http://localhost:8000/api/espacios/${espacio.id}/`,
        espacio,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );

      if (response.status === 200) {
        console.log("Bien");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (estado === 1 || estado === null) {

    return (
      <div className={`flex justify-between items-center bg-[#F5FF70] border-[3px] shadow-[.2rem_.2rem_#121212] border-[#121212] hover:shadow-[.4rem_.4rem_#121212] hover:cursor-pointer duration-150  w-full`}>
        <div
          onClick={irAlTablero}
          className="py-4 w-full h-full">
          <h3 className="pl-2 montserrat-semibold">{nuevoTitulo}</h3>
        </div>

        <button
          className={`${mostrarOpciones ? 'bg-orange-300 mr-4 p-1 rounded-md border-2 border-[#121212] text-black hover:bg-orange-400 transition duration-75 hover:scale-105 hover:shadow-[.2rem_.2rem_#121212]' : 'invisible'}`}
          onClick={() => setMostrarModalEliminar(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
        </button>


        <Modal isOpen={mostrarModalEliminar} onClose={() => setMostrarModalEliminar(false)}>

          <div className="px-5 py-3">
            <div className='flex justify-between content-center p-2 mb-4'>
              <h3 className="text-lg montserrat-bold">Acciones del espacio</h3>
              <button
                onClick={() => setMostrarModalEliminar(false)}
                className="text-red-400 montserrat-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" /><path d="M9 9l6 6m0 -6l-6 6" /></svg>
              </button>
            </div>

            <button
              onClick={() => {
                actualizarEstado(2)
                setMostrarModalEliminar(false)
              }}
              className="flex gap-2 justify-center bg-[#ff8686] mt-4 hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
              Inactivar
            </button>

            <button
              onClick={() => {
                handleDelete()
                setMostrarModalEliminar(false)
              }}
              className="flex gap-2 justify-center bg-[#ff8686] mt-4 hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash-x">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7h16" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                <path d="M10 12l4 4m0 -4l-4 4" />
              </svg>
              Eliminar
            </button>

            <button
              onClick={() => {
                setMostrarModalEliminar(false);
                setMostrarEditarTitulo(true);
              }}
              className="flex gap-2 mt-4 justify-center bg-blue-400 text-white py-2 px-4 rounded-sm w-full border-2 border-[#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
              Renombrar
            </button>

            <form onSubmit={llamarACompartir}>
              <div className="mt-4 py-2 items-center flex gap-2">
                <label htmlFor="option" className="montserrat-medium text-sm mr-2">Compartir:</label>
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

                <button
                  className="flex gap-2 justify-center bg-[#B2FF9E] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
                  type="submit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                  </svg>
                  Compartir
                </button>
              </div>
            </form>

          </div>

        </Modal>

        {/* Modal de Editar Título */}
        <Modal
          isOpen={mostrarEditarTitulo}
          onClose={() => setMostrarEditarTitulo(false)}
        >
          <div className="p-4">
            <h3 className="text-lg montserrat-bold mb-4">
              Editar nombre de la lista
            </h3>
            <input
              type="text"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
              className="p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setMostrarEditarTitulo(false);
                }}
                className="bg-[#ff9292] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setMostrarEditarTitulo(false);
                  setMostrarModalEliminar(false);
                  cambiarNombre(nuevoTitulo);
                }}
                className="bg-[#9eb0ff] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
              >
                Guardar
              </button>
            </div>
          </div>
        </Modal>

      </div>
    )

  } else {
    return (
      <div className={`flex justify-between items-center ${estado === 1 ? "bg-[#F5FF70]" : "bg-red-400"} border-[3px] shadow-[.2rem_.2rem_#121212] border-[#121212] hover:shadow-[.4rem_.4rem_#121212] hover:cursor-pointer duration-150  w-full`}>
        <div
          onClick={() => { toast.error('Este espacio está inactivo') }}
          className="py-4 w-full h-full">
          <h3 className="pl-2 montserrat-semibold">{nuevoTitulo}</h3>
        </div>

        <button
          className={`${mostrarOpciones ? 'bg-red-700 mr-4 p-1 rounded-md border-2 border-[#121212] text-white hover:bg-red-700 transition duration-75 hover:scale-105 hover:shadow-[.2rem_.2rem_#121212]' : 'invisible'}`}
          onClick={() => setMostrarModalEliminar(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
        </button>


        <Modal isOpen={mostrarModalEliminar} onClose={() => setMostrarModalEliminar(false)}>

          <div className="px-5 py-3">
            <div className='flex justify-between content-center p-2 mb-4'>
              <h3 className="text-lg montserrat-bold">Acciones del espacio</h3>
              <button
                onClick={() => setMostrarModalEliminar(false)}
                className="text-red-400 montserrat-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" /><path d="M9 9l6 6m0 -6l-6 6" /></svg>
              </button>
            </div>

            <button
              onClick={() => {
                actualizarEstado(1)
                setMostrarModalEliminar(false)
              }}
              className="flex gap-2 mt-4 justify-center bg-blue-400 text-white py-2 px-4 rounded-sm w-full border-2 border-[#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-check">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              Reactivar
            </button>
            <button
              onClick={() => {
                handleDelete()
                setMostrarModalEliminar(false)
              }}
              className="flex gap-2 justify-center bg-[#ff8686] mt-4 hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash-x">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7h16" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                <path d="M10 12l4 4m0 -4l-4 4" />
              </svg>
              Eliminar
            </button>
          </div>

        </Modal>

      </div>
    )
  }
}