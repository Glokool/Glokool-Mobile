import { Layout, LayoutElement } from '@ui-kitten/components';
import React from 'react';
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
import { AngleLeft } from '../../assets/icon/Common';
import { HiddenGem, HiddenGem_Title } from '../../assets/icon/Series';
import { HiddenGemInKoreaFlatList } from '../../component/Series';
import { SceneRoute } from '../../navigation/app.route';
import { SeriesHiddenGemProps } from '../../navigation/ScreenNavigator/Series.navigator';

const windowWidth = Dimensions.get('window').width;
export const SeriesHiddenGemScreen = (props : SeriesHiddenGemProps) : LayoutElement => {

    return(
        <Layout style={styles.Container}>
            <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
            <Layout style={{height: 50}}/>
            <Layout style={styles.MainContainer}>
                <HiddenGemInKoreaFlatList navigation={props.navigation} route={props.route} />
            </Layout>

             {/* toptapbar */}
            <Layout style={styles.ContainerLayoutAngleLeft}>
                <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
                <Layout style={styles.ContainerIconLayout}>
                    <TouchableOpacity style={styles.ContainerAngleLeft} onPress={() => Navigation.goBack()}>
                        <AngleLeft />
                    </TouchableOpacity>
                    <HiddenGem_Title style={styles.HiddenGemIcon}/>
                </Layout>
            </Layout>


        </Layout>
      
        
    )
}

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%'
    },
    TopTabBar: {
        position: 'absolute',
        width: '100%',
        height: 50,
        top: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
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
    ContainerIconLayout: {
        flexDirection: 'row',
        width: windowWidth,
        alignItems: 'center',
    },
    ContainerAngleLeft: {
        marginLeft: 20,
        padding: 20,
    },
    HiddenGemIcon: {
        // borderWidth: 1,
    },
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
})