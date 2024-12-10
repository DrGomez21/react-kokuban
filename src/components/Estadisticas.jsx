import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

export const Estadisticas = ({ tablero, token }) => {
  const [data, setData] = useState([]);

  const obtenerEstadosDelTablero = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/estados/", {
        headers: { Authorization: `Token ${token}` },
      });
      // Devuelve objetos completos de los estados pertenecientes al tablero
      return response.data.filter((item) => item.tablero === tablero.id);
    } catch (error) {
      console.error("Error al obtener los estados del tablero:", error);
      return [];
    }
  };

  const obtenerTarjetas = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/estadoTarjetas/",
        { headers: { Authorization: `Token ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener las tarjetas:", error);
      return [];
    }
  };

  const procesarDatosParaGrafico = (estados, tarjetas) => {
    // Agrupar tarjetas por estado
    const conteoPorEstado = tarjetas.reduce((acc, tarjeta) => {
      acc[tarjeta.estado] = (acc[tarjeta.estado] || 0) + 1;
      return acc;
    }, {});

    // Crear el formato adecuado para el gráfico con los nombres de los estados
    return estados.map((estado) => ({
      name: estado.nombre, // Usa el nombre del estado
      cantidad: conteoPorEstado[estado.id] || 0, // Si no hay tarjetas, asigna 0
    }));
  };

  useEffect(() => {
    const cargarDatos = async () => {
      const estados = await obtenerEstadosDelTablero(); // Obtener los estados
      const tarjetas = await obtenerTarjetas(); // Obtener todas las tarjetas
      const datosProcesados = procesarDatosParaGrafico(estados, tarjetas); // Relacionar datos
      setData(datosProcesados); // Actualizar el estado del gráfico
    };

    cargarDatos();
  }, [tablero]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cantidad" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
