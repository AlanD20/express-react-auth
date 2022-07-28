import { useRef } from 'react';
import Layout from '@comp/Layout';
import Button from '@comp/Button';
import config from '@/common/config';
import TextInput from '@comp/TextInput';
import TitleText from '@comp/TitleText';
import useSession from '@/hooks/useSession';
import AlertStatus from '@comp/AlertStatus';
import { useFetch } from '@/hooks/useFetch';
import { useAppDispatch } from '@/common/store';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthSession } from '@/features/sessionSlice';
import { setError, setSuccess } from '@/features/alertSlice';

const Login = () => {
  const email = useRef<String>('');
  const password = useRef<String>('');

  const navigate = useNavigate();
  const { setSessionStorage } = useSession();
  const fetchRequest = useFetch();
  const dispatch = useAppDispatch();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await fetchRequest({
      url: config.api.users.login(),
      method: 'POST',
      data: {
        email: email.current,
        password: password.current,
      },
    });

    if (data?.code === 200) {
      setSessionStorage({
        email: data.user.email,
        token: data.user.token,
      });
      dispatch(
        setAuthSession({
          user: {
            name: data.user.name,
            email: data.user.email,
            token: data.user.token,
          },
        })
      );
      dispatch(setSuccess({ success: data?.message }));
      navigate('/', { replace: true });
    } else {
      dispatch(setError({ error: data?.errors ?? data?.message }));
    }
  };

  return (
    <Layout>
      <TitleText text="Login Form" />
      <form
        className="form-control w-[40ch] relative"
        onSubmit={handleOnSubmit}
      >
        <TextInput
          label="Email Address:"
          type="email"
          name="email"
          onChange={(e) => (email.current = e.target.value.trim())}
          required
          autoComplete="username"
        />
        <TextInput
          label="Password:"
          type="password"
          name="password"
          onChange={(e) => (password.current = e.target.value.trim())}
          required
          autoComplete="current-password"
        />
        <Button label="Login" />

        <span className="mt-2">
          Don't have an account?
          <Link
            to="/register"
            className="text-purple-600 hover:underline hover:text-primary-focus transition-colors duration-150 ease-out"
          >
            {' '}
            Create a new one!
          </Link>
        </span>
        <AlertStatus />
      </form>
    </Layout>
  );
};
export default Login;
