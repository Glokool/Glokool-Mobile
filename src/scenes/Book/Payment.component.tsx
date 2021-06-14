
import React from 'react';
import IMP from 'iamport-react-native';
import { PaymentLoading } from '../../component/Booking/PaymentLoading';
import { Layout, LayoutElement } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaymentScreenProps } from '../../navigation/Book.navigator';
import { TopTabBar } from '../../component/Booking';
import { NavigatorRoute, SceneRoute } from '../../navigation/app.route';


export const PaymentScreen = (props : PaymentScreenProps) : LayoutElement => {
  
  const params = props.route.params.params;
  const { pg } = params;
  const data = {
    ...params,
    app_scheme: 'Glokool',
  };

  function callback(response : any) {
    console.log('결과 : ', response);

    props.navigation.replace(NavigatorRoute.BOOK_CONFIRM, {
      screen : SceneRoute.BOOK_FOUTH,
      params: { success : response.imp_success, method: '씨발'}
    })
  }

  return (
    <Layout style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 0}}/>

        <Layout style={{height: 80}}></Layout>
        
        <IMP.Payment
          userCode={'imp70430956'}
          tierCode={''}
          loading={<PaymentLoading />}
          data={data}
          callback={response => callback(response)}
        />
        <TopTabBar index={3}/>
    </Layout>

  );   
}