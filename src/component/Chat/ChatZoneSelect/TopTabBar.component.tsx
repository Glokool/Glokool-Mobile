import React from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ArrowLeft } from '../../../assets/icon/Common';
import { ChatZoneSelectSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { SafeAreaView } from 'react-native-safe-area-context';


export const ZoneSelectTopTabBarComponent = (props: ChatZoneSelectSceneProps): React.ReactElement => {

    const PressBackButton = () => {
        props.navigation.goBack();
    }

    return (
        <Layout style={styles.MainContainer}>

            <Pressable
                style={styles.LeftIcon}
                onPress={() => PressBackButton()}>
                <ArrowLeft />
            </Pressable>

            <Layout style={styles.TitleContainer}>
                <Text style={styles.Title}>ZONES</Text>
            </Layout>

            <Layout style={styles.EmptyContainer} />
        </Layout>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        top: isIphoneX() ? getStatusBarHeight() : 0,
        height: 60,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    TitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00FF0000'
    },

    Title: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        backgroundColor: '#00FF0000'
    },

    LeftIcon: {
        width: 10,
        height: 10,
        marginHorizontal: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: '#00FF0000'
    },

    EmptyContainer: {
        width: 10,
        height: 10,
        marginHorizontal: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#00FF0000'
    }
})