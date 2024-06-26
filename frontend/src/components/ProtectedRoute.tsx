import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('auth_token');
  
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
