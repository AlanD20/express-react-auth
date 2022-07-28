import Button from '../Button';
import config from '@/common/config';
import { FiTrash2 } from 'react-icons/fi';
import useUserAction from '@/hooks/useUserAction';

interface Props {
  id: number;
  token: string;
}

const DeleteUser = () => {
  const userAction = useUserAction();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await userAction({
      url: config.api.users.destroy(),
      method: 'DELETE',
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Button className="border-2 border-solid text-lg btn-outline btn-error">
        <FiTrash2 className="text-xl" />
      </Button>
    </form>
  );
};
export default DeleteUser;
