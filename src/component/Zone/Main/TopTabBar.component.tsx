import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ZoneMainSceneProps } from '../../../navigation/ScreenNavigator/Zone.navigator';
import { windowHeight, windowWidth } from '../../../Design.component';
import { TopTabButton } from '../../../assets/icon/Zone';
import { useDispatch } from 'react-redux';
import { setLocationVisiblityTrue } from '../../../model/Zone/Zone.UI.model';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ZoneMainTopTabBarComponent = (props: ZoneMainSceneProps): React.ReactElement => {

    const dispatch = useDispatch();

    return (
        <Layout style={styles.TopTabBarContainer}>
            <SafeAreaView />
            <Pressable style={styles.ZoneButtonContainer} onPress={() => dispatch(setLocationVisiblityTrue())}>
                <Text style={styles.ZoneButtonText}>HONGDAE</Text>
                <TopTabButton style={styles.ZoneButtonIcon} />
            </Pressable>

        </Layout>
    )

}

const styles = StyleSheet.create({

    TopTabBarContainer: {
        height: windowHeight * 0.07,
        minHeight: 53,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        padding: 10
    },
    ZoneButtonContainer: {
        borderRadius: 22,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    ZoneButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        color: 'black',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 5,
        textAlign: 'center'
    },
    ZoneButtonIcon: {
        minWidth: 27,
        minHeight: 27,
        width: windowWidth * 0.065,
        height: windowWidth * 0.065,
        marginLeft: 5
    }


})