import React from 'react';
import { Animated, FlatList, GestureResponderEvent, Pressable, StyleSheet, Platform, Text, Alert, StatusBar, Dimensions } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components'
import { ZoneMainSceneProps } from '../../../navigation/SceneNavigator/Zone.navigator';
import { windowHeight, windowWidth } from '../../../Design.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { setLocationVisiblityFalse } from '../../../model/Zone/Zone.UI.model';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Check } from '../../../assets/icon/Zone';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { setZoneLocation } from '../../../model/Zone/Zone.Location.model';

const screenHeight = Dimensions.get('screen').height;
const WindowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - WindowHeight + StatusBar?.currentHeight;



export const ZoneMainBottomTabBarComponent = (props: ZoneMainSceneProps) => {

    console.log(navbarHeight, ' ' , screenHeight, ' ',WindowHeight, ' ', StatusBar.setHidden(false));

    const heightLevel = new Animated.Value(0);

    const locationVisiblity = useSelector((state: RootState) => state.ZoneUIModel.locationVisiblity);
    const locationIndex = useSelector((state: RootState) => state.ZoneLocationModel.index);
    const dispatch = useDispatch();

    const tempData = [
        require('../../../assets/image/Zone/Button001.png'),
        require('../../../assets/image/Zone/Button002.png'),
        require('../../../assets/image/Zone/Button003.png'),
        require('../../../assets/image/Zone/Button004.png'),
    ]

    React.useEffect(() => {
        if (locationVisiblity) {
            Animated.timing(heightLevel, {
                duration: 1000,
                toValue: Platform.OS === 'ios' ? -(windowHeight * 0.3) : -(windowHeight * 0.33),
                useNativeDriver: false
            }).start();
        }
    }, [locationVisiblity]);

    const BottomTabBarMovement = () => {
        return {
            transform: [
                { translateY: heightLevel }
            ]
        }
    }

    const PressBackdrop = (e: GestureResponderEvent): void => {
        e.stopPropagation();

        Animated.timing(heightLevel, {
            duration: 1000,
            toValue: windowHeight,
            useNativeDriver: false
        }).start();

        setTimeout(() => {
            return dispatch(setLocationVisiblityFalse());
        }, 500);
    };

    const onPressLocation = (item: any) => {
        if (item.index > 1) {
            Alert.alert("", "Coming Very Soon!\nWe are working very hard to open new zones. Please stay tuned!");
        } else {
            dispatch(setZoneLocation(item.item.title, item.index));
        }
    }

    const renderButton = (item: any): React.ReactElement => {
        return (
            <TouchableOpacity style={styles.ButtonStyle} onPress={() => onPressLocation(item)}>
                <FastImage
                    source={tempData[item.index]}
                    style={[styles.ImageStyle, { borderColor: item.index === locationIndex ? '#7777ff' : '#0000' }]}
                    resizeMode={'stretch'}
                />
                {item.index === locationIndex && <Check style={styles.SelectedIcon} />}
                <Text style={styles.ButtonText}> {item.item.title.toUpperCase()} </Text>
            </TouchableOpacity>
        )
    }


    return (
        <>
            {locationVisiblity && (
                <Pressable style={styles.BackdropContainer} onPress={(e) => PressBackdrop(e)}>

                    <Animated.View style={[styles.BottomButtonContainer, BottomTabBarMovement()]}>
                        <Divider style={styles.Divider} />
                        <FlatList
                            data={props.zoneList}
                            renderItem={renderButton}
                            numColumns={2}
                        />
                    </Animated.View>

                </Pressable>
            )}
        </>
    )

}

const styles = StyleSheet.create({
    BackdropContainer: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
    },

    BottomButtonContainer: {
        position: 'absolute',
        bottom: (Platform.OS === 'ios')? -(windowWidth * 0.55) : - (windowHeight * 0.3) ,
        width: windowWidth,
        height: (Platform.OS === 'ios')? (windowHeight * 0.3) : (windowHeight * 0.4),
        zIndex: 100,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        alignItems: 'center',
    },
    Divider: {
        backgroundColor: '#707070',
        width: 78,
        height: 3,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 100,
    },
    ZoneButtonContainer: {
        flexDirection: 'row'
    },
    ButtonStyle: {
        width: windowWidth * 0.43,
        height: windowWidth * 0.43 / 360 * 160,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageStyle: {
        width: windowWidth * 0.43,
        height: windowWidth * 0.43 / 360 * 160,
        borderRadius: 15,
        borderWidth: 3,
    },
    SelectedIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    ButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 13,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
        position: 'absolute'
    },
})

