import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { FormikProps } from 'formik';
import { PayFormikInputComponent } from '.';
import { PayValidationData } from '../../model/Pay/Pay.validation.model';
import { AngleRight_Color } from '../../assets/icon/Common';
import { SceneRoute } from '../../navigation/app.route';

export const PayFormikComponent = (props: FormikProps<PayValidationData>): React.ReactFragment => {
    return (
        <>
            <Layout>
                <Text style={styles.ItemTitle}>
                    FULL NAME
                </Text>
                <PayFormikInputComponent
                    id='name'
                    placeholder='Name'
                />
            </Layout>

            <Layout>
                <Text style={styles.ItemTitle}>
                    E-MAIL
                </Text>
                <PayFormikInputComponent
                    id='email'
                    placeholder='Email'
                    keyboardType='email-address'
                />
            </Layout>

            <Layout>
                <Text style={styles.ItemTitle}>
                    PHONE NUMBER
                </Text>
                <PayFormikInputComponent
                    id='phone'
                    placeholder='phone'
                    keyboardType='numeric'
                />
            </Layout>

            <Layout>
                <Text style={styles.ItemTitle}>
                    MESSENGER ID
                </Text>
                <PayFormikInputComponent
                    id='snsID'
                    placeholder='sns'
                />
            </Layout>

            <Text>
                By proceeding,
            </Text>
            <Text>
                You agree to our 'Cancellation Policy'.
            </Text>
            <TouchableOpacity onPress={()=>props.navigation.navigate(SceneRoute.PAY_CANCELLATION)}>
                <Text>
                    Click to Check
                </Text>
                <AngleRight_Color />
            </TouchableOpacity>


            <Button onPress={() => console.log(props.values)}>
                CONTINUE
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    ItemTitle: {
        color: '#7777ff',
        fontFamily: 'Pretendard-Medium',
    }
})