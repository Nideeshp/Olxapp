import React, { createContext, useState } from "react";

export const FirebaseContext = createContext(null);

export const AuthContext = createContext(null);

export const Context = ({ children }) => {
  const [user, setUser] = useState('Hello');

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Context; // Export the Context component as default
