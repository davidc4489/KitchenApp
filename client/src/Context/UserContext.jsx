import { createContext, useEffect, useContext, useState } from 'react';
import { useUserUpdate } from './UserToUpdateContext';
import Fetch from '../Tools/Fetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [dataUsers, setDataUsers] = useState([])
  const [user, setUser] = useState(localStorage.getItem('user')? localStorage.getItem('user') : null);
  const [access, setAccess] = useState(localStorage.getItem('access')? true : false);
  const [directionAccess, setDirectionAccess] = useState(localStorage.getItem('directionAccess')? true : false);
  const [accessAlert, setAccessAlert] = useState(localStorage.getItem('accessAlert')? true : false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    Fetch(`http://localhost:4000/api/users`, setDataUsers)
  }, [dataUsers])

  const {userSetter} = useUserUpdate();

  // Function to check user data from the login page and update local storage accordingly
  const login = (mail, password, permission) => {
    let authenticatedUser = dataUsers.find(user => user.מייל === mail && user.סיסמה === password && user.הרשאה === permission)

    fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail, password, permission }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          const authenticatedUser = data.authenticatedUser; // Assurez-vous que votre réponse contient les informations utilisateur
          setUser(authenticatedUser);
          setAccess(true);
          userSetter(authenticatedUser);

          // Stocker le token dans localStorage
          localStorage.setItem('token', data.token);
          setToken(data.token);
          localStorage.setItem('access', 'true');
          localStorage.setItem('user', JSON.stringify(authenticatedUser));
          if (authenticatedUser.הרשאה == 'מנהל'){
              setDirectionAccess(true)
              localStorage.setItem('directionAccess', 'true');
          }
          else{
              setDirectionAccess(false)
              localStorage.removeItem('directionAccess');
          }

      } else {
        setAccess(false)
        localStorage.removeItem('access');
        setDirectionAccess(false)
        localStorage.removeItem('directionAccess');
        localStorage.setItem('accessAlert', 'true');
      }
    })
    .catch(error => {
      console.error('Erreur de connexion:', error);
    });
};

  const logout = () => {
    setAccess(false);
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    setToken('');
    localStorage.removeItem('access');
    localStorage.removeItem('directionAccess');
    localStorage.removeItem('accessAlert');
  };

  return (
    <AuthContext.Provider value={{ user, access, directionAccess, accessAlert, setAccessAlert, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);