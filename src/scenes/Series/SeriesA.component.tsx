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


export const SeriesAScreen = (props: SeriesADetailProps): LayoutElement => {
    return (
        <ScrollView style={{backgroundColor: '#ffffff'}}>
            <Layout>
                <AngleLeft style={styles.AngleLeft} onPress={() => props.navigation.goBack()} />
            </Layout>
            <Layout style={styles.TopLayout}>
                <Text style={styles.TopTxt1}>{`Korea A-Z`}</Text>
                <Text style={styles.TopTxt2}>
                    {`let's Introduce this Series bold and concisely If this sentance too long, Don't worry just write like this.`}
                </Text>
            </Layout>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    AngleLeft: {
      marginTop: 60,
      marginLeft: 20,
    },
    TopLayout: {
        marginTop: 20,
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

