import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Layout, LayoutElement, Input, Button, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { CommonTopTabBar } from '../../component/Common/TopTabBar.component';
import { PayFirstSceneProps } from '../../navigation/Pay.navigator';
import { PayFirstPage } from '../../assets/icon/Pay';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AngleRight_Color } from '../../assets/icon/Common';
import { SceneRoute } from '../../navigation/app.route';
import { windowHeight, windowWidth } from '../../Design.component';
import { FormikErrorIcon } from '../../assets/icon/Pay';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountryPicker from 'react-native-country-picker-modal';

export const PayFirstScene = (props: PayFirstSceneProps): LayoutElement => {

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [snsID, setSnsID] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [countryCode, setCountryCode] = useState<any>("KR");
    const [callingCode, setCallingCode] = useState<Array<string>>();

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const messengerType = ["Facebook", "Instagram"];
    const displayValue = messengerType[selectedIndex.row]

    const [isEmail, setIsEmail] = useState<boolean>(false);
    const validEmail = Yup.object().shape({
        email: Yup.string().required().email(),
    })

    const onPressButton = () => {
        const params = {
            name: name,
            email: email,
        }

        if (phone.length > 0 && callingCode) {
            const phoneParam = {
                phone: {
                    type: callingCode[0],
                    value: phone,
                }
            }
            Object.assign(params, phoneParam);
        }

        if (snsID.length > 0 && displayValue) {
            const snsParam = {
                snsID: {
                    type: displayValue,
                    value: snsID,
                }
            }
            Object.assign(params, snsParam);
        }
        
        props.navigation.navigate(SceneRoute.PAY_SECOND, params);
    }

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
                <Layout style={styles.DropdownContainer}>
                    <CountryPicker
                        countryCode={countryCode}
                        withFilter
                        withFlag
                        withCountryNameButton
                        withCallingCode
                        withEmoji
                        onSelect={(response) => {
                            setCountryCode(response.cca2);
                            setCallingCode(response.callingCode);
                        }}
                        containerButtonStyle={styles.CountryPickerStyle}
                    />
                    <Input
                        style={[styles.InputContainer, { flex: 2 }]}
                        textStyle={styles.InputTextStyle}
                        onChangeText={(e) => {
                            setPhone(e)
                        }}
                        placeholder={'010XXXXXXXX'}
                        placeholderTextColor={'#aaa'}

                    />
                </Layout>
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
                <Layout style={styles.DropdownContainer}>
                    <Select
                        style={styles.SelectContainer}
                        selectedIndex={selectedIndex}
                        onSelect={(index) => setSelectedIndex(index)}
                        value={displayValue}
                    >
                        <SelectItem title='Facebook' />
                        <SelectItem title='Instagram' />
                    </Select>
                    <Input
                        style={[styles.InputContainer, { flex: 2 }]}
                        textStyle={styles.InputTextStyle}
                        onChangeText={(e) => {
                            setSnsID(e)
                        }}
                        placeholder={'glokool_korea'}
                        placeholderTextColor={'#aaa'}
                    />
                </Layout>
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
                    onPress={() => { onPressButton() }}
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
        paddingHorizontal: windowWidth * 0.05,
        width: '100%',
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
    },
    DropdownContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    SelectContainer: {
        flex: 1,
        marginRight: 5,
    },
    CountryPickerStyle: {
        backgroundColor: 'rgba(247,249,252,1.0)',
        borderColor: 'rgba(232,236,243,1.0)',
        borderWidth: 0.5,
        borderRadius: 3,
    }
})