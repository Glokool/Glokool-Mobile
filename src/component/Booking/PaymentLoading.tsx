import React from 'react';
import {  StyleSheet } from 'react-native';
import { Layout, Spinner, LayoutElement } from '@ui-kitten/components';

export const PaymentLoading = () : LayoutElement  => {
  const { container } = styles;
  return (
    <Layout style={container}>
      <Spinner size={'giant'}/>
    </Layout>  
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
