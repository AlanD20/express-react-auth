const config = {
  server: import.meta.env.VITE_SERVER_HOST,
  api: {
    users: {
      session: () => `${config.server}/api/users/session`,
      all: () => `${config.server}/api/users`,
      login: () => `${config.server}/api/users/login`,
      register: () => `${config.server}/api/users`,
      block: () => `${config.server}/api/users/block`,
      unblock: () => `${config.server}/api/users/unblock`,
      destroy: () => `${config.server}/api/users`,
      logout: () => `${config.server}/api/users/logout`,
    },
  },
};

export default config;
