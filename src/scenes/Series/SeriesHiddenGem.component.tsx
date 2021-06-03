import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AngleLeft } from '../../assets/icon/Common';
import { HiddenGem } from '../../assets/icon/Series';
import { HiddenGemInKoreaFlatList } from '../../component/Series';
import { SeriesHiddenGemProps } from '../../navigation/ScreenNavigator/Series.navigator';


export const SeriesHiddenGemScreen = (props : SeriesHiddenGemProps) : LayoutElement => {



    return(
        <Layout>

            <Layout style={styles.MainContainer}>
                <Layout style={{height: 80, backgroundColor: '#00FF0000'}} />

                <Text style={styles.TitleText}>Hidden Gems in Korea</Text>
                <Text style={styles.smallTitleText}>let's Introduce this Series bold and concisely</Text>

                <HiddenGemInKoreaFlatList navigation={props.navigation} route={props.route} />
            </Layout>

            <Layout style={styles.TopTabBar}>

                <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.goBack()}>
                    <SafeAreaView style={{flex: 0}} />
                    <AngleLeft />
                </TouchableOpacity>

                <Layout>
                    <SafeAreaView style={{flex: 0}} />
                    <HiddenGem style={styles.HiddenGemIcon}/>
                </Layout>

            </Layout>

        </Layout>
      
        
    )
}

const styles = StyleSheet.create({
    TopTabBar: {
        position: 'absolute',
        width: '100%',
        minHeight: 80,
        top: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    BackButton: {
        padding: 20,
        marginLeft: 10
    },
    HiddenGemIcon: {
        marginLeft: 10
    },
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    TitleText: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        marginLeft: 30,
        fontSize: 22,
        color: 'black'
    },
    smallTitleText: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        marginLeft: 30,
        fontSize: 16,
        color: '#8C8B8B'
    }
})