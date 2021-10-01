import React from 'react';
import { Calendar, Layout, LayoutElement, Text } from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { TopTabBar } from "../../component/Booking";
import { BookFirstScreenProps } from '../../navigation/Book.navigator';
import { SceneRoute } from '../../navigation/app.route';

import moment from 'moment';


export const BookFirstScreen = (props: BookFirstScreenProps): LayoutElement => {

    const [date, setDate] = React.useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

    return  (
        <Layout style={styles.Container}>
            <Layout style={styles.MainContainer}>
                <Text style={styles.TitleText}>Select Your Travel Date</Text>

                <Calendar
                    min={new Date()}
                    date={date}
                    onSelect={nextDate => {
                        const timeZoneOffset = nextDate.getTimezoneOffset() * 60 * 1000;
                        const fixedTimestamp = moment(nextDate).valueOf() - timeZoneOffset;
                        setSelectedDate(new Date(fixedTimestamp));
                        setDate(nextDate);
                    }}
                />
            </Layout>

            <Layout style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.Button} onPress={() => { props.navigation.navigate(SceneRoute.BOOK_SECOND, { date: selectedDate }) }} >
                    <Text style={styles.ButtonText}>NEXT</Text>
                </TouchableOpacity>

                <SafeAreaView style={{ flex: 0, backgroundColor: '#00FF0000' }} />
            </Layout>

            <TopTabBar index={1} />
        </Layout>
    ) 
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#00FF0000',
    },
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    TitleText: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 18,
        marginBottom: 20
    },
    ButtonContainer: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    Button: {
        backgroundColor: '#7777FF',
        borderRadius: 10,
        width: 350,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
    }
})