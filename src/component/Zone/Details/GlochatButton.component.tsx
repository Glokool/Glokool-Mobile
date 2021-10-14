import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PurpleArrow } from '../../../assets/icon/Common';
import { NavigatorRoute } from '../../../navigation/app.route';

const windowWidth = Dimensions.get('window').width;

export const GloChatButton = (props: any) => {
    return (
        <View style={styles.MainContainer}>
            <PurpleArrow style={styles.PurpleArrow} />
            <View style={styles.InnerContainer}>
                <View style={styles.GloChatTextContainer}>
                    <Text style={{ fontFamily: 'BrandonGrotesque-BoldItalic', color: 'white', fontSize: 19 }}>
                        GO TO GloChat
                    </Text>
                    <Text style={styles.Description}>
                        {`Can't find the information you need?`}
                        {'\n'}
                        {`Ask our travel assistants for more! `}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate(NavigatorRoute.CHAT)}>
                    <View style={styles.GloChatButtonContainer}>
                        <Text style={{ fontFamily: 'BrandonGrotesque-BoldItalic', color: '#7777ff', fontSize: 15 }}>
                            CLICK
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#7777FF',
        width: windowWidth,
    },
    PurpleArrow: {
        position: 'absolute',
        top: -20,
        left: 20,
    },
    InnerContainer: {
        backgroundColor: '#0000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
    },
    GloChatTextContainer: {
        backgroundColor: '#0000',
        padding: 20,
    },
    Description: {
        color: '#FFFFFF',
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
    },
    GloChatButtonContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 35,
        paddingVertical: 40,
    },
})