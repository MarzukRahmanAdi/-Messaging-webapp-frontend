import React, { useState } from "react";

export const UsersContext = React.createContext();



export const UsersProvider = (props) => {
    const [user , setUser] = useState([])
    return (
      <UsersContext.Provider value={[user , setUser]}>
        {props.children}
      </UsersContext.Provider>
    );
  };