import React from 'react';
import { StyleSheet, Pressable, Platform, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ZoneMainSceneProps } from '../../../navigation/SceneNavigator/Zone.navigator';
import { windowWidth } from '../../../Design.component';
import { TopTabButton } from '../../../assets/icon/Zone';
import { useDispatch } from 'react-redux';
import { setLocationVisiblityTrue } from '../../../model/Zone/Zone.UI.model';

export const ZoneMainTopTabBarComponent = (props: ZoneMainSceneProps): React.ReactElement => {

    const dispatch = useDispatch();

    return (
        <Layout style={styles.TopTabBarContainer}>
            <Pressable style={styles.ZoneButtonContainer} onPress={() => dispatch(setLocationVisiblityTrue())}>
                <Text style={styles.ZoneButtonText}>HONGDAE</Text>
                <TopTabButton style={styles.ZoneButtonIcon} />
            </Pressable>
        </Layout>
    )

}

const styles = StyleSheet.create({

    TopTabBarContainer: {
        width: '100%',
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
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