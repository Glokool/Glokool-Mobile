import React from 'react';
import { authContextType } from '../types';

const user = {
    currentUser: {
        access_token: "",
        expiry_date: 0,
        displayName: "",
        email: "",
        photoURL: "",
        uid: "",
    },
    setCurrentUser: (newState: authContextType | null) => { newState },
};

export const AuthContext = React.createContext(user);
