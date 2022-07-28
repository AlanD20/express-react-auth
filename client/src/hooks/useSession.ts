interface SessionState {
  email: string;
  token: string;
}

const useSession = () => {
  const KEY = 'UserSession';

  const setSessionStorage = (data: SessionState) => {
    localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  };

  const getSessionStorage = () => {
    const value = localStorage.getItem(KEY);
    if (!value) return null;

    return JSON.parse(value);
  };

  const clearSessionStorage = () => localStorage.setItem(KEY, '');

  return {
    setSessionStorage,
    getSessionStorage,
    clearSessionStorage,
  };
};

export default useSession;
