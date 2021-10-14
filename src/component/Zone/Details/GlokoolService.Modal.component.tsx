import React, {  } from 'react';
import { Layout, Text, Modal } from '@ui-kitten/components';
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { GlokoolService, CloseButton } from '../../../assets/icon/Series';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../model';
import { setGloServiceVisibilityFalse } from '../../../model/Zone/Zone.UI.model';

const windowWidth = Dimensions.get('window').width;

export const GlokoolServiceModal = (props: any) => {

    const gloServiceVisibility = useSelector((state: RootState) => state.ZoneUIModel.gloServiceVisibility);
    const dispatch = useDispatch();

    return (
        <Modal
            visible={gloServiceVisibility}
            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
            onBackdropPress={() => dispatch(setGloServiceVisibilityFalse())}
        >
            <Layout style={{ padding: 30, borderRadius: 20, }}>
                <Layout style={styles.TopContainer}>
                    <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.TitleText}>GloChat Services </Text>
                        <GlokoolService />
                    </Layout>
                    <TouchableOpacity onPress={() => dispatch(setGloServiceVisibilityFalse())} style={styles.CloseButton}>
                        <CloseButton />
                    </TouchableOpacity>
                </Layout>
                <Layout>
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
    },
    TopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        flex: 1,
    },
    TitleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
        color: '#7777ff'
    },
    CloseButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})