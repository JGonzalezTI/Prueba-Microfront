const REMOTE_URLS = {
  development: {
    userList: 'http://localhost:5001/assets/remoteEntry.js'
  },
  production: {
    userList: 'https://tu-dominio.com/user-list/assets/remoteEntry.js'
  }
};

export const getRemoteUrl = (remoteName) => {
  const env = process.env.NODE_ENV || 'development';
  return REMOTE_URLS[env][remoteName];
};

export const sharedDependencies = {
  react: {
    singleton: true,
    requiredVersion: '^18.2.0'
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '^18.2.0'
  }
}; 