import { useAppSelector } from '@/common/store';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = (): React.ReactElement => {
  const user = useAppSelector((state) => state.session.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;
