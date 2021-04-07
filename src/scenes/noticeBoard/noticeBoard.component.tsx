import React from 'react';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  BackHandler,
  Dimensions,
  Linking
} from 'react-native';
import {
  Layout,
  LayoutElement,
} from '@ui-kitten/components';

var ToastRef : any;
var exitApp : any = undefined;
var timeout : any;




export const NoticeBoardScreen = (props: NoticeBoardScreenProps ): LayoutElement => {





    React.useEffect(() => {
        
    }, [])

    // 백핸들러 적용을 위한 함수
    const focusEvent = useFocusEffect(
        React.useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
        }, [])
    );

    const handleBackButton = () => {
    
        if (exitApp == undefined || !exitApp){
              
          ToastRef.show('Press one more time to exit', 1000);
          exitApp = true;
    
          timeout = setTimeout(() => {
            exitApp = false;
          }, 2000);
        }
    
        else{
          clearTimeout(timeout);
          BackHandler.exitApp();
        }
                   
        return true;
    }


    return(
       <React.Fragment>



       </React.Fragment>
    );
}
