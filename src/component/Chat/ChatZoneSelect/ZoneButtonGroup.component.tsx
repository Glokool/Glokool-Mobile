import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ChatZoneSelectSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';
import { AngleRight_Gray } from '../../../assets/icon/Common';
import { SceneRoute } from '../../../navigation/app.route';


export const ZoneButtonGroupComponent = (props: ChatZoneSelectSceneProps): React.ReactElement => {

    const Button = [{
        title: "HONGDAE",
        color: "#F9D981",
    }, {
        title: "GWANGHWAMUN",
        color: "#93D8B7"
    }, {
        title: "MYEONGDONG",
        color: "#DD637A",
    }, {
        title: "GANGNAM",
        color: "#A55EBB",
    }]

    return (
        <Layout style={styles.container}>

            {Button.map((item: any, index: number) => (
                <Pressable style={[styles.ButtonContainer, { borderBottomColor: item.color }]} onPress={() => props.navigation.navigate(SceneRoute.CHAT_TA_SELECT, { zone: item.title })}>

                    <Layout style={styles.ButtonTextContainer}>
                        <Text style={styles.ButtonText}>{item.title}</Text>
                    </Layout>

                    <Layout>
                        <AngleRight_Gray />
                    </Layout>

                </Pressable>
            ))}

        </Layout>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
    },

    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderBottomWidth: 4,
    },

    ButtonTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    ButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 16,
        textAlign: 'left'
    }

})