import { LayoutElement } from '@ui-kitten/components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PaymentLoading = () : LayoutElement  => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>잠시만 기다려주세요...</Text>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
