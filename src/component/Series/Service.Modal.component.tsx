import React, { useState, useEffect } from 'react';
import { Layout, Text, Modal } from '@ui-kitten/components';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { GlokoolService, CloseButton } from '../../assets/icon/Series';

export const ServiceModal = (props: any) => {

    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        if(props.isVisible){
            setVisible(true);
        }
    })

    return (
        <Modal
            visible={visible}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onBackdropPress={() => setVisible(false)}
        >
            <Layout style={{ padding: 30, borderRadius: 20, }}>
                <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, }}>
                    <Layout style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 15 }}>GloChat Services</Text>
                        <GlokoolService />
                    </Layout>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <CloseButton />
                    </TouchableOpacity>
                </Layout>
                <Layout style={{ marginRight: 45, }}>
                    {props.data?.glokoolService.map((item: any, index: number) => (
                        <Text style={styles.IndexText}>
                            {index + 1}
                            <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 16 }}>{`    ${item}`}</Text>
                        </Text>
                    ))}
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