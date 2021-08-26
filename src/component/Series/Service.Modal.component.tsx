import React, { useState, useEffect } from 'react';
import { Layout, Text, Modal } from '@ui-kitten/components';
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { GlokoolService, CloseButton } from '../../assets/icon/Series';

const windowWidth = Dimensions.get('window').width;

export const ServiceModal = (props: any) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (props.isVisible) {
            setVisible(true);
        }
    })

    return (
        <Modal
            visible={visible}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
            onBackdropPress={() => setVisible(false)}
        >
            <Layout style={{ padding: 30, borderRadius: 20, }}>
                <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, width: windowWidth * 0.7 }}>
                    <Layout style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 15 }}>GloChat Services</Text>
                        <GlokoolService />
                    </Layout>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <CloseButton />
                    </TouchableOpacity>
                </Layout>
                <Layout style={{ marginRight: 0, }}>
                    {props.data?.glokoolService != null &&
                        props.data?.glokoolService != undefined ? (
                            props.data?.glokoolService.map((item: any, index: number) => (
                                <Text style={styles.IndexText}>
                                    {index + 1}
                                    <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 16 }}>{`    ${item}`}</Text>
                                </Text>
                            ))
                         ) : null}

                </Layout>
            </Layout>
        </Modal>
    )
}

const styles = StyleSheet.create({
    IndexText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        color: '#8797FF',
    }
})