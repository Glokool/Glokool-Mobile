import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Layout, LayoutElement, Input, Button } from '@ui-kitten/components';
import { CommonTopTabBar } from '../../component/Common/TopTabBar.component';
import { PaySecondSceneProps } from '../../navigation/Pay.navigator';
import { PayFirstPage } from '../../assets/icon/Pay';
import { Formik } from 'formik';
import { PayFormikComponent } from '../../component/Pay/PayFormik.component';
import { PayValidationData, PayValidationModel } from '../../model/Pay/Pay.validation.model';
import * as Yup from 'yup';
import { AngleRight_Color } from '../../assets/icon/Common';
import { SceneRoute } from '../../navigation/app.route';
import { windowHeight } from '../../Design.component';
import { FormikErrorIcon } from '../../assets/icon/Pay';
import { SafeAreaView } from 'react-native-safe-area-context';

export const PayFirstScene = (props: PaySecondSceneProps): LayoutElement => {

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [snsID, setSnsID] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [isEmail, setIsEmail] = useState<boolean>(false);
    const validEmail = Yup.object().shape({
        email: Yup.string().required().email(),
    })

    return (
        <Layout style={styles.MainContainer}>

            {/* top tap bar */}
            <CommonTopTabBar
                title={'USER INFORMATION'}
                navigation={props.navigation}
                child={
                    <Layout style={styles.Pagination}>
                        <PayFirstPage />
                    </Layout>
                } />

            <Layout style={styles.FormContainer}>
                <Text style={styles.ItemTitle}>
                    FULL NAME
                </Text>
                <Input
                    style={styles.InputContainer}
                    textStyle={styles.InputTextStyle}
                    onChangeText={(e) => {
                        setName(e);
                    }}
                    placeholder={'First name, Last name'}
                    placeholderTextColor={'#aaa'}
                />
                {name.length == 0 &&
                    <Layout style={styles.Warning}>
                        <FormikErrorIcon />
                        <Text style={styles.WarningText}>Please write your full name.</Text>
                    </Layout>
                }
            </Layout>

            <Layout style={styles.FormContainer}>
                <Text style={styles.ItemTitle}>
                    E-MAIL
                </Text>
                <Input
                    style={styles.InputContainer}
                    textStyle={styles.InputTextStyle}
                    onChangeText={(e) => {
                        validEmail.isValid({
                            email: e,
                        }).then((response) => {
                            setIsEmail(response)
                            response ? setEmail(e) : setEmail("");
                        });
                    }}
                    placeholder={'glokool@example.com'}
                    placeholderTextColor={'#aaa'}

                />
                {!isEmail &&
                    <Layout style={styles.Warning}>
                        <FormikErrorIcon />
                        <Text style={styles.WarningText}>Invalid email value</Text>
                    </Layout>
                }
            </Layout>

            <Layout style={styles.FormContainer}>
                <Layout style={styles.OptionalContainer}>
                    <Text style={styles.ItemTitle}>
                        PHONE NUMBER
                    </Text>
                    <Text style={styles.OptionalText}>
                        *Optional
                    </Text>
                </Layout>
                <Input
                    style={styles.InputContainer}
                    textStyle={styles.InputTextStyle}
                    onChangeText={(e) => {
                        setPhone(e)
                    }}
                    placeholder={'010XXXXXXXX'}
                    placeholderTextColor={'#aaa'}

                />
            </Layout>

            <Layout style={styles.FormContainer}>
                <Layout style={styles.OptionalContainer}>
                    <Text style={styles.ItemTitle}>
                        MESSENGER ID
                    </Text>
                    <Text style={styles.OptionalText}>
                        *Optional
                    </Text>
                </Layout>
                <Input
                    style={styles.InputContainer}
                    textStyle={styles.InputTextStyle}
                    onChangeText={(e) => {
                        setSnsID(e)
                    }}
                    placeholder={'glokool_korea'}
                    placeholderTextColor={'#aaa'}
                />
            </Layout>

            <Layout style={styles.InfoContainer}>
                <Text style={styles.InfoText}>By proceeding,</Text>
                <Text style={styles.InfoText}>You agree to our 'Cancellation Policy'.</Text>

                <TouchableOpacity
                    style={styles.PolicyButton}
                    onPress={() => props.navigation.navigate(SceneRoute.PAY_CANCELLATION)}
                >
                    <Text style={styles.PolicyText}>Click to Check</Text>
                    <AngleRight_Color width={'2%'} />
                </TouchableOpacity>



                <TouchableOpacity
                    disabled={isEmail == false || name.length == 0}
                    style={[styles.ButtonContainer, {
                        backgroundColor:
                            isEmail == false || name.length == 0
                                ? '#aaa' : '#7777ff'
                    }]}
                    onPress={() => {
                        console.log(name)
                        console.log(phone)
                        console.log(email)
                        console.log(snsID)
                    }}
                >
                    <Text style={styles.ButtonText}>CONTINUE</Text>
                </TouchableOpacity>
                <SafeAreaView />
            </Layout>


        </Layout >
    )
};

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        height: '100%',
        paddingBottom: 0,
    },
    Pagination: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    ItemTitle: {
        color: '#7777ff',
        fontFamily: 'Pretendard-Medium',
    },
    InputContainer: {
        backgroundColor: '#00ff0000',
        borderColor: '#00ff0000',
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: 2,
        borderRadius: 2,
    },
    InputTextStyle: {
        color: 'black',
        fontFamily: 'Pretendard-Medium'
    },
    OptionalContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    OptionalText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 13,
        color: '#aaa',
        marginLeft: 12,
    },
    FormContainer: {
        marginVertical: 10,
        width: '90%'
    },
    InfoContainer: {
        width: '90%',
        position: 'absolute',
        backgroundColor: '#0000',
        bottom: 10,
    },
    InfoText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
    },
    PolicyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    PolicyText: {
        fontFamily: 'Pretendard-Medium',
        color: '#7777ff',
        fontSize: 13,
        marginRight: 10,
    },
    ButtonContainer: {
        height: windowHeight * 0.06,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
        fontSize: 18
    },
    Warning: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    WarningText: {
        color: '#FF6148',
        fontFamily: 'Pretendard-Regular',
        fontSize: 13,
        marginLeft: 5,
    }
})