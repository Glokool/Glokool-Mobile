import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    Layout,
    LayoutElement,
    Text,
    Icon,
    Divider
} from '@ui-kitten/components';
import { FAQProps } from '../../../navigation/ScreenNavigator/My.navigator';
import { AngleLeft } from '../../../assets/icon/Common';
import { windowHeight } from '../../../Design.component';


export const FAQ = (props: FAQProps): LayoutElement => {
    const [aboutUsVisible, setAboutUsVisible] = React.useState(false);
    const [signInVisible, setSignInVisible] = React.useState(false);
    const [tourVisible, setTourVisible] = React.useState(false);
    const [guideBookVisible, setGuideBookVisible] = React.useState(false);
    const [chatVisible, setChatVisible] = React.useState(false);
    const [myPageVisible, setMyPageVisible] = React.useState(false);

    function PressBack() {
        props.navigation.goBack();
    }

    function PressAboutUs() {
        setAboutUsVisible(!aboutUsVisible)
    }

    return (
        <React.Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <Layout style={styles.mainContainer}>

                {/*탭바 표현*/}
                <Layout style={styles.Tabbar}>
                    <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={PressBack} style={{ padding: 10 }}>
                            <AngleLeft />
                        </TouchableOpacity>
                    </Layout>
                    <Layout style={{ flex: 3, alignItems: 'center', justifyContent: 'center', marginHorizontal: 25 }}>
                        <Text style={styles.TextStyle}>FAQ</Text>
                    </Layout>
                    <Layout style={{ flex: 1 }} />
                </Layout>

                {/*고객 서비스 부문 표현*/}

                <Layout style={styles.Container}>
                    <ScrollView style={{ marginHorizontal: 15 }} showsVerticalScrollIndicator={false}>

                        <TouchableOpacity onPress={PressAboutUs} style={styles.button}>
                            <Layout style={styles.buttonContainer}>
                                <Layout style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}>About Glokool</Text>
                                </Layout>
                                <Layout style={styles.emptyContainer} />
                                <Layout style={styles.buttonIconContainer}>
                                    <Icon style={{ width: 30, height: 30 }} fill='black' name='arrow-ios-downward-outline' />
                                </Layout>
                            </Layout>
                        </TouchableOpacity>

                        {aboutUsVisible &&
                            <Layout>
                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>1. About Us</Text>
                                    <Text style={styles.aboutDesc}>We introduce you to the hidden gems of Seoul, providing untact tour guide service on your phone. </Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>2. About untact Tour</Text>
                                    <Text style={styles.aboutDesc}>With our Untact Guide, you can receive the same service as the existing guide service, but our Untact Guide services are done on mobile phones. You can freely ask Untact Guide where to go, how to go, what to eat.</Text>
                                </Layout>

                            </Layout>
                        }

                        {/* 사인 인 설명 */}
                        <TouchableOpacity onPress={() => setSignInVisible(!signInVisible)} style={styles.button}>
                            <Layout style={styles.buttonContainer}>
                                <Layout style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}>Sign In</Text>
                                </Layout>
                                <Layout style={styles.emptyContainer} />
                                <Layout style={styles.buttonIconContainer}>
                                    <Icon style={{ width: 30, height: 30 }} fill='black' name='arrow-ios-downward-outline' />
                                </Layout>
                            </Layout>
                        </TouchableOpacity>

                        {signInVisible &&
                            <Layout>
                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>1. Forgot my E-mail ID? </Text>
                                    <Text style={styles.aboutDesc}>Please contact glokoolofficial@gmail.com</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>2. Forgot my password? </Text>
                                    <Text style={styles.aboutDesc}>{`Click 'forgot password' on the login page and enter your information and we will send you a temporary password. After logging in with a temporary password, reset the password in MY PAGE -> SETTINGS -> Privacy for security.`}</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>3. Delete account</Text>
                                    <Text style={styles.aboutDesc}>Click the Withdrawal button on MY PAGE to proceed with the withdrawal process.</Text>
                                </Layout>

                                <Divider />

                            </Layout>
                        }

                        <TouchableOpacity onPress={() => setTourVisible(!tourVisible)} style={styles.button}>
                            <Layout style={styles.buttonContainer}>
                                <Layout style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}>Tour</Text>
                                </Layout>
                                <Layout style={styles.emptyContainer} />
                                <Layout style={styles.buttonIconContainer}>
                                    <Icon style={{ width: 30, height: 30 }} fill='black' name='arrow-ios-downward-outline' />
                                </Layout>
                            </Layout>
                        </TouchableOpacity>

                        {tourVisible &&
                            <Layout>
                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>1. Participants Limit</Text>
                                    <Text style={styles.aboutDesc}>There is no limit to the number of people. Family, friends, or lovers can enjoy the tour.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>2. Tour Duration</Text>
                                    <Text style={styles.aboutDesc}>It takes approximately 4 hours per tour.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>3. Tour cost</Text>
                                    <Text style={styles.aboutDesc}>All tours will cost 20$. It can be changed due to promotion, events, etc. (Not charged for the number of persons, one tour per group costs 20$.)</Text>
                                </Layout>

                                <Divider />

                            </Layout>
                        }


                        <TouchableOpacity onPress={() => setGuideBookVisible(!guideBookVisible)}>
                            <Layout style={styles.buttonContainer}>
                                <Layout style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}>Guide Book</Text>
                                </Layout>
                                <Layout style={styles.emptyContainer} />
                                <Layout style={styles.buttonIconContainer}>
                                    <Icon style={{ width: 30, height: 30 }} fill='black' name='arrow-ios-downward-outline' />
                                </Layout>
                            </Layout>
                        </TouchableOpacity>

                        {guideBookVisible &&
                            <Layout>

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>1. Check reservation details</Text>
                                    <Text style={styles.aboutDesc}>The voucher with reservation information will be sent within 24 hours after payment, to the email you used to make the reservation.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>2. Check the guidebook</Text>
                                    <Text style={styles.aboutDesc}>You can check immediately after payment. Check out GUIDE BOOK at the bottom bar.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>3. Cancel reservation</Text>
                                    <Text style={styles.aboutDesc}>Please contact us at glokoolofficial@gmail.com. Please refer to the 'Cancellation Policy'.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>4. Refund process</Text>
                                    <Text style={styles.aboutDesc}>PayPal: Refund will be completed within 1-3 business days.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>5. Wrong information</Text>
                                    <Text style={styles.aboutDesc}>{`'If you enter the chat room from CHAT, Help is at the top right corner. You can submit an error by selecting location in Help -> Report Error.`}</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>6. After tour</Text>
                                    <Text style={styles.aboutDesc}>{`The guidebook is available until midnight 00:00 of your tour date. It is not possible to view the guidebook after your tour date.`}</Text>
                                </Layout>

                                <Divider />

                            </Layout>
                        }

                        <TouchableOpacity onPress={() => setChatVisible(!chatVisible)}>
                            <Layout style={styles.buttonContainer}>
                                <Layout style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}>Chat</Text>
                                </Layout>
                                <Layout style={styles.emptyContainer} />
                                <Layout style={styles.buttonIconContainer}>
                                    <Icon style={{ width: 30, height: 30 }} fill='black' name='arrow-ios-downward-outline' />
                                </Layout>
                            </Layout>
                        </TouchableOpacity>

                        {chatVisible &&
                            <Layout>


                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>1. Report Guide</Text>
                                    <Text style={styles.aboutDesc}>{`If a guide makes you feel uncomfortable, such as uploading inappropriate content or making a financial request, you can report it directly to the admin. Call our manager directly through Help -> Emergency call with Manager, or Contact us at MY PAGE -> SETTINGS -> Customer Service.`}</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>2. Chat call charges</Text>
                                    <Text style={styles.aboutDesc}>When using in 3G/LTE environment, data call charges may apply. There is no charge for voice calls.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>3. Guide information</Text>
                                    <Text style={styles.aboutDesc}>You can check the guide information by tapping the guide's profile picture in the chat window.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>4. After tour</Text>
                                    <Text style={styles.aboutDesc}>The chat input window is disabled, but you can check the chat content even after the tour ends. Chat content is kept for 3 months from the date of the tour. </Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>5. Save chat content</Text>
                                    <Text style={styles.aboutDesc}>{`In order to encourage the guide to provide a higher quality service, the admin can check the content of the chat if necessary. The content is not shared with third parties and is used solely to improve the quality of service of the guide. Chat content will be kept for up to 3 months from the date of the guide and will disappear thereafter. After it disappears, neither administrator, guide, nor user can view it.`}</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>6. Turn off notifications</Text>
                                    <Text style={styles.aboutDesc}>{`You can turn off notifications on MY PAGE -> SETTINGS -> Notification.`}</Text>
                                </Layout>

                                <Divider />

                            </Layout>
                        }

                        <TouchableOpacity onPress={() => setMyPageVisible(!myPageVisible)}>
                            <Layout style={styles.buttonContainer}>
                                <Layout style={styles.buttonTextContainer}>
                                    <Text style={styles.buttonText}>My Page</Text>
                                </Layout>
                                <Layout style={styles.emptyContainer} />
                                <Layout style={styles.buttonIconContainer}>
                                    <Icon style={{ width: 30, height: 30 }} fill='black' name='arrow-ios-downward-outline' />
                                </Layout>
                            </Layout>
                        </TouchableOpacity>

                        {myPageVisible &&
                            <Layout>

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>1. Edit Profile</Text>
                                    <Text style={styles.aboutDesc}>Tap your profile picture on MY PAGE to select a picture from the gallery. If you wish to enter additional information, you can edit it directly from the information below. Entering additional information may result in a better guide service.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>2. Use of personal information</Text>
                                    <Text style={styles.aboutDesc}>Your personal information can only be provided with essential information to guides for the best guide services, but will not be shared or transmitted to third parties.</Text>
                                </Layout>

                                <Divider />

                                <Layout style={styles.aboutTitleContainer}>
                                    <Text style={styles.aboutTitle}>3. Contact with Manager</Text>
                                    <Text style={styles.aboutDesc}>{`'If you enter the chat room from CHAT, Help is at the top right corner. You can call the manager directly from Help -> Emergency call with Manager. If you would like to use a method other than using your phone, please contact us at MY PAGE -> SETTINGS -> Customer Service.`}</Text>
                                </Layout>

                            </Layout>
                        }

                        <Layout style={{ height: windowHeight * 0.15 }} />

                    </ScrollView>
                </Layout>
            </Layout>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    Tabbar: {
        flex: 1,
        flexDirection: 'row',
    },
    TextStyle: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 20,
    },
    Container: {
        flex: 8,
        justifyContent: 'flex-start',

    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        marginVertical: 10
    },
    buttonTextContainer: {
        backgroundColor: '#00FF0000',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 15,
        marginHorizontal: 30,
    },
    emptyContainer: {
        flex: 5,
        backgroundColor: '#00FF0000',
    },
    buttonIconContainer: {
        backgroundColor: '#00FF0000',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginVertical: 15,
        marginHorizontal: 15,
    },
    TitleText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#7777FF'
    },
    TitleContainer: {
        marginVertical: 30,
        marginHorizontal: 30,
    },
    aboutTitleContainer: {
        marginVertical: 15,
        marginHorizontal: 30,
    },
    aboutTitle: {
        fontFamily: 'IBMPlexSansKR-Medium',
        color: 'black',
        fontSize: 16,
        marginVertical: 10
    },
    aboutDesc: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00FF0000'
    }
});