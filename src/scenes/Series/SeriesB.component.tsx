import React from 'react'
import { Layout, LayoutElement } from '@ui-kitten/components'
import { 
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    FlatList, 
    ScrollView,
    View,
} from 'react-native';
import { SeriesBDetailProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { AngleLeft } from '../../assets/icon/Common';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SeriesBList, SeriesTopTabBar } from '../../component/Series';

const SeriesImgW = Dimensions.get('window').width;


export const SeriesBScreen = (props: SeriesBDetailProps): LayoutElement => {
    return (
        <Layout style={styles.ContainerLayout}>
        <ScrollView style={{backgroundColor: '#ffffff'}} showsVerticalScrollIndicator = {false}>
            <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
            <Layout style={{height: 50}}/>
            <Layout style={styles.TopLayout}>
                <Text style={styles.TopTxt1}>{`Day Trip with Glokool`}</Text>
                <Text style={styles.TopTxt2}>
                    {`let's Introduce this Series bold and concisely If this sentance too long, Don't worry just write like this.`}
                </Text>
            </Layout>
            <SeriesBList navigation={props.navigation} route={props.route} />
        </ScrollView>

        {/* 탑탭바 */}
        <SeriesTopTabBar />

    </Layout>
    )
}

const styles = StyleSheet.create({
    ContainerLayout:{
        position: 'relative',
    },
    TopLayout: {
        marginLeft: 30,
        marginRight: 20,
    },
    TopTxt1: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 22,
        color: '#000000'
    },
    TopTxt2: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 16,
        color: '#8C8B8B',
        marginTop: 7,
    }
})

