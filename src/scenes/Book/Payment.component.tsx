
import React from 'react';
import IMP from 'iamport-react-native';
import { PaymentLoading } from '../../component/PaymentLoading';
import { Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';


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
        <IMP.Payment
        userCode={'imp70430956'}
        tierCode={''}
        loading={<PaymentLoading />}
        data={data}
        callback={response => console.log(response)}
        />
    </Layout>

  );   
}