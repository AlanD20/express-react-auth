import moment from 'moment';
import { useAppSelector } from '@/common/store';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  status: 'ACTIVE' | 'BLOCKED';
}

export interface LocalUser extends User {
  isChecked: boolean;
}

interface Props {
  user: LocalUser;
  onSelected: React.ChangeEventHandler<HTMLInputElement>;
}

const UserRow = ({ user, onSelected }: Props) => {
  const { token } = useAppSelector((state) => state.session.user)!;

  return (
    <tr key={user.id}>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox border-2 border-solid"
            value={user.id}
            checked={user.isChecked}
            onChange={onSelected}
          />
        </label>
      </th>
      <td>
        <div className="font-bold">{user.id}</div>
      </td>
      <td>
        <div className="font-bold">{user.name}</div>
      </td>
      <td>
        <div className="font-bold">{user.email}</div>
      </td>
      <td>
        <div
          className={`font-bold ${
            user.status === 'ACTIVE' ? 'text-success' : 'text-error'
          }`}
        >
          {user.status}
        </div>
      </td>
      <td>
        <div className="font-bold">
          {user.createdAt
            ? moment(user.createdAt).format('YYYY-MM-DD hh:mm:ss')
            : 'N/A'}
        </div>
      </td>
      <td>
        <div className="font-bold">
          {user.lastLogin
            ? moment(user.lastLogin).format('YYYY-MM-DD hh:mm:ss')
            : 'N/A'}
        </div>
      </td>
    </tr>
  );
};
export default UserRow;
