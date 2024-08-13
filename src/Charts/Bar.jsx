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
  const [topUsuarios, setTopUsuarios] = useState([]);
  const [recentRecords, setRecentRecords] = useState([]); // Estado para la tabla de registros recientes

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
          .slice(0, 5);

        setTopInvitados(sortedInvitados);

        // Procesar datos para la gráfica de registros por día del mes
        const counts = Array(31).fill(0);
        const invitadosPorDiaArray = Array(31).fill(null).map(() => []);

        data.forEach((invitado) => {
          const date = new Date(invitado.created_at);
          const day = date.getDate();
          const dayIndex = day - 1;
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

        // Obtener y procesar datos para la gráfica de usuarios
        const responseUsuarios = await fetch('https://api-mysql-s9hw.onrender.com/apertura/withUserNames');
        const dataUsuarios = await responseUsuarios.json();

        const usuariosFrecuentes = {};
        dataUsuarios.forEach((registro) => {
          const nombreUsuario = registro.nombre;
          usuariosFrecuentes[nombreUsuario] = (usuariosFrecuentes[nombreUsuario] || 0) + 1;
        });

        const sortedUsuarios = Object.entries(usuariosFrecuentes)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);

        setTopUsuarios(sortedUsuarios);

        // Ordenar por fecha y hora de forma separada
        let sortedRecentRecords = dataUsuarios
          .sort((a, b) => {
            const dateA = new Date(a.fecha).getTime();
            const dateB = new Date(b.fecha).getTime();
            const timeA = a.hora.split(':').reduce((acc, time) => (60 * acc) + +time);
            const timeB = b.hora.split(':').reduce((acc, time) => (60 * acc) + +time);
            return (dateB - dateA) || (timeB - timeA);
          })
          .slice(0, 10); // Obtener los 10 registros más recientes

        // Actualizar el estado de registros recientes
        setRecentRecords(sortedRecentRecords);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llamar a la función de obtención de datos inicialmente
    fetchData();

    // Configurar un intervalo para actualizar los datos cada 10 segundos
    const intervalId = setInterval(fetchData, 10000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [apiUrl]);

  useEffect(() => {
    // Si el número de registros recientes supera 10, eliminar el más antiguo
    if (recentRecords.length > 10) {
      setRecentRecords(recentRecords.slice(-10));
    }
  }, [recentRecords]);

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

  const topUsuariosLabels = topUsuarios.map(([nombre]) => nombre);
  const topUsuariosData = {
    labels: topUsuariosLabels,
    datasets: [{
      label: 'Top 3 Usuarios que más abren la puerta',
      data: topUsuarios.map(([_, frecuencia]) => frecuencia),
      backgroundColor: ['rgba(0, 255, 0, 0.2)', 'rgba(255, 255, 0, 0.2)', 'rgba(255, 0, 0, 0.2)'],
      borderColor: ['rgba(0, 255, 0, 1)', 'rgba(255, 255, 0, 1)', 'rgba(255, 0, 0, 1)'],
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

  const dataByDayOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            const day = context.label;
            const nombres = invitadosPorDia[day - 1] || [];
            return `Día ${day}: ${nombres.join(', ')}`;
          }
        }
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

  const topUsuariosOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de aperturas'
        }
      }
    }
  };

  return (
    <div className='bars'>
        <h2>Top 5 Invitados más frecuentes</h2>
        <Bar data={topInvitadosData} options={topInvitadosOptions} />

        <br /><br /><br /><br />

        <h2>Registros de Invitados por Día</h2>
        <Bar data={dataByDay} options={dataByDayOptions} />

        <br /><br /><br /><br />

        <h2>Top 3 Usuarios que más abren la puerta</h2>
        <Bar data={topUsuariosData} options={topUsuariosOptions} />

        <br /><br /><br /><br />

        <h2>Últimos 10 registros de aperturas</h2>
        <table className='recent-records-table'>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {recentRecords.map((record, index) => (
              <tr key={index}>
                <td>{new Date(record.fecha).toLocaleDateString()}</td>
                <td>{record.hora}</td>
                <td>{record.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default BarChart;
