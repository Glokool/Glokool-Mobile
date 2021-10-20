import React from 'react';
import { authContextType } from '../types';

const user = {
    currentUser: {
        access_token: "",
        displayName: "",
        email: "",
        photoURL: "",
        uid: "",
        expiry_date: 0
    },
    setCurrentUser: (newState: authContextType | null) => { newState },
};

export const AuthContext = React.createContext(user);
