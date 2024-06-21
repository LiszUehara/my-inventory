import { createContext, useState } from 'react';

const AppContext = createContext({
  loggedUser: null,
});

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AppContextProvider = ({ children }) => {
  const token = sessionStorage.getItem('@token');

  const [loggedUser, setLoggedUser] = useState(parseJwt(token));

  function signOut() {
    sessionStorage.removeItem('@token');

    setLoggedUser(null);
  }

  function signIn(token) {
    sessionStorage.setItem('@token', token);

    setLoggedUser(parseJwt(token));
  }

  console.log('Carreguei!');

  return (
    <AppContext.Provider value={{ loggedUser, setLoggedUser, signOut, signIn }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };

export default AppContextProvider;