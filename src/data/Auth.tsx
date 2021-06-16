import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const AuthUser = () => {

    const [GlokoolUser, setGlokoolUser] = React.useState<FirebaseAuthTypes.User | null>(null);    
    
    auth().onAuthStateChanged(function(user) {
        if (user) {
            setGlokoolUser(user);

        } else {
            setGlokoolUser(null);
        }
    });


    return GlokoolUser;

}

