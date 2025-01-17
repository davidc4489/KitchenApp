import { createContext, useContext } from 'react';

const UserToUpdateContext = createContext();

export const UpdateUserProvider = ({ children }) => {

    const id = localStorage.getItem("id")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const password = localStorage.getItem("password")
    const permission = localStorage.getItem("permission")

  // Receive user data from user context
  const userSetter = (updatedUser) => {
    localStorage.setItem("id", updatedUser.id)
    localStorage.setItem("name", updatedUser.שם)
    localStorage.setItem("email", updatedUser.מייל)
    localStorage.setItem("password", updatedUser.סיסמה)
    localStorage.setItem("permission", updatedUser.הרשאה)
  }

  return (
    <UserToUpdateContext.Provider value={{ id, name, email, password, permission, userSetter }}>
      {children}
    </UserToUpdateContext.Provider>
  );
};

export const useUserUpdate = () => useContext(UserToUpdateContext);