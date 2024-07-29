import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../index.css';

// Registrar escalas necesarias para Chart.js v3
ChartJS.register(CategoryScale, LinearScale, BarElement);

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
          const day = date.getUTCDate() - 1;
          if (day >= 0 && day < 31) {
            counts[day] += 1;
            invitadosPorDiaArray[day].push(invitado.nombreinv);
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

  const handleClick = (event) => {
    const chart = event.chart;
    const elements = chart.getElementsAtEventForMode(event.event, 'nearest', { intersect: true }, true);
    
    if (elements.length > 0) {
      const index = elements[0].index;
      setSelectedDay(index + 1); // Establecer el día seleccionado (1-indexado)
    } else {
      setSelectedDay(null);
    }
  };

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
        enabled: true // Deshabilitar tooltips predeterminados
      }
    },
    onClick: handleClick,
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

  // Obtener información para el cuadro de detalles del día seleccionado
  const detallesDia = selectedDay ? invitadosPorDia[selectedDay - 1] : [];
  const detallesTexto = detallesDia.length > 0 ? 
    `Invitados: ${detallesDia.join(', ')}` : 'No hay registros para este día.';

  return (
    <div className='bars'>
        <h2>Top 5 Invitados más frecuentes</h2>
        <Bar data={topInvitadosData} options={topInvitadosOptions} />

        <br /><br /><br /><br />

        <h2>Registros de Invitados por Día</h2>
        <Bar data={dataByDay} options={dataByDayOptions} />

      {selectedDay !== null && (
        <div className="detalle-dia">
          <h3>Detalles del Día {selectedDay}</h3>
          <p>{detallesTexto}</p>
        </div>
      )}
    </div>
  );
};

export default BarChart;
