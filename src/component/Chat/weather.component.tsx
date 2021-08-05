
import React from 'react';
import { StyleSheet } from 'react-native'
import { 
    Layout,
    Text,
    LayoutElement 
} from '@ui-kitten/components';

import { Snow, Sunny, Rainy, Cloudy} from '../../assets/image/Chat'
import { WeatherComponentProps } from '../../navigation/ScreenNavigator/Chat.navigator';
import moment from 'moment';
import axios from 'axios';
import { SERVER } from '../../server.component';

type WeatherInfo = {
    main: string,
    temp: string,
    temp_min: string,
    temp_max: string
}

export const WeatherComponent = (props : WeatherComponentProps) : LayoutElement => {

    const [data, setData] = React.useState<WeatherInfo>();
    const today = new Date();

    React.useEffect(() => { 
        InitWeather();
    }, []);

    async function InitWeather() {

        var Weather = await axios.get(SERVER + '/api/weather');
        setData(Weather.data);



    }


    return(
        <Layout style={styles.Container}>

            {/* Snow, Rain, Clouds, Clear ... */}
            {(data?.main === 'Snow')? <Snow /> : (data?.main === 'Rain')? <Rainy /> : (data?.main === 'Clouds')? <Cloudy /> : <Sunny />}
            <Layout style={styles.TextContainer}>

                <Layout style={styles.TextContainer1}>
                    <Text style={styles.Location}>SEOUL</Text>
                    <Text style={styles.Date}>{`Today ${moment(today).format('MM / DD')}`}</Text>
                    <Text style={styles.HighLowTem}>{`H  ${data?.temp_max}° L  ${data?.temp_min}°`}<Text style={styles.Weather}>  {data?.main}</Text></Text>
                    
                </Layout>

                <Layout style={styles.TextContainer2}>
                    <Text style={styles.Tem}>{data?.temp}<Text style={styles.Tem2}>°</Text></Text>
                </Layout>
                
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextContainer:{
        position: 'absolute',
        top: '25%', 
        left: '10%',
        backgroundColor: '#00FF0000',
        flexDirection: 'row',
        marginTop: 15,
    },
    TextContainer1 : {
        alignItems: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#00FF0000',
        marginRight: 30
    },
    TextContainer2 : {
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
        fontSize: 38,
        color: '#292434',
        marginBottom: 0,
        marginTop: -5
    },
    Tem2: {
        fontFamily: 'BrandonGrotesque-Medium',
        fontSize: 38,
        color: '#8797FF',
        marginBottom: 0,
        marginTop: -5
    },
    Weather: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 17,
        color: '#8797FF',
        marginTop: -10
    }


})