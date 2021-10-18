import React from 'react';
import { NavigatorRoute } from "../../navigation/app.route";
import { Alert } from 'react-native';

export const loginAlertWindow = (navigation: any) => {
    Alert.alert(
        "Login Request",
        "This service requires login.\n Click 'Continue' to log in.",
        [{
            text: "Cancel",
            onPress: () => console.log("login canceled"),
            style: "destructive"
        }, {
            text: "Continue",
            onPress: () => navigation.navigate(NavigatorRoute.AUTH),
            style: "default"
        }]
    );
}
