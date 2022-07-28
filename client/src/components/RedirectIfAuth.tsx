import { Navigate, Outlet } from 'react-router-dom';
import useAuthorization from '@/hooks/useAuthorization';

const RedirectIfAuth = (): React.ReactElement => {
  const authorized = useAuthorization();

  return !authorized ? <Outlet /> : <Navigate to="/" />;
};

export default RedirectIfAuth;
