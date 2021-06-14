import { LayoutElement, Spinner } from '@ui-kitten/components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PaymentLoading = () : LayoutElement  => {
  const { container } = styles;
  return (
    <View style={container}>
      <Spinner size={'giant'}/>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
