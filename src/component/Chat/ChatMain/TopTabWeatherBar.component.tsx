
import React from 'react';
import { StyleSheet, Text } from 'react-native'
import {
    Layout,
    LayoutElement
} from '@ui-kitten/components';
import { WeatherInfo } from '../../../types';
import moment from 'moment';
import axios from 'axios';
import { SERVER } from '../../../server.component';
import { Cloudy } from '../../../assets/icon/Chat/Weather';



export const TopTabWeatherbar = (props: any): LayoutElement => {

    const [data, setData] = React.useState<WeatherInfo>();
    const today = new Date();

    React.useEffect(() => {
        InitWeather();
    }, []);

    const InitWeather = async () => {
        const Weather = await axios.get(SERVER + '/api/weather');
        setData(Weather.data);
    }


    return (
        <Layout style={styles.Container}>

            <Layout style={styles.TextContainer}>

                <Layout style={styles.TextMinorContainer}>
                    <Text style={styles.Location}>
                        SEOUL
                    </Text>
                    <Text style={styles.Date}>
                        {`${moment(today).format('MM / DD')}`}
                    </Text>
                </Layout>

                <Layout style={styles.TextMinorContainer}>
                    <Text style={styles.Date}>Today</Text>
                    <Text style={styles.HighLowTem}>
                        {`H  ${data?.temp_max}° L  ${data?.temp_min}°`}                        
                    </Text>
                </Layout>

            </Layout>

            <Layout style={styles.WeatherContainer}>
                <Layout style={styles.TextMinorContainer2}>
                    <Text style={styles.Tem}>{data?.temp}<Text style={styles.Tem2}>°</Text></Text>
                    <Text style={styles.Weather}>{data?.main}</Text>
                </Layout>

                <Layout style={styles.WeatherIcon}>
                    <Cloudy />
                </Layout>
               
            </Layout>


        </Layout>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 75,
        flexDirection: 'row',
        paddingHorizontal: 20
    },

    TextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    TextMinorContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 5
    },

    TextMinorContainer2: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    TextContainer2: {
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#00FF0000',
    },
    Location: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 24,
        color: 'black'
    },
    Date: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: 'black',
        marginTop: -5
    },
    HighLowTem: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#8797FF',
    },
    Tem: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 25,
        color: '#292434',
        marginBottom: 0,
        marginRight: -7,
    },
    Tem2: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 25,
        color: '#8797FF',
        marginBottom: 0,
    },
    Weather: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#8797FF',
        marginTop : -10
    },

    WeatherContainer : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },      

    WeatherIcon : {
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})