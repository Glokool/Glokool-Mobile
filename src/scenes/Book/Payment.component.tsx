
import React from 'react';
import IMP from 'iamport-react-native';
import { PaymentLoading } from '../../component/Booking/PaymentLoading';
import { Layout, StyleService } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopTabBar } from '../../component/Booking';


export const Payment = ({ navigation, route }) => {
  const params = route.params.params;
  const { pg } = params;
  const data = {
    ...params,
    app_scheme: 'Glokool',
  };

  return (
    <Layout style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 0}}/>

        <Layout style={{height: 80}}></Layout>
        
        <IMP.Payment
          userCode={'imp70430956'}
          tierCode={''}
          loading={<PaymentLoading />}
          data={data}
          callback={response => console.log(response)}
        />

        <TopTabBar index={3}/>

    </Layout>

  );   
}