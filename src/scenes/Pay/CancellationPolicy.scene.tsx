import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Layout, Text, Divider } from '@ui-kitten/components';
import { CancellationPolicyProps } from '../../navigation/Pay.navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { windowHeight } from '../../Design.component';

export const CancellationPolicy = (props: CancellationPolicyProps) => {
    return (
        <Layout style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 30, paddingTop: Platform.OS === 'ios' ? 50 : 20 }}>

                <Text style={styles.Title}>Refund Policy</Text>

                <Text style={styles.DescLeft}>Canceling a reservation with Glokool can result in cancellation fees being applied by Glokool and/or third party supplier or tour operator.</Text>

                <Divider style={styles.Divider} />

                <Text style={styles.DescLeftDetail}>If you request refunding or cancellation</Text>

                <Text style={styles.DescLeftDetail}>- By 3 days before your tour or service starts</Text>

                <Text style={styles.DescRight}> you will get a 100% refund.</Text>

                <Text style={styles.DescLeftDetail}>- Between more than 24 hour to 2 days</Text>

                <Text style={styles.DescRight}>You will be able to get a 50% refund</Text>

                <Text style={styles.DescLeftDetail}>- Within 24 hours until the tour or service starts</Text>

                <Text style={styles.DescRight}>0% will be refunded.</Text>

                <Text style={styles.DescLeftDetail}>- No refunds are available once a tour or service has commenced, or in respect of any package, accommodation, meals or any other services utilized.</Text>

                <Divider style={styles.Divider} />

                <Text style={styles.DescLeft}>
                    {`When canceling any booking you will be notified via email or any other communication channels that Glokool uses of the total cancellation fees.`}{'\n'}{'\n'}
                    {`Credit card refunds will be processed within seven business days of the request.All other refunds will be processed within 20 business days of the request.`}{'\n'}{'\n'}
                    {`No exceptions are made to the cancellation policy of each tour or service for any reason, including neither personal or medical, weather or other forces of nature, terrorism, civil unrest, strikes, international or internal (domestic) flight cancellations, nor any other reason beyond our control.`}{'\n'}{'\n'}
                    {`We therefore strongly recommend that you purchase a travel insurance to protect yourself from unexpected circumstances that may cause you to cancel your booking.`}{'\n'}{'\n'}
                </Text>

                <Layout style={{ height: windowHeight * 0.1 }} />

            </ScrollView>

            <TouchableOpacity style={styles.CloseButton} onPress={() => props.navigation.goBack()}>
                <Text style={styles.CloseButtonText}>GO BACK</Text>
            </TouchableOpacity>


        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    Title: {
        fontFamily: 'IBMPlexSansKR-Bold',
        fontSize: 18,
        color: 'black',
        textAlign: 'left',
        marginTop: 30
    },
    DescLeft: {
        textAlign: 'left',
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 15,
        color: 'black',
    },
    DescLeftDetail: {
        textAlign: 'left',
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 15,
        color: 'black',
        marginTop: 10
    },
    DescRight: {
        textAlign: 'right',
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 15,
        color: '#7777FF',
    },
    Divider: {
        width: '90%',
        height: 2,
        alignSelf: 'center',
        backgroundColor: '#D5DBFF',
        marginVertical: 10
    },
    CloseButton: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: '#8797FF',
        justifyContent: 'center',
        bottom: 20,
        width: '80%',
        height: 40,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    CloseButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    }
});