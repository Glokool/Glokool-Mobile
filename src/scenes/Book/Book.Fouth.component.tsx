import React from "react";
import auth from '@react-native-firebase/auth';
import { LayoutElement, Layout, Text } from "@ui-kitten/components";
import { BookFouthScreenProps } from "../../navigation/Book.Confirm.navigator";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TopTabBar } from "../../component/Booking";
import { Booking_F, Booking_S } from "../../assets/icon/Booking";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigatorRoute } from "../../navigation/app.route";
import { SERVER } from "../../server.component";
import qs from 'query-string';
import { AuthUser } from "../../data/Auth";
import axios from "axios";


export const BookFouthScreen = (props : BookFouthScreenProps) : LayoutElement => {

    const data = props.route.params.response;
    const PaymentData = props.route.params.ReservationData;
    const user = AuthUser();
    const [success, setSuccess] = React.useState<boolean>(true);

    React.useEffect(() => {


        if(props.route.params.response.imp_success === 'true'){
            setSuccess(true);

            console.log('결제 데이터 : ', PaymentData);
            console.log('아임포트 데이터 : ', data);

            InitBookFourth();

        }
        else{
            setSuccess(false);

            FailPayment();
        }


    }, []);

    async function InitBookFourth() {
        
        const Token = await auth().currentUser?.getIdToken();
        const Data = qs.stringify({
            uid : user?.uid,
            name: PaymentData.Name,
            email: PaymentData.Email,
            contact : PaymentData.Contact,
            day: PaymentData.date,
            paymentID : data.imp_uid,
            lang: 'eng',
            money: data.paid_amount,
        });
        
        const config = {
            method : 'post',
            url : SERVER + '/api/reservations',
            headers: { 
                'Authorization': 'Bearer ' + Token
            },
            data: Data
        }

        const Reservation = await axios(config);

        console.log(Reservation);

    }

    async function FailPayment() {


        console.log('결제 데이터 : ', PaymentData);
        console.log('아임포트 데이터 : ', data);
    }

    return(
        <Layout style={styles.Container}>
            
            {(success === true)?
                <Layout style={styles.MainContainer}>
                    
                    <Booking_S />

                    <Text style={styles.DescText}>Your reservation{'\n'}has been confirmed!</Text>

                </Layout>
            
            :

                <Layout style={styles.MainContainer}>
                        
                    <Booking_F />

                    <Text style={styles.ColorDescText}>Payment Failure</Text>
                    <Text style={styles.DescText}>Please Try Again:(</Text>

                </Layout>
            
            }

            <TopTabBar index={4}/>

            <Layout style={styles.ButtonContainer}>

                {(success)?
                <TouchableOpacity style={styles.SuccessButton} onPress={() => {props.navigation.navigate(NavigatorRoute.MY)}}>
                    <Text style={styles.Button_Text}>CONFIRN</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.FailureButton} onPress={() => {props.navigation.navigate(NavigatorRoute.HOME)}}>
                    <Text style={styles.Button_Text}>BACK TO HOME</Text>
                </TouchableOpacity>
                }

                <SafeAreaView />

            </Layout>

        </Layout>
    )
} 

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%'
    },
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    DescText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 24,
        textAlign: 'center'
    },
    ColorDescText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 24,
        textAlign: 'center',
        color: '#FE8686'
    },
    ButtonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SuccessButton : {
        width: '90%',
        height: 56,
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: '#7777FF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Button_Text: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 18,
        color: 'white'
    },
    FailureButton : {
        width: '90%',
        height: 56,
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: '#292434',
        alignItems: 'center',
        justifyContent: 'center'
    },

})