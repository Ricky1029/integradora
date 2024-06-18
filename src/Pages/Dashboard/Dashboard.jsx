import './dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <div className="list">
          <a href=""><img src="src/img/dashboard.png" alt="" />Dashboard</a>
          <a href=""><img src="src/img/casa.png" alt="" />Home</a>
          <a href=""><img src="src/img/puerta.png" alt="" />Garage</a>
          <a href=""><img src="src/img/invitado.png" alt="" />Guests</a>
        </div>
        <div className="content">
          <div className="top">
            <img src="src/img/VAULT.png" alt="" className='vault' />
            <img src="src/img/campana.png" alt="" className='campana' />
          </div>
          <h1>Bienvenido, JOSELO!</h1>
          <h2>Dashboard</h2>
          <p>Welcome to the dashboard page</p>
        </div>
      </div>
  )
}

export default Dashboard