import { useRef } from 'react';
import Layout from '@comp/Layout';
import Button from '@comp/Button';
import config from '@/common/config';
import TextInput from '@comp/TextInput';
import TitleText from '@comp/TitleText';
import { useFetch } from '@/hooks/useFetch';
import AlertStatus from '@comp/AlertStatus';
import { useAppDispatch } from '@/common/store';
import { Link, useNavigate } from 'react-router-dom';
import { setError, setSuccess } from '@/features/alertSlice';

const Login = () => {
  const name = useRef<String>('');
  const email = useRef<String>('');
  const password = useRef<String>('');
  const passwordConfirm = useRef<String>('');

  const navigate = useNavigate();
  const fetchRequest = useFetch();
  const dispatch = useAppDispatch();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await fetchRequest({
      url: config.api.users.register(),
      method: 'POST',
      data: {
        name: name.current,
        email: email.current,
        password: password.current,
        passwordConfirm: passwordConfirm.current,
      },
    });

    if (data?.code === 200) {
      dispatch(setSuccess({ success: data?.message }));
      navigate('/login', { replace: true });
    } else {
      dispatch(setError({ error: data?.errors }));
    }
  };

  return (
    <Layout>
      <TitleText text="Registration Form" />
      <form
        className="form-control w-[40ch] relative"
        onSubmit={handleOnSubmit}
      >
        <TextInput
          label="Name:"
          type="text"
          name="name"
          onChange={(e) => (name.current = e.target.value.trim())}
          required
        />
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
        <TextInput
          label="Confirm Password:"
          type="password"
          name="passwordConfirm"
          onChange={(e) => (passwordConfirm.current = e.target.value.trim())}
          required
          autoComplete="current-password"
        />
        <Button label="Create Account" />

        <span className="mt-2">
          Already have an account?
          <Link
            to="/login"
            className="text-purple-600 hover:underline hover:text-primary-focus transition-colors duration-150 ease-out"
          >
            {' '}
            Login Here!
          </Link>
        </span>
        <AlertStatus />
      </form>
    </Layout>
  );
};
export default Login;
