import React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { AngleDown_Gray, Dismiss_Button, NoticeClose_Button } from '../../../../assets/icon/Chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatRoomSceneProps } from '../../../../navigation/SceneNavigator/Chat.navigator';


export const NoticeComponent = (props : ChatRoomSceneProps) : React.ReactElement => {

    const heightLevel = new Animated.Value(100);
    const [visiblity, setVisiblity] = React.useState(false);
    const [upDown, setUpDown] = React.useState(false);

    React.useEffect(() => {
        AsyncStorage.getItem(`${props.route.params.id}_noti`)
            .then((value) => {
                if (value === null) {
                    // 한번도 저장되지 않은 값이므로
                    AsyncStorage.setItem(`${props.route.params.id}_noti`, 'true');
                }
                else if (value === 'true') {
                    // 보고 싶다
                    setVisiblity(true);
                }
                else {
                    setVisiblity(false);
                }

            })
            .catch((reason) => {
                console.log('Async Storage Load Error : ', reason);
            })
    }, [])

    React.useEffect(() => {

        if(upDown) {
            Animated.timing(heightLevel, {
                duration: 500,
                toValue: 500,
                useNativeDriver: false
            }).start();
        }

        else {            
            Animated.timing(heightLevel, {
                duration: 500,
                toValue: 100,
                useNativeDriver: false
            }).start();
        }


    }, [upDown])

    const PressDismiss = async() => {
        await AsyncStorage.setItem(`${props.route.params.id}_noti`, 'false');
        setVisiblity(false);
    }


    return (
        <>
        {visiblity?
            <Animated.View style={[styles.container, upDown? styles.openContainer : {}, { height : heightLevel }]}>

            <Text numberOfLines={(upDown)? undefined : 3 }>
{`Hello, welcome to GloChat!
The travel assistance service will begin according to the time option you have chosen in advance.
[Before noon: 11am - 3pm]
[After noon: 3pm - 7pm]
※COVID-19 Safety Regulations※
Please note the following regulations in order to protect each other from the corona virus!
- All indoor facilities restrict groups of over 4 people before 6pm.
- All indoor facilities restrict groups of over 2 people after 6pm.
- All indoor facilities require visitors to fill out a check-in list.
- All public facilities require visitors to wear masks at all times.`}
            </Text>

            {(upDown)?
                null
            :
            <Pressable style={styles.Button} onPress={() => setUpDown(true)}>
                <AngleDown_Gray />
            </Pressable>      
            }


            {(upDown)? 
                <Layout style={styles.ButtonContainer}>
                    <Pressable onPress={() => PressDismiss()}>
                        <Dismiss_Button height={22}/>
                    </Pressable>

                    <Pressable onPress={() => setUpDown(false)}>
                        <NoticeClose_Button height={22}/>
                    </Pressable>
                </Layout>
            :
                null
            }
            
        </Animated.View>
        :
            null
        }
        
        </>


    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: isIphoneX()? getStatusBarHeight() + 60 : 60 ,
        borderWidth : 2.5,
        borderColor: '#C4C4CC',
        marginHorizontal: 5,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        width: '98%',
        zIndex: 100,
        backgroundColor: 'white',
        paddingHorizontal : 10,
        paddingVertical: 15
    },

    openContainer : {
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10
    },

    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width : '100%',
        marginTop: 100
    },

    Button : {
        alignSelf : 'flex-end',
        justifyContent: 'center',
        marginVertical: 10,
    }
})
