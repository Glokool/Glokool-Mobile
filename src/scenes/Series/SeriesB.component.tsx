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
import { Blog } from '../../assets/icon/Series';


const windowWidth = Dimensions.get('window').width;


export const SeriesBScreen = (props: SeriesBDetailProps): LayoutElement => {
    return (
        <Layout style={styles.ContainerLayout}>
        <ScrollView style={{backgroundColor: '#ffffff'}} showsVerticalScrollIndicator = {false}>
            <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
            <Layout style={{height: 50}}/>
            <Layout style={styles.TopLayout}>
                <Text style={styles.TopTxt1}>{`Day Trip with Glokool`}</Text>
                <Text style={styles.TopTxt2}>
                    {`Various themes of one day tour course.`}
                </Text>
            </Layout>
            <SeriesBList navigation={props.navigation} route={props.route} />
        </ScrollView>

        {/* 탑탭바 */}
        <Layout style={styles.ContainerLayoutAngleLeft}>
            <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
            <Layout style={styles.ContainerIconLayout}>
                <TouchableOpacity style={styles.ContainerAngleLeft} onPress={() => props.navigation.goBack()}>
                    <AngleLeft />
                </TouchableOpacity>
                <Blog />
            </Layout>
        </Layout>

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
    },
    // toptap bar
    ContainerLayoutAngleLeft: {
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0,
        backgroundColor: '#ffffff',
        // borderWidth: 1,
        // borderColor:'red',
    },
    ContainerIconLayout: {
        flexDirection: 'row',
        width: windowWidth,
        alignItems: 'center',
    },
    ContainerAngleLeft: {
        marginLeft: 20,
        padding: 20,
    },
})

