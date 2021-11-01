import React from 'react';
import { StyleSheet, } from 'react-native';
import { Input, InputElement, InputProps } from '@ui-kitten/components';
import { useFormikContext } from 'formik';
import { AlertTriangleIcon } from './Icon.component';

interface FormInputProps extends InputProps {
  id: string;
}

export const FormInput = ({ id, ...inputProps }: FormInputProps): InputElement => {

  const formContext = useFormikContext();

  // @ts-ignore
  const { [id]: error } = formContext.errors;

  const fieldProps: Partial<InputProps> = {
    status: error && 'danger',
    captionIcon: error && AlertTriangleIcon,
  };

  return (
    <Input
      {...inputProps}
      {...fieldProps}
      caption={error}
      style={styles.input}
      textStyle={styles.textStyle}
      size='large'
      onChangeText={formContext.handleChange(id)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderBottomColor: '#C9C9C9',
    width: '100%',
  },
  textStyle: {
    color: 'black',
  }
});