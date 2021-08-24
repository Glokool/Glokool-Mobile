import React from 'react';
import { SafeAreaView, ScrollView, Dimensions } from 'react-native';
import IMP, { CallbackRsp } from 'iamport-react-native';
import { PaymentLoading } from '../../component/Booking/PaymentLoading';
import { Layout, LayoutElement } from '@ui-kitten/components';
import { PaymentScreenProps } from '../../navigation/Book.navigator';
import { TopTabBar } from '../../component/Booking';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';

export const PaymentScreen = (props: PaymentScreenProps): LayoutElement => {
    const params = props.route.params.params;
    const { pg } = params;
    const data = {
        ...params,
        app_scheme: 'Glokool',
    };

    function callback(response: CallbackRsp) {
        props.navigation.replace(NavigatorRoute.BOOK, {
            screen: SceneRoute.BOOK_FOUTH,
            params: {
                response: response,
                ReservationData: props.route.params.data,
            },
        });
    }

    return (
        <Layout style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ flex: 0 }} />

            <Layout style={{ height: 80 }} />

            <IMP.Payment
                userCode={'imp70430956'}
                tierCode={''}
                loading={<PaymentLoading />}
                data={data}
                callback={(response) => callback(response)}
            />

            <TopTabBar index={3} />
        </Layout>
    );
};
