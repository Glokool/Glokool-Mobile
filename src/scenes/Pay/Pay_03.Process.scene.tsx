import React from 'react';
import { StyleSheet } from 'react-native';
import IMP, { CallbackRsp } from 'iamport-react-native';
import { Layout, LayoutElement } from '@ui-kitten/components';
import { SceneRoute } from '../../navigation/app.route';
import { PayProcessSceneProps } from '../../navigation/Pay.navigator';
import { CommonTopTabBar } from '../../component/Common';
import { PaySecondPage } from '../../assets/icon/Pay';
import { Loading } from '../../component/Common';

export const PayProcessScene = (props: PayProcessSceneProps): LayoutElement => {

    const callback = (response: CallbackRsp) => {

        const data = props.route.params.ReservationData;        
        Object.assign( data, { Payment : props.route.params.params });

        // props.navigation.reset({
        //     routes: [{
        //         name: SceneRoute.PAY_SUCCESS,
        //         params: props.route.params.ReservationData
        //     }]
        // });

        if (response.imp_success === "true") {
            props.navigation.reset({
                routes: [{
                    name: SceneRoute.PAY_SUCCESS,
                    params: props.route.params.ReservationData
                }]
            });
        } else {
            props.navigation.navigate(SceneRoute.PAY_FAILED);            
        }
    }

    return (
        <Layout style={{ width: '100%', height: '100%' }}>

            {/* top tap bar */}
            <CommonTopTabBar
                title={'PAYMENT INFORMATION'}
                child={
                    <Layout style={styles.Pagination}>
                        <PaySecondPage />
                    </Layout>
                } />

            <IMP.Payment
                userCode={'imp70430956'}
                tierCode={''}
                loading={
                    <Loading />
                }
                data={props.route.params.params}
                callback={(response) => callback(response)}
            />

        </Layout>
    );
}

const styles = StyleSheet.create({
    Pagination: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    Loading: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});