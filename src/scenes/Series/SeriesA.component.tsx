import { Layout, LayoutElement } from '@ui-kitten/components'
import React from 'react'
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
import { SeriesADetailProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { AngleLeft } from '../../assets/icon/Common';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SeriesAList } from '../../component/Series';

const SeriesImgW = Dimensions.get('window').width;


export const SeriesAScreen = (props: SeriesADetailProps): LayoutElement => {
    

    return (
        <Layout style={styles.ContainerLayout}>
            <ScrollView style={{backgroundColor: '#ffffff'}} showsVerticalScrollIndicator = {false}>
                <Layout style={{height: 50}}/>
                <Layout style={styles.TopLayout}>
                    <Text style={styles.TopTxt1}>{`Korea A-Z`}</Text>
                    <Text style={styles.TopTxt2}>
                        {`let's Introduce this Series bold and concisely If this sentance too long, Don't worry just write like this.`}
                    </Text>
                </Layout>
                <SeriesAList navigation={props.navigation} route={props.route} />
            </ScrollView>

                {/* 탑탭바 */}
                <Layout style={styles.ContainerLayoutAngleLeft}>
                    <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                    <TouchableOpacity style={styles.ContainerAngleLeft} onPress={() => props.navigation.goBack()}>
                        <AngleLeft style={styles.AngleLeft}  />
                    </TouchableOpacity>
                </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    ContainerLayout:{
        position: 'relative',
    },
    ContainerLayoutAngleLeft: {
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0,
        backgroundColor: '#ffffff',
        // borderWidth: 1,
        // borderColor:'red',
    },
    ContainerAngleLeft: {
        marginLeft: 20,
        padding: 20,
    },
    AngleLeft: {
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

