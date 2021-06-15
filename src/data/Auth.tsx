import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const AuthUser = () => {

    const [GlokoolUser, setGlokoolUser] = React.useState<FirebaseAuthTypes.User | null>(null);    
    
    auth().onAuthStateChanged(function(user) {
        if (user) {
            
            if(user.emailVerified === false){
                auth().signOut();
                setGlokoolUser(null)
            }
            else{
                setGlokoolUser(user);
            }
        } else {
            setGlokoolUser(null);
        }
    });


    return GlokoolUser;

}

