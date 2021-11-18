import React from 'react';
import { Layout, Modal, Card, } from '@ui-kitten/components';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { windowHeight, windowWidth } from '../../../../Design.component';
import { Pressable, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../model';
import { setLocationVisiblityFalse, } from '../../../../model/Chat/Chat.UI.model';

export const LocationModal = (): React.ReactElement => {

    const mapVisibility = useSelector((state: RootState) => state.ChatUIModel.locationVisiblity);
    const lat = useSelector((state: RootState) => state.ChatLocationModel.lat);
    const lon = useSelector((state: RootState) => state.ChatLocationModel.lon);
    const dispatch = useDispatch();

    return (
        <Modal
            visible={mapVisibility}
            backdropStyle={styles.BackDrop}
            onBackdropPress={() => dispatch(setLocationVisiblityFalse())}
        >
            <Card disabled={true}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                        width: windowWidth * 0.9,
                        height: windowHeight * 0.8,
                    }}
                    region={{
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lon),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: parseFloat(lat),
                            longitude: parseFloat(lon),
                        }}
                        title={'My Location'}
                    />
                </MapView>
            </Card>
        </Modal>

    )
};

const styles = StyleSheet.create({

    BackDrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    MyLocaionTitleText: {
        fontSize: 17,
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Pretendard-Medium',
        color: 'black'
    }

})

