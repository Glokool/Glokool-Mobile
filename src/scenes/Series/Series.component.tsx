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
import { SeriesFlatlistProps } from "../../navigation/ScreenNavigator/Series.navigator"

import { SERVER } from '../../server.component';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';
import { SeriesAFlatlist, SeriesBFlatlist, SeriesFlatlist } from '../../component/Series';

export const SeriesScreen = (props: SeriesFlatlistProps): LayoutElement => {
    const [refresh, setRefresh] = React.useState(true);
    const [tourInfo, setTourInfo] = React.useState([]);
    const [tourBanner, setTourBanner] = React.useState([]);

    function PressHiddenGems() {
        
      }

    return(
        <ScrollView style={{backgroundColor : 'white'}} showsVerticalScrollIndicator={false}>

            {/* hidden gems title */}
           <Layout style={styles.seriesHidden1}>
               <Layout style={styles.seriesHiddenLayout}>
                    <Text style={styles.seriesHiddenTxt}>{`Hidden Gems in Korea`}</Text>
               </Layout>
               <TouchableOpacity style={styles.moreBtnLayout} onPress={() => PressHiddenGems()}>
                    <Text style={styles.moreBtnTxt}>{`More`}</Text>
               </TouchableOpacity>
           </Layout>
          <SeriesFlatlist  navigation={props.navigation} route={props.route} />


            {/* seriesA title */}
            <Layout style={styles.seriesHidden}>
               <Layout style={styles.seriesHiddenLayout}>
                    <Text style={styles.seriesHiddenTxt}>{`Korea A-Z `}</Text>
               </Layout>
               <TouchableOpacity style={styles.moreBtnLayout} onPress={() => PressHiddenGems()}>
                    <Text style={styles.moreBtnTxt}>{`More`}</Text>
               </TouchableOpacity>
           </Layout>
          <SeriesAFlatlist  navigation={props.navigation} route={props.route} />



            {/* seriesB title */}
            <Layout style={styles.seriesHidden}>
               <Layout style={styles.seriesHiddenLayout}>
                    <Text style={styles.seriesHiddenTxt}>{`Day Trip with Glokool`}</Text>
               </Layout>
               <TouchableOpacity style={styles.moreBtnLayout} onPress={() => PressHiddenGems()}>
                    <Text style={styles.moreBtnTxt}>{`More`}</Text>
               </TouchableOpacity>
           </Layout>
          <SeriesBFlatlist  navigation={props.navigation} route={props.route} />
           


        </ScrollView>
    );

}

const styles = StyleSheet.create({
    seriesHidden1:{
        width: Dimensions.get('window').width * 0.8,
        alignSelf:'center',
        marginTop:200,
        flexDirection:'row',
        alignItems:'center',
    },

    seriesHidden:{
        width: Dimensions.get('window').width * 0.8,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',        
    },
    seriesHiddenLayout:{
    },
    seriesHiddenTxt:{
        fontFamily:'IBMPlexSansKR-SemiBold',
        fontSize:17,
        color: '#000000',
        borderColor: 'red',
        
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
