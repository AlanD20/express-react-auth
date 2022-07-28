import Button from './Button';
import config from '@/common/config';
import { useFetch } from '@/hooks/useFetch';
import { clearSession } from '@/features/sessionSlice';
import { useAppDispatch, useAppSelector } from '@/common/store';
import useSession from '@/hooks/useSession';

const LogoutButton = () => {
  const fetchRequest = useFetch();
  const dispatch = useAppDispatch();
  const { clearSessionStorage } = useSession();
  const { token } = useAppSelector((state) => state.session.user)!;

  const handleLogout = async () => {
    const response = await fetchRequest({
      url: config.api.users.logout(),
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    if (response.code === 200) {
      clearSessionStorage();
      dispatch(clearSession());
    }
  };

  return (
    <Button
      label="logout"
      className="btn-secondary text-lg"
      onClick={handleLogout}
    />
  );
};
export default LogoutButton;
