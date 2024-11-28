import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TableroItem } from "../components/TableroItem";
import { Modal } from "../components/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Header } from "../components/Header";

export function TablerosPage() {
  const location = useLocation();
  const token = location.state?.token || ""; // Obtener el token como cadena de texto
  const user = location.state?.user;
  const espacio = location.state?.espacio;

  const [tableros, setTableros] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const { register, handleSubmit } = useForm();

  const getTableros = async () => {
    const response = await axios.get("http://localhost:8000/api/tableros/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const tablerosEncontrados = response.data.filter(
      (tab) => tab.espacio === espacio.id,
    );
    if (tablerosEncontrados) {
      setTableros(tablerosEncontrados);
    } else {
      console.log("Error al obtener los tableros");
    }
  };

  const handleDeleteTablero = (tabId) => {
    setTableros((prevTabs) =>
      prevTabs.filter((tablero) => tablero.id !== tabId),
    );
  };

  const crearTablero = handleSubmit(async (data) => {
    try {
      const tableroCreado = {
        nombre_tablero: data.nombre,
        espacio: espacio.id,
      };

      const response = await axios.post(
        "http://localhost:8000/api/tableros/",
        tableroCreado,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      if (response.status === 201) {
        toast.success("Nuevo tablero jujuuu 🎉");
        setMostrarModal(false);

        // Actualizar la UI.
        setTableros((prevTableros) => [...prevTableros, response.data]);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getTableros();
  }, []);

  return (
    <div className="bg-[#E7E6EF] h-screen">
      <Header user={user} nombreEspacio={null} />

      <div className="flex px-6 justify-between items-center w-screen">
        <h2 className="montserrat-bold text-xl">Tus tableros</h2>
      </div>

      {/* Contenedor de espacios */}
      <div className="px-8">
        <div className="grid grid-cols-3 gap-3 my-3">
          {tableros.map((tab) => (
            <TableroItem
              key={tab.id}
              tablero={tab}
              espacio={espacio}
              token={token}
              usuario={user}
              onDelete={handleDeleteTablero}
            />
          ))}

          <button
            onClick={() => setMostrarModal(true)}
            className="bg-[#B2FF9E] shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 text-[#121212] montserrat-medium py-2 px-4 border-2 border-black focus:outline-none"
          >
            Crear tablero
          </button>
        </div>
      </div>

      <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
        <div className="p-4">
          <form onSubmit={crearTablero}>
            <div className="mb-2">
              <label
                className="block text-[#121212] text-sm mb-2 montserrat-semibold"
                htmlFor="nombre"
              >
                Nombre del tablero
              </label>
              <input
                className="mb-2 shadow-[.2rem_.2rem_#121212] hover:shadow-[.4rem_.4rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre del tablero"
                {...register("nombre", { required: true })}
              />
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
            onClick={() => setMostrarModal(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}
