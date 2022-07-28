import config from '@/common/config';
import { useFetch } from './useFetch';
import { setError, setSuccess } from '@/features/alertSlice';
import { useAppDispatch, useAppSelector } from '@/common/store';
import {
  clearSession,
  setSelectAll,
  setSession,
} from '@/features/sessionSlice';
import { LocalUser } from '@comp/Dashboard/UserRow';
import { useNavigate } from 'react-router-dom';

interface Props {
  url: string;
  method: 'POST' | 'PATCH' | 'DELETE';
}

const useUserAction = () => {
  const fetchRequest = useFetch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.session.data?.users);
  const authUser = useAppSelector((state) => state.session.user)!;

  return async ({ url, method }: Props) => {
    if (!users) return;

    let isCurrentIncluded = false;
    const userIds = users
      .filter((user) => user.isChecked)
      .map((user) => {
        if (user.email === authUser.email) {
          isCurrentIncluded = true;
        }

        return user.id;
      });

    if (userIds?.length === 0) {
      return dispatch(
        setError({ error: 'Select a user to perform an action' })
      );
    }

    const data = await fetchRequest({
      url,
      method,
      data: { id: userIds },
      headers: {
        Authorization: `Basic ${authUser.token}`,
      },
    });

    if (data?.code === 200) {
      let filteredUsers: LocalUser[] | [] = [];

      if (method === 'DELETE') {
        filteredUsers = users.filter((user) => !userIds.includes(user.id));
      } else {
        filteredUsers = users.map((user: LocalUser) => {
          if (!userIds.includes(user.id)) return user;

          return {
            ...user,
            status: data.users.status,
            isChecked: false,
          };
        });
      }

      dispatch(
        setSession({
          data: {
            users: filteredUsers,
          },
        })
      );
      dispatch(
        setSelectAll({
          selectAll: false,
        })
      );

      dispatch(setSuccess({ success: data?.message }));
    } else if (data?.code === 401) {
      dispatch(clearSession());
      dispatch(setError({ error: data?.message }));
    } else {
      dispatch(setError({ error: data?.message }));
    }

    if (isCurrentIncluded) navigate(0);
  };
};

export default useUserAction;
