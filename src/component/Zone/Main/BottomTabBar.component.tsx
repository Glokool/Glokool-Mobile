import React from 'react';
import { Animated, FlatList, GestureResponderEvent, Pressable, StyleSheet, Platform } from 'react-native';
import { Layout, Text, Divider, Button } from '@ui-kitten/components'
import { ZoneMainSceneProps } from '../../../navigation/ScreenNavigator/Zone.navigator';
import { windowHeight, windowWidth } from '../../../Design.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { setLocationVisiblityFalse, setLocationVisiblityTrue } from '../../../model/Zone/Zone.UI.model';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Check } from '../../../assets/icon/Zone';

export const ZoneMainBottomTabBarComponent = (props: ZoneMainSceneProps) => {

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
                duration: 1000,
                toValue: -(windowHeight * 0.3),
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
        }, 800);
    };

    const renderButton = (item: any): React.ReactElement => {

        const buttonStyle = item.index === selectedButton ? styles.SelectedButton : styles.UnselectedButton;

        return (
            <TouchableOpacity onPress={() => setSelectedButton(item.index)}>
                <FastImage
                    source={item.item}
                    style={buttonStyle}
                    resizeMode={'stretch'}
                />
                {item.index === selectedButton && <Check style={styles.SelectedIcon} />}
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
                            data={tempData}
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
        bottom: Platform.OS === 'ios' ? -(windowHeight * 0.21) : -(windowHeight * 0.3),
        width: windowWidth,
        height: windowHeight * 0.3,
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
    },
    ZoneButtonContainer: {
        flexDirection: 'row'
    },
    UnselectedButton: {
        width: windowWidth * 0.43,
        height: windowWidth * 0.19,
        margin: 5,
    },
    SelectedButton: {
        width: windowWidth * 0.43,
        height: windowWidth * 0.19,
        borderWidth: 3,
        borderColor: '#7777ff',
        borderRadius: 10,
    },
    SelectedIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
})
