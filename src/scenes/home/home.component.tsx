import React from "react"
import { Layout, LayoutElement } from "@ui-kitten/components"
import { HomeScreenProps } from "../../navigation/home.navigator"
import { PermissionsAndroid, Platform } from "react-native"
import Geolocation from "@react-native-community/geolocation"
import axios from "axios"




export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

    const getWeatherInfo = async() => {

        if (Platform.OS === 'android'){
          const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: "Glokool Guide Location Permission",
                message:
                  "If you want to share your current location with the guide, grant permission",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
          );
          
        if (granted === PermissionsAndroid.RESULTS.GRANTED){
            await Geolocation.getCurrentPosition(
                position => {                                 
                               
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${WEATHERKEY}`)
                      .then((result) => {
                        console.log(result)
                      })
                      .catch((err) => {
                        console.log('날씨 에러 : ', err)
                      })
    
                    
    
                },
                error => {
                    console.log("The location could not be loaded because ", error.message),
                    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
                });
        }
        }
      }


    return(
        <Layout>
        </Layout>
    )
}