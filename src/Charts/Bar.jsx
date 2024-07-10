import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ apiUrl }) => {
  const [topInvitados, setTopInvitados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Procesar los datos para contar las veces que aparece cada invitado
        const invitadosFrecuentes = {};
        data.forEach((invitado) => {
          const nombreInvitado = invitado.nombreinv;
          invitadosFrecuentes[nombreInvitado] = (invitadosFrecuentes[nombreInvitado] || 0) + 1;
        });

        // Convertir el objeto a un array y ordenarlo por frecuencia
        const sortedInvitados = Object.entries(invitadosFrecuentes)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5); // Tomar solo los primeros 5

        setTopInvitados(sortedInvitados);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  // Preparar los datos para el gráfico
  const labels = topInvitados.map(([nombre]) => nombre);
  const data = {
    labels: labels,
    datasets: [{
      label: 'Invitados más frecuentes',
      data: topInvitados.map(([_, frecuencia]) => frecuencia),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>Top 5 Invitados más frecuentes</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
