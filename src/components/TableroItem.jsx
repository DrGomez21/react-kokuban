import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
import axios from "axios";
import { toast } from "react-hot-toast";

export function TableroItem({ espacio, tablero, token, usuario, onDelete }) {
  const navigate = useNavigate();

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarEditarTitulo, setMostrarEditarTitulo] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(tablero.nombre_tablero);

  const irAlTablero = () => {
    navigate("/tablero", {
      state: { token: token, user: usuario, espacio: espacio, tab: tablero },
    });
  };

  const handleDelete = async () => {
    try {
      const tabAEliminar = tablero.id;
      const response = await axios.delete(
        `http://localhost:8000/api/tableros/${tablero.id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      if (response.status === 204) {
        // Estado 204 para "No Content", es decir, eliminado correctamente
        onDelete(tabAEliminar);
        toast.success("Tablero eliminado con éxito");
      } else {
        console.log("No se pudo eliminar el espacio.");
      }
    } catch (error) {
      console.error("Error al eliminar el espacio:", error);
    }
  };

  const cambiarNombre = async (nuevoNombre) => {
    if (nuevoTitulo === tablero.nombre_tablero) {
      return;
    }

    tablero.nombre_tablero = nuevoNombre;
    try {
      const response = await axios.put(
        `http://localhost:8000/api/tableros/${tablero.id}/`,
        tablero,
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

  return (
    <div className="flex justify-between items-center bg-[#70b3ff] border-[3px] shadow-[.2rem_.2rem_#121212] border-[#121212] hover:shadow-[.4rem_.4rem_#121212] hover:cursor-pointer duration-150  w-full">
      <div onClick={irAlTablero} className="py-4 w-full h-full">
        <h3 className="ml-4 montserrat-semibold">{nuevoTitulo}</h3>
      </div>

      <button
        className="bg-blue-300 mr-4 p-1 rounded-md border-2 border-[#121212] text-white hover:bg-blue-400 transition duration-75 hover:scale-105 hover:shadow-[.2rem_.2rem_#121212]"
        onClick={() => setMostrarModalEliminar(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        </svg>
      </button>

      <Modal
        isOpen={mostrarModalEliminar}
        onClose={() => setMostrarModalEliminar(false)}
      >
        <div className="p-4 justify-center items-center">
          <div className="flex justify-between items-center w-full">
            <h3 className="montserrat-semibold">Acciones</h3>
            <button
              onClick={() => setMostrarModalEliminar(false)}
              className="text-red-400 montserrat-medium hover:text-red-800 hover:scale-110 transition duration-75"
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
                <path d="M9 9l6 6m0 -6l-6 6" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => {
              handleDelete();
              setMostrarModalEliminar(false);
            }}
            className="flex gap-2 bg-[#ff8686] mt-4 w-full justify-center hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black rounded-sm focus:outline-none"
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
            Eliminar tablero
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
  );
}
