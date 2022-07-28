import Button from '../Button';
import config from '@/common/config';
import useUserAction from '@/hooks/useUserAction';

interface Props {
  id: number;
  token: string;
}

const BlockUser = () => {
  const userAction = useUserAction();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await userAction({
      url: config.api.users.block(),
      method: 'POST',
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Button className="border-2 border-solid text-lg btn-outline btn-error">
        Block
      </Button>
    </form>
  );
};
export default BlockUser;
