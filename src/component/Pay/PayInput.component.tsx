import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputElement, InputProps, Icon } from '@ui-kitten/components';
import { useFormikContext } from 'formik';
import { FormikErrorIcon } from '../../assets/icon/Pay';

interface FormInputProps extends InputProps {
    id: string;
}

export const PayFormikInputComponent = ({ id, ...inputProps }: FormInputProps): InputElement => {
    const formContext = useFormikContext();

    const { [id]: errors } = formContext.errors;
    const fieldProps: Partial<InputProps> = {
        status: errors && 'danger',
        caption: errors && <FormikErrorIcon/>,
        textStyle: { color: 'red' }
    };

    return (
        <Input
            {...inputProps}
            {...fieldProps}
            caption={errors}
            style={styles.InputContainer}
            textStyle={styles.InputTextStyle}
            placeholderTextColor={'#D2D2D2'}
            size='large'
            onChangeText={formContext.handleChange(id)}
        />
    )
}

const styles = StyleSheet.create({
    InputContainer: {
        backgroundColor: '#00ff0000',
        borderColor: '#00ff0000',
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: 2,
        borderRadius: 2,
        width: '90%'
    },
    InputTextStyle: {
        color: 'black',
        fontFamily: 'Pretendard-Medium'
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "opensans-regular",
        color: "#8F9BB3",
    }
})