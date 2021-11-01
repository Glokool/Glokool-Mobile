import React from 'react';
import { Animated, FlatList, GestureResponderEvent, Pressable, StyleSheet, Platform, Text } from 'react-native';
import { Divider } from '@ui-kitten/components'
import { ZoneMainSceneProps } from '../../../navigation/SceneNavigator/Zone.navigator';
import { windowHeight, windowWidth } from '../../../Design.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { setLocationVisiblityFalse } from '../../../model/Zone/Zone.UI.model';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Check } from '../../../assets/icon/Zone';
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';

export const ZoneMainBottomTabBarComponent = (props) => {

    const heightLevel = new Animated.Value(0);
    const locationVisiblity = useSelector((state: RootState) => state.ZoneUIModel.locationVisiblity);
    const dispatch = useDispatch();

    const [selectedButton, setSelectedButton] = React.useState<number>(0);

    const tempData = [
        require('../../../assets/image/Zone/Button001.png'),
        require('../../../assets/image/Zone/Button002.png'),
        require('../../../assets/image/Zone/Button003.png'),
        require('../../../assets/image/Zone/Button001.png')
    ]

    React.useEffect(() => {

        if (locationVisiblity) {
            Animated.timing(heightLevel, {
                duration: 500,
                toValue: -(windowWidth * 0.55) - 65 - getBottomSpace() / 2,
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

    const PressBackward = (e: GestureResponderEvent): void => {
        e.stopPropagation();

        Animated.timing(heightLevel, {
            duration: 1000,
            toValue: (windowHeight * 0.3),
            useNativeDriver: false
        }).start();

        setTimeout(() => {
            return dispatch(setLocationVisiblityFalse());
        }, 500);
    };

    const renderButton = (item: any): React.ReactElement => {

        const buttonStyle = item.index === selectedButton ? styles.SelectedButton : styles.UnselectedButton;

        return (
            <TouchableOpacity style={buttonStyle} onPress={() => setSelectedButton(item.index)}>
                {/* <FastImage
                    source={item.item}
                    style={buttonStyle}
                    resizeMode={'stretch'}
                /> */}
                {item.index === selectedButton && <Check style={styles.SelectedIcon} />}
                <Text>{item.item.title.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <>
            {locationVisiblity && (
                <Pressable style={styles.BackdropContainer} onPress={(e) => PressBackward(e)}>

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
        bottom: Platform.OS === 'ios' ? -(windowWidth * 0.55) : -(windowWidth * 0.5),
        width: windowWidth,
        height: windowWidth * 0.55,
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
    UnselectedButton: {
        width: windowWidth * 0.43,
        height: windowWidth * 0.19,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    SelectedButton: {
        width: windowWidth * 0.43,
        height: windowWidth * 0.19,
        borderWidth: 3,
        borderColor: '#7777ff',
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    SelectedIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
})

