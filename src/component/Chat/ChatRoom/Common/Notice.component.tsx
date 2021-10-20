import React from 'react';
import { Animated, GestureResponderEvent, Pressable, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { AngleDown_Gray, Dismiss_Button, NoticeClose_Button } from '../../../../assets/icon/Chat';


export const NoticeComponent = (props : any) : React.ReactElement => {


    const heightLevel = new Animated.Value(100);
    const [visiblity, setVisiblity] = React.useState(false);
    const [upDown, setUpDown] = React.useState(false);

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

    return (
        <Animated.View style={[styles.container, { height : heightLevel }]}>


            {(upDown)? 
                <Layout style={styles.ButtonContainer}>
                    <Pressable>
                        <Dismiss_Button />
                    </Pressable>

                    <Pressable onPress={() => setUpDown(false)}>
                        <NoticeClose_Button />
                    </Pressable>
                </Layout>
            :
                <Pressable style={styles.Button} onPress={() => setUpDown(true)}>
                    <AngleDown_Gray />
                </Pressable>            
            }
            
        </Animated.View>



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

    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    Button : {
        alignSelf : 'flex-end',
        justifyContent: 'center'
    }
})
