import Button from '../Button';
import config from '@/common/config';
import { FaUnlockAlt } from 'react-icons/fa';
import useUserAction from '@/hooks/useUserAction';

interface Props {
  id: number;
  token: string;
}

const UnblockUser = () => {
  const userAction = useUserAction();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await userAction({
      url: config.api.users.unblock(),
      method: 'POST',
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Button className="border-2 border-solid text-lg btn-outline btn-success">
        <FaUnlockAlt className="text-xl" />
      </Button>
    </form>
  );
};
export default UnblockUser;
