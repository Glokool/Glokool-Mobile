import React from 'react';
import auth from '@react-native-firebase/auth';
import {    
    TouchableOpacity,
    SafeAreaView,
    Image,
    StyleSheet
} from 'react-native'
import {
    Layout,
    LayoutElement,
    Text,
} from '@ui-kitten/components'
import { Logo } from '../../assets/icon/Home'
import { NavigatorRoute } from '../../navigation/app.route';
import { HomeTopTabBarProps } from '../../navigation/ScreenNavigator/Home.navigator';




export const HomeTopTabBar = (props : HomeTopTabBarProps) : LayoutElement => {

    const user = auth().currentUser;

    function PressLoginButton() {

        props.navigation.navigate(NavigatorRoute.AUTH);

    }

    function PressUserPhoto() {

        props.navigation.navigate(NavigatorRoute.MY);

    }


    return (
        <Layout style={styles.TopTabBarContainer}>
          
            <Layout style={styles.LogoContainer}>
                <SafeAreaView/>
                <Logo />
            </Layout>
            
            <Layout style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00FF0000', marginVertical: 10}}>
                <SafeAreaView style={{flex: 0}} />
                <Layout style={{ flexDirection: 'row', backgroundColor: '#00FF0000' }}>

                    <Layout style={styles.LoginButtonContainer} onTouchStart={() => PressLoginButton()}>
                        {(auth().currentUser)? 
                            <Text style={{ fontSize: 16, fontFamily: 'BrandonGrotesque-Medium', marginHorizontal: 15}} numberOfLines={1}>{`Hi ! I'm ${auth().currentUser?.displayName}`}</Text>
                        :
                            <Text style={{ fontSize: 16, fontFamily: 'BrandonGrotesque-Medium', color: '#B8B7B5', marginHorizontal: 15}}>{`Login`}</Text>
                        }                  
                    </Layout>



                    <TouchableOpacity onPress={() => PressUserPhoto()} style={{ backgroundColor: '#00FF0000'}}>
                        {(user)?
                            (user.photoURL != '')?
                            <Image source={{uri : user.photoURL}} style={{ width: 34, height: 34, borderRadius: 50, backgroundColor: '#00FF0000' }}/>
                            :
                            <Layout style={{ width: 34, height: 34, borderRadius: 50, backgroundColor: '#D2D2D2' }}/>
                        :
                            <Layout style={{ width: 34, height: 34, borderRadius: 50, backgroundColor: '#D2D2D2' }}/>
                        }
                    </TouchableOpacity>
                    
                </Layout>
                
            </Layout>

        </Layout>
    )
}

const styles = StyleSheet.create({
    TopTabBarContainer: {
        position: 'absolute', 
        top: 0,
        width: '100%', 
        height: 80,
        paddingHorizontal: 40,
        paddingTop: 30,
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        backgroundColor: 'white'
    },
    LogoContainer : {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        backgroundColor: '#00FF0000'
    },
    LoginButtonContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 5,
    }

});