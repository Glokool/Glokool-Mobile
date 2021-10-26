import { Layout, Text } from "@ui-kitten/components";
import React, { Dispatch } from "react";
import { Pressable, StyleSheet } from "react-native";
import { BubbleProps, IMessage } from "react-native-gifted-chat";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { LocationTitle } from "../../../../assets/icon/Chat";
import { AuthContext } from "../../../../context/AuthContext";
import { setLocation } from "../../../../model/Chat/Chat.Location.model";
import { setLocationVisiblityTrue } from "../../../../model/Chat/Chat.UI.model";
import { LocationBubbleMessage } from "../../../../types";


export const renderCustomBubble = (props: BubbleProps<IMessage> & LocationBubbleMessage, dispatch : Dispatch<any>) => {

    // Mapview (My Location) 출력을 위한 코드
    if (props.currentMessage.messageType === 'location') {

        return (
            <Pressable
                onPress={() => {
                    dispatch(setLocationVisiblityTrue());
                    dispatch(setLocation({ lat: props.currentMessage.location.lat, lon: props.currentMessage.location.lon }))
                }}
                style={styles.MyLocationContainer}
            >
                <Layout style={styles.MyLocationHeaderContainer}>
                    <LocationTitle />
                    <Text style={styles.MyLocationHeaderText}>My Location</Text>
                </Layout>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ width: 250, height: 125, margin: 10 }}
                    region={{
                        latitude: parseFloat(
                            props.currentMessage.location.lat,
                        ),
                        longitude: parseFloat(
                            props.currentMessage.location.lon,
                        ),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                        
                    <Marker
                        coordinate={{
                            latitude: parseFloat(
                                props.currentMessage.location.lat,
                            ),
                            longitude: parseFloat(
                                props.currentMessage.location.lon,
                            ),
                        }}
                        title={'My Location'}
                    />
                </MapView>
            </Pressable>
        );
    }
};

const styles = StyleSheet.create({

    MyLocationContainer: {
        backgroundColor: '#00FF0000'
    },

    MyLocationHeaderContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#00FF0000'
    },

    MyLocationHeaderText: {
        textAlign: 'right',
        marginTop: 5,
        marginRight: 10,
        color: '#8C8C8C',
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 17,
        marginLeft: 5
    },
    
})