import React from 'react';

//  React Context API passes global state from Provider to Consumer w/o intermediary props
const UserContext = React.createContext();
export const Provider = UserContext.Provider;
export const Consumer = UserContext.Consumer;
export default UserContext;
