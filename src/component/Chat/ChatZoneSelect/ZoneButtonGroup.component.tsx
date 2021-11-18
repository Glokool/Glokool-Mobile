import React from 'react';
import { Pressable, StyleSheet, Text, Alert } from 'react-native';
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

    const onPressButton = (title: string, index: number) => {

        if (index > 1) {
            Alert.alert("", "Coming Very Soon!\nWe are working very hard to open new zones. Please stay tuned!");
        } else {
            props.navigation.navigate(
                SceneRoute.CHAT_TA_SELECT,
                { zone: title }
            )
        }

    }

    return (
        <Layout style={styles.container}>

            {Button.map((item: any, index: number) => (
                <Pressable
                    style={[
                        styles.ButtonContainer,
                        { borderBottomColor: item.color }
                    ]}
                    onPress={() => onPressButton(item.title, index)}>
                    <Text style={styles.ButtonText}>{item.title}</Text>
                    <AngleRight_Gray />
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
        marginVertical: 5,
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
        fontSize: 14,
        textAlign: 'left'
    }

})