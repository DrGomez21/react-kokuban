import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function DetallesTarjeta({
  tarjeta,
  onClose,
  listaSubtareas,
  onInsert,
  token,
  onDelete,
}) {
  const [tareas, setTareas] = useState(listaSubtareas);
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState(tarjeta.descripcion);

  const { register, handleSubmit } = useForm();

  const getUserName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${tarjeta.creador_tarjeta}/`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );

      setUsername(response.data.username);
    } catch (error) {
      console.log(error);
      setUsername("Anónimo");
    }
  };

  const esProximo = () => {
    const fechaLimiteObj = new Date(tarjeta.fecha_vencimiento);
    const fechaActual = new Date();
    const diferenciaMilisegundos = fechaLimiteObj - fechaActual;
    const diferenciaDias = Math.ceil(
      diferenciaMilisegundos / (1000 * 60 * 60 * 24),
    );

    return diferenciaDias <= 2;
  };

  const recibirDatos = handleSubmit((data) => {
    const subtarea = {
      descripcion: data.descripcion,
      estado_subtarea: false,
      fecha_vencimiento: new Date(data.vencimiento).toISOString(),
      tarjeta: tarjeta.id,
    };
    setTareas((prevTareas) => [...prevTareas, subtarea]);
    onInsert(data.descripcion, data.vencimiento);
  });

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div className="bg-[#F5FF70] p-5 w-full columns-2 overflow-auto">
      <div className="flex flex-col mb-4 h-full">
        <h2 className="text-2xl justify-self-start montserrat-bold mb-2">
          {tarjeta.nombre_actividad}
        </h2>

        <span className="bg-[#956fff] w-fit text-white border border-[#121212] px-2 py-1 rounded-sm text-xs montserrat-regular mb-4">
          {tarjeta.etiqueta}
        </span>

        <div className="mb-4">
          <h3 className="montserrat-semibold justify-self-start mb-2">
            Descripción
          </h3>

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full h-32 bg-white shadow-[.2rem_.2rem_#121212] border-2 text-left border-[#121212] p-2 max-w-sm"
          ></textarea>
        </div>

        <h3 className="justify-self-start mb-2 montserrat-semibold">
          Detalles
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="bg-[#F0CA81] p-2 rounded-sm text-sm montserrat-medium border border-[#121212] mb-2">
              Creador: {username}
            </div>
            <div className="bg-[#F0CA81] p-2 rounded-sm text-sm montserrat-medium border border-[#121212]">
              Asignado a: Asignado
            </div>
          </div>
          <div>
            <div className="bg-blue-200 p-2 border border-[#121212] montserrat-medium text-sm rounded-sm mb-2">
              From: {tarjeta.fecha_creacion.split("T")[0]}
            </div>
            <div className="bg-red-200 p-2 border border-[#121212] montserrat-medium text-sm rounded-sm">
              To: {tarjeta.fecha_vencimiento.split("T")[0]}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Subtareas</h3>
        <div className="space-y-2">
          {tareas.map((tarea, index) => (
            <div
              key={index}
              className={`flex items-center ${esProximo() ? "bg-red-300" : "bg-white"} p-2 rounded`}
            >
              <label
                className={`${tarea.estado_subtarea ? "underline" : "no-underline"} montserrat-regular`}
              >
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={tarea.estado_subtarea}
                  onChange={async () => {
                    const nuevoEstado = !tarea.estado_subtarea;

                    try {
                      await axios.patch(
                        `http://localhost:8000/api/subtareas/${tarea.id}/`,
                        { estado_subtarea: nuevoEstado },
                        { headers: { Authorization: `Token ${token}` } },
                      );

                      setTareas((prevTareas) =>
                        prevTareas.map((t, idx) =>
                          idx === index
                            ? { ...t, estado_subtarea: nuevoEstado }
                            : t,
                        ),
                      );
                    } catch (error) {
                      console.error("Error actualizando la subtarea", error);
                    }
                  }}
                />
                {tarea.descripcion}
              </label>
            </div>
          ))}

          <form
            className="flex-col gap-2 p-1 bg-yellow-200"
            onSubmit={recibirDatos}
          >
            <input
              type="text"
              placeholder="Descripción subtarea"
              id="descripcion"
              className="p-2 shadow-[.1rem_.1rem_#121212] hover:shadow-[.3rem_.3rem_#121212] duration-150 appearance-none border-2 border-black w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("descripcion", { required: true })}
            />

            <div className="flex w-full mt-2 justify-between">
              <input
                type="date"
                name="vencimiento"
                id="vencimiento"
                {...register("vencimiento", { required: true })}
              />

              <button className="bg-green-300 px-2 py-1 border-2 montserrat-semibold border-[#121212]">
                +
              </button>
            </div>
          </form>
        </div>

        <div className="flex mt-6 justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cerrar
          </button>

          <button className="" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
