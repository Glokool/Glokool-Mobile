import React from 'react';
import { Text, StyleSheet } from 'react-native'
import { Layout, LayoutElement } from '@ui-kitten/components';
import { CommonTopTabBar } from '../../component/Common/TopTabBar.component';
import { PaySecondSceneProps } from '../../navigation/Pay.navigator';
import { PayFirstPage } from '../../assets/icon/Pay';
import { Formik } from 'formik';
import { PayFormikComponent } from '../../component/Pay/PayFormik.component';
import { PayValidationData, PayValidationModel } from '../../model/Pay/Pay.validation.model';

export const PayFirstScene = (props: PaySecondSceneProps): LayoutElement => {

    const pagination = () => {
        return (
            <Layout style={styles.Pagination}>
                <PayFirstPage />
            </Layout>
        )
    }

    return (
        <Layout>
            {/* top tap bar */}
            <CommonTopTabBar
                title={'USER INFORMATION'}
                navigation={props.navigation}
                child={
                    <Layout style={styles.Pagination}>
                        <PayFirstPage />
                    </Layout>
                } />

            <Formik
                initialValues={PayValidationData.empty()}
                validationSchema={PayValidationModel}
                onSubmit={() => { }}
            >
                {PayFormikComponent}
            </Formik>


        </Layout>
    )
};

const styles = StyleSheet.create({
    Pagination: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    }
})