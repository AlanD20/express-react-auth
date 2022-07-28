import { UserSession } from '@/features/sessionSlice';

interface Props {
  user: UserSession;
}

const UserInfo = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center text-lg">
      <span className="capitalize">Welcome, {user.name}</span>
      <span className="badge badge-md">{user.email}</span>
    </div>
  );
};
export default UserInfo;
