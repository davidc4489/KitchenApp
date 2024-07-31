import { createContext, useEffect, useContext, useState } from 'react';
import { useUserUpdate } from './UserToUpdateContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [user, setUser] = useState(localStorage.getItem('user')? localStorage.getItem('user') : null);
  const [access, setAccess] = useState(localStorage.getItem('access')? true : false);
  const [directionAccess, setDirectionAccess] = useState(localStorage.getItem('directionAccess')? true : false);
  const [accessAlert, setAccessAlert] = useState(localStorage.getItem('accessAlert')? true : false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/users/`)
        .then(response => response.json())
        .then(data => setData(data))
  }, [data])

  const {userSetter} = useUserUpdate();

  // Function to check user data from the login page and update local storage accordingly
  const login = (mail, password, permission) => {
    let authenticatedUser = data.find(user => user.מייל === mail && user.סיסמה === password && user.הרשאה === permission)

    setUser(authenticatedUser);

    if (authenticatedUser) {
        setAccess(true)
        userSetter(authenticatedUser)
        localStorage.setItem('access', 'true');
        if (authenticatedUser.הרשאה == 'מנהל'){
            setDirectionAccess(true)
            localStorage.setItem('directionAccess', 'true');
        }
        else{
            setDirectionAccess(false)
            localStorage.removeItem('directionAccess');
        }
    } else{
        setAccess(false)
        localStorage.removeItem('access');
        setDirectionAccess(false)
        localStorage.removeItem('directionAccess');
        localStorage.setItem('accessAlert', 'true');
    }
  };

  const logout = () => {
    setAccess(false);
    // localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('directionAccess');
    localStorage.removeItem('accessAlert');
  };

  return (
    <AuthContext.Provider value={{ user, access, directionAccess, accessAlert, setAccessAlert, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);