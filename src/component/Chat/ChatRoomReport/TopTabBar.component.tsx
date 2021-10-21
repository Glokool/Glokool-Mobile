import React from 'react';
import auth from '@react-native-firebase/auth';
import { Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ArrowLeft } from '../../../assets/icon/Common';
import { ChatReportScreenProps } from '../../../navigation/ScreenNavigator/Chat.navigator';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';



export const ReportTopTabBar = ({ props, value } : { props : ChatReportScreenProps, value : string}) : React.ReactElement => {

    const PressBackButton = () => {
        props.navigation.goBack();
    }

    const PressSend = () => {
        console.log(value)

    }

    return (
        <Layout style={styles.TopTabBar}>

            <SafeAreaView style={{flex: 0}}/>

            <Layout style={styles.MainContainer}>            
                <Pressable
                    style={styles.LeftIcon}
                    onPress={() => {PressBackButton()}}>
                    <ArrowLeft />
                </Pressable>

                <Layout style={styles.TitleContainer}>
                    <Text style={styles.Title}>REPORT</Text>
                </Layout>

                <Pressable style={styles.RightIcon} onPress={() => {PressSend()}}>
                    <FastImage source={require('../../../assets/image/Chat/SendButton.png')} style={styles.RightButton}/>
                </Pressable>
            </Layout>     
        </Layout>
       

    );
}

const styles = StyleSheet.create({

    TopTabBar : {
        position: 'absolute',
        width: '100%',
        top: isIphoneX()? getStatusBarHeight() : 0,
        height: 60,
        justifyContent: 'center',
    },

    MainContainer : {
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        top: 0,
        height: 60,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth : 1,
        borderBottomColor : '#F0F0F0'
    },

    TitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    Title: {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 16,
        color: 'black',
        textAlign : 'center'
    },

    
    LeftIcon : {
        width: 64,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },

    RightIcon : {
        width: 64,
        height : 32,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

    RightButton : {
        width : 64,
        height : 32
    }

})