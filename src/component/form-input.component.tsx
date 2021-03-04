import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Input, InputElement, InputProps } from '@ui-kitten/components';
import { useFormikContext } from 'formik';
import { AlertTriangleIcon } from './icon';

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
      size='large'
      status='control'
      onChangeText={formContext.handleChange(id)}
    />
  );
};

const styles = StyleSheet.create({
  input:{
    backgroundColor: '#00ff0000',
    borderColor: '#00ff0000',
    borderBottomColor: '#FFFFFF',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 0,
    width: '100%'
  },
});