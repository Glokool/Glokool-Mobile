import React from 'react'
import firestore from '@react-native-firebase/firestore'
import { Divider, Layout, LayoutElement,  } from '@ui-kitten/components'
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
import { SeriesScreenProps } from "../../navigation/ScreenNavigator/Series.navigator"

import { SERVER } from '../../server.component';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';
import { SeriesAFlatlist, SeriesBFlatlist, SeriesFlatlist } from '../../component/Series';
import { SeriesCarousel } from '../../component/Series/Series.Carousel';

export const SeriesScreen = (props: SeriesScreenProps): LayoutElement => {
    const [refresh, setRefresh] = React.useState(true);
    const [tourInfo, setTourInfo] = React.useState([]);
    const [tourBanner, setTourBanner] = React.useState([]);


    return(
        <Layout>

            <SeriesCarousel />        

            <ScrollView style={{backgroundColor : 'white', height: '100%'}} showsVerticalScrollIndicator={false}>

                {/* hidden gems title */}
                <Layout style={styles.seriesHidden1}>
                    <Layout style={styles.seriesHiddenLayout}>
                            <Text style={styles.seriesHiddenTxt}>{`Hidden Gems in Korea`}</Text>
                    </Layout>
                    <TouchableOpacity style={styles.moreBtnLayout} onPress={() => props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM)}>
                            <Text style={styles.moreBtnTxt}>{`More`}</Text>
                    </TouchableOpacity>
                </Layout>

                <SeriesFlatlist  navigation={props.navigation} route={props.route} />


                {/* seriesA title - 카드뉴스*/}
                <Layout style={styles.seriesHidden}>
                    <Layout style={styles.seriesHiddenLayout}>
                            <Text style={styles.seriesHiddenTxt}>{`Korea A-Z `}</Text>
                    </Layout>
                    <TouchableOpacity style={styles.moreBtnLayout} onPress={() => props.navigation.navigate(SceneRoute.SERIES_A)}>
                            <Text style={styles.moreBtnTxt}>{`More`}</Text>
                    </TouchableOpacity>
                </Layout>
                <SeriesAFlatlist  navigation={props.navigation} route={props.route} />



                {/* seriesB title - 블로그 */}
                <Layout style={styles.seriesHidden}>
                    <Layout style={styles.seriesHiddenLayout}>
                            <Text style={styles.seriesHiddenTxt}>{`Day Trip with Glokool`}</Text>
                    </Layout>
                    <TouchableOpacity style={styles.moreBtnLayout} >
                            <Text style={styles.moreBtnTxt}>{`More`}</Text>
                    </TouchableOpacity>
                </Layout>
                <SeriesBFlatlist  navigation={props.navigation} route={props.route} />

                <Layout style={{height: 220}} />

            </ScrollView>

        </Layout>
    );

}

const styles = StyleSheet.create({
    seriesHidden1:{
        alignSelf:'center',
        marginTop: 20,
        flexDirection:'row',
        alignItems:'center',
        marginLeft: 35,
        marginRight: 35,
    },

    seriesHidden:{
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',   
        marginTop: 40,     
        marginLeft: 35,
        marginRight: 35,
    },
    seriesHiddenLayout:{
    },
    seriesHiddenTxt:{
        fontFamily:'IBMPlexSansKR-SemiBold',
        fontSize:17,
        color: '#000000',
    },
    moreBtnLayout:{
        justifyContent:'flex-end',
        flexDirection: 'row',
        flex: 1,
    },
    moreBtnTxt:{
        color:'#AFAFAF',
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
    }

});
