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
  const [title, setTitle] = useState(tarjeta.nombre_actividad)
  const [tag, setTag] = useState(tarjeta.etiqueta)

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

  const actualizarTarjeta = async () => {
    if (desc === tarjeta.descripcion && title === tarjeta.nombre_actividad && tag === tarjeta.etiqueta) {
      return
    } else {
      tarjeta.descripcion = desc
      tarjeta.nombre_actividad = title
      tarjeta.etiqueta = tag

      const response = await axios.put(`http://localhost:8000/api/tarjetas/${tarjeta.id}/`,
        tarjeta,
        {
          headers: { Authorization: `Token ${token}` }
        })
      console.log(response)
    }
  }

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div className="bg-[#F5FF70] p-6 w-full rounded-md overflow-auto">

      <div className="grid grid-cols-2 gap-4">

        {/* Sirve para agrupar las columnas */}
        <div>

          <div className="flex gap-1 justify-between items-center">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-none text-2xl w-full justify-self-start montserrat-bold mb-2"
            />

            {/* Acciones de Guardar, cerrar y eliminar */}
            <div className="flex gap-3">
              <button
                className="bg-green-300 p-1 rounded-md hover:bg-green-400 transition duration-75 hover:scale-105 hover:shadow-xl hover:shadow-green-400"
                onClick={actualizarTarjeta}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                  <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M14 4l0 4l-6 0l0 -4" />
                </svg>
              </button>
              <button className="bg-orange-300 p-1 rounded-md hover:bg-orange-400 transition duration-75 hover:scale-105 hover:shadow-xl hover:shadow-orange-400"
                onClick={onClose}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
              <button className="bg-red-300 p-1 rounded-md hover:bg-red-400 transition duration-75 hover:scale-105 hover:shadow-xl hover:shadow-red-400"
                onClick={onDelete}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          </div>

          <input type="text" value={tag} onChange={(e) => setTag(e.target.value)}
            className="bg-[#956fff] w-fit text-white border border-[#121212] px-2 py-1 rounded-sm text-xs transition duration-100 montserrat-regular mb-4 hover:shadow-[.3rem_.3rem_#121212] focus:outline-none focus:shadow-[.3rem_.3rem_#121212]" />

          <h3 className="montserrat-semibold justify-self-start mb-2 mt-4">
            Descripción
          </h3>

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full h-32 bg-white shadow-[.2rem_.2rem_#121212] border-2 text-left border-[#121212] p-2 max-w-sm"
          ></textarea>

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


        {/* Sirve para agrupar las columnas de subtareas */}
        <div>
          <h3 className="font-semibold mb-2">Subtareas</h3>
          <div className="space-y-2">
            {tareas.map((tarea, index) => (
              <div
                key={index}
                className={`flex items-center ${esProximo() ? "bg-red-300" : "bg-white"} p-2 rounded`}
              >
                <label
                  className={`${tarea.estado_subtarea ? "line-through" : "no-underline"} montserrat-regular`}
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

        </div>

      </div>

    </div>
  );
}
