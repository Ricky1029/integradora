import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../index.css';

// Registrar las escalas necesarias y el plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ apiUrl }) => {
  const [topInvitados, setTopInvitados] = useState([]);
  const [dataByDay, setDataByDay] = useState({ labels: [], datasets: [] });
  const [invitadosPorDia, setInvitadosPorDia] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null); // Estado para el día seleccionado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Procesar datos para la gráfica de invitados más frecuentes
        const invitadosFrecuentes = {};
        data.forEach((invitado) => {
          const nombreInvitado = invitado.nombreinv;
          invitadosFrecuentes[nombreInvitado] = (invitadosFrecuentes[nombreInvitado] || 0) + 1;
        });

        const sortedInvitados = Object.entries(invitadosFrecuentes)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5); // Tomar solo los primeros 5

        setTopInvitados(sortedInvitados);

        // Procesar datos para la gráfica de registros por día del mes
        const counts = Array(31).fill(0);
        const invitadosPorDiaArray = Array(31).fill(null).map(() => []);

        data.forEach((invitado) => {
          const date = new Date(invitado.created_at);
          const day = date.getDate(); // Cambiar a getDate()
          const dayIndex = day - 1; // Índice basado en el día del mes
          if (dayIndex >= 0 && dayIndex < 31) {
            counts[dayIndex] += 1;
            invitadosPorDiaArray[dayIndex].push(invitado.nombreinv);
          }
        });

        const labels = counts.map((_, index) => index + 1);
        const dataset = {
          label: 'Número de registros por día',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        };

        setDataByDay({
          labels,
          datasets: [dataset],
        });

        setInvitadosPorDia(invitadosPorDiaArray);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  // Preparar los datos para la gráfica de invitados más frecuentes
  const topInvitadosLabels = topInvitados.map(([nombre]) => nombre);
  const topInvitadosData = {
    labels: topInvitadosLabels,
    datasets: [{
      label: 'Top 5 Invitados más frecuentes',
      data: topInvitados.map(([_, frecuencia]) => frecuencia),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const topInvitadosOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Opciones para la gráfica de registros por día
  const dataByDayOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
<<<<<<< HEAD
        enabled: true // Deshabilitar tooltips predeterminados
=======
        callbacks: {
          label: function(context) {
            const day = context.label;
            const nombres = invitadosPorDia[day - 1] || [];
            return `Día ${day}: ${nombres.join(', ')}`;
          }
        }
>>>>>>> af7f35293640bdee1fc0ba107c416de3bfa49329
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Día del mes'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de registros'
        }
      }
    }
  };

  return (
    <div className='bars'>
        <h2>Top 5 Invitados más frecuentes</h2>
        <Bar data={topInvitadosData} options={topInvitadosOptions} />

<<<<<<< HEAD
        <br /><br /><br /><br />

        <h2>Registros de Invitados por Día</h2>
        <Bar data={dataByDay} options={dataByDayOptions} />

      {selectedDay !== null && (
        <div className="detalle-dia">
          <h3>Detalles del Día {selectedDay}</h3>
          <p>{detallesTexto}</p>
        </div>
      )}
=======
      <h2>Registros de Invitados por Día</h2>
      <Bar data={dataByDay} options={dataByDayOptions} />
>>>>>>> af7f35293640bdee1fc0ba107c416de3bfa49329
    </div>
  );
};

export default BarChart;
