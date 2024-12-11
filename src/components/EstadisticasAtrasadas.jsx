import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const fechaActual = new Date().toISOString();

export const EstadisticasAtrasadas = ({ tablero, token }) => {

  const [data, setData] = useState([]);

  const obtenerEstadosDelTablero = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/estados/", {
        headers: { Authorization: `Token ${token}` },
      });
      // Filtra por tablero y obtiene los IDs
      return response.data
        .filter((item) => item.tablero === tablero.id)
        .map((item) => item.id);
    } catch (error) {
      console.error("Error al obtener los estados del tablero:", error);
      return [];
    }
  };

  const obtenerTarjetas = async (estados) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/estadoTarjetas/",
        { headers: { Authorization: `Token ${token}` } }
      );
      // Filtra tarjetas por los estados obtenidos
      return response.data
        .filter((item) => estados.includes(item.estado))
        .map((item) => item.tarjeta);
    } catch (error) {
      console.error("Error al obtener las tarjetas:", error);
      return [];
    }
  };

  const obtenerDatosCompletosTarjeta = async (idTarjetas) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/tarjetas/",
        { headers: { Authorization: `Token ${token}` } }
      )

      return response.data
        .filter((item) => idTarjetas.includes(item.id))
    } catch (error) {
      console.log("No se pudieron obtener los datos completos de las tarjetas")
      return []
    }
  }

  const procesarDatosParaGrafico = (tarjetas) => {
    const dataPieChart = tarjetas.reduce(
      (acc, tarjeta) => {
        if (tarjeta.fecha_vencimiento <= fechaActual) {
          acc[0].cantidad += 1; // Atrasadas
        } else {
          acc[1].cantidad += 1; // En fecha
        }
        return acc;
      },
      [
        { name: "Atrasadas", cantidad: 0 },
        { name: "En fecha", cantidad: 0 },
      ]
    );

    return dataPieChart
  };

  useEffect(() => {
    const cargarDatos = async () => {
      const estados = await obtenerEstadosDelTablero(); // Obtener los estados
      const idTarjetas = await obtenerTarjetas(estados); // Obtener todas las tarjetas
      const tarjetas = await obtenerDatosCompletosTarjeta(idTarjetas)
      const datos = procesarDatosParaGrafico(tarjetas); // Relacionar datos
      setData(datos)
    }

    cargarDatos()
  }, [tablero])


  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={300} height={300}>
        <Pie
          dataKey="cantidad"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />

      </PieChart>
    </ResponsiveContainer>
  )
}
