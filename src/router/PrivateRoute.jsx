const PrivateRoute = ({ children }) => {
	const userData = localStorage.getItem('userData');
	const token = localStorage.getItem('token');

	return userData && token? children : <Navigate to='/login' />;
};

export default PrivateRoute;