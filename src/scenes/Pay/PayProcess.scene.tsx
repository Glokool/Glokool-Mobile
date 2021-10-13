import React from 'react';
import { SafeAreaView, ScrollView, Dimensions, StyleSheet } from 'react-native';
import IMP, { CallbackRsp } from 'iamport-react-native';
import { PaymentLoading } from '../../component/Booking/PaymentLoading';
import { Layout, LayoutElement } from '@ui-kitten/components';
import { PaymentScreenProps } from '../../navigation/Book.navigator';
import { TopTabBar } from '../../component/Booking';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';
import { PayProcessSceneProps } from '../../navigation/Pay/Pay.navigator';
import { CommonTopTabBar } from '../../component/Common';
import { PaySecondPage } from '../../assets/icon/Pay';

export const PayProcessScene = (props: PayProcessSceneProps): LayoutElement => {
    const params = props.route.params;

    function callback(response: CallbackRsp) {
        console.log(response)

        if (response.imp_success === "true") {
            props.navigation.reset({
                routes: [{ name: SceneRoute.PAY_SUCCESS }]
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
                navigation={props.navigation}
                child={
                    <Layout style={styles.Pagination}>
                        <PaySecondPage />
                    </Layout>
                } />

            <IMP.Payment
                userCode={'imp70430956'}
                tierCode={''}
                loading={<PaymentLoading />}
                data={props.route.params}
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
});