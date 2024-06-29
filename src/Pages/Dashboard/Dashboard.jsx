import { Link } from 'react-router-dom'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <div className="list">
          <Link to="/"><img src="src/img/dashboard.png" alt="" />Dashboard</Link>
          <Link to="/"><img src="src/img/puerta.png" alt="" />Garage</Link>
          <Link to="/"><img src="src/img/invitado.png" alt="" />Guests</Link>
        </div>
        <div className="content">
          <div className="top">
            <img src="src/img/VAULT.png" alt="" className='vault' />
            <img src="src/img/campana.png" alt="" className='campana' />
          </div>
          <h1>Bienvenido, JOSELO!</h1>
          <h2>Dashboard</h2>
        </div>
      </div>
  )
}

export default Dashboard