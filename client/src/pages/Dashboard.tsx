import Layout from '@comp/Layout';
import config from '@/common/config';
import TitleText from '@comp/TitleText';
import AlertStatus from '@comp/AlertStatus';
import { useFetch } from '@/hooks/useFetch';
import LogoutButton from '@comp/LogoutButton';
import { useCallback, useEffect } from 'react';
import UserInfo from '@comp/Dashboard/UserInfo';
import { setError } from '@/features/alertSlice';
import BlockUser from '@comp/Dashboard/BlockUser';
import TableHead from '@comp/Dashboard/TableHead';
import DeleteUser from '@comp/Dashboard/DeleteUser';
import { setSession } from '@/features/sessionSlice';
import UnblockUser from '@comp/Dashboard/UnblockUser';
import { useAppDispatch, useAppSelector } from '@/common/store';
import UserRow, { LocalUser, User } from '@comp/Dashboard/UserRow';

const Dashboard = () => {
  const currentUser = useAppSelector((state) => state.session.user)!;

  const fetchRequest = useFetch();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.session.data?.users);

  const fetchUsers = useCallback(async () => {
    const { data, code } = await fetchRequest({
      url: config.api.users.all(),
      method: 'GET',
      headers: {
        Authorization: `Basic ${currentUser.token}`,
      },
    });

    if (code === 200) {
      const localUsers: LocalUser[] = data.users?.map((u: User) => ({
        ...u,
        isChecked: false,
      }));
      dispatch(
        setSession({
          data: {
            users: localUsers,
          },
        })
      );
    } else {
      dispatch(
        setError({
          error: 'Failed to load users',
        })
      );
    }
  }, []);

  useEffect(() => void fetchUsers(), [fetchUsers]);

  const handleOnSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const usersSelection = users?.map((u: LocalUser) => {
      if (u.id === Number(e.target.value)) {
        return {
          ...u,
          isChecked: e.target.checked,
        };
      }
      return u;
    });

    dispatch(
      setSession({
        data: {
          users: usersSelection,
        },
      })
    );
  };

  return (
    <Layout>
      <div className="w-full flex flex-col items-center mb-4 py-4">
        <div className="flex w-full gap-12 px-24">
          <div className="flex gap-4">
            <BlockUser />
            <UnblockUser />
            <DeleteUser />
          </div>
          <div className="flex ml-auto justify-center">
            <AlertStatus className="my-0" />
          </div>
          <div className="flex gap-12 ml-auto">
            <UserInfo user={currentUser} />
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto w-full pb-2 px-16 h-screen">
        <table className="table w-full">
          <TableHead />
          <tbody className="relative">
            {users &&
              users.length > 0 &&
              users.map((user: LocalUser) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onSelected={handleOnSelected}
                />
              ))}
            {!users && (
              <tr>
                <td className="absolute w-full mt-8 text-center">
                  <TitleText text="Empty!" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
export default Dashboard;
