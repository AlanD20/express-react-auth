import axios from '@/common/axios';
import config from '@/common/config';
import useSession from './useSession';
import { useAppDispatch } from '@/common/store';
import { setError } from '@/features/alertSlice';
import { clearSession, setAuthSession } from '@/features/sessionSlice';
import { useCallback, useEffect, useState } from 'react';

interface ResponseState {
  code: number;
  message: string;
  user: {
    token: string;
    name: string;
    email: string;
    status: string;
  };
}

const useAuthorization = () => {
  const dispatch = useAppDispatch();
  const { getSessionStorage, clearSessionStorage } = useSession();
  const [authorize, setAuthorize] = useState<Boolean>(false);

  const fetchSession = useCallback(async () => {
    const sessionStorage = getSessionStorage();

    if (sessionStorage) {
      try {
        const { data } = await axios.post<ResponseState>(
          config.api.users.session(),
          {
            token: sessionStorage.token,
          }
        );
        if (data?.code === 200) {
          setAuthorize(true);
          dispatch(
            setAuthSession({
              user: {
                token: data.user.token,
                name: data.user.name,
                email: data.user.email,
              },
            })
          );
        }
      } catch (err: any) {
        const data = err?.response.data;
        setAuthorize(false);
        clearSessionStorage();
        dispatch(clearSession());
        dispatch(setError({ error: data?.message }));
      }
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return authorize;
};

export default useAuthorization;
