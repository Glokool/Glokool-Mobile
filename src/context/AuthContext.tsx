import React from 'react';

const user = {
    currentUser: null,
    setCurrentUser: () => {},
};

export const AuthContext = React.createContext(user);
