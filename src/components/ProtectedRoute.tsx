import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Change this to your authentication logic
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
