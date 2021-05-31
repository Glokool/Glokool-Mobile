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
import { SeriesFlatlist } from '../../component/Series';

export const SeriesScreen = (props: SeriesScreenProps): LayoutElement => {
    const [refresh, setRefresh] = React.useState(true);
    const [tourInfo, setTourInfo] = React.useState([]);
    const [tourBanner, setTourBanner] = React.useState([]);

    function PressHiddenGems() {
        
      }

    return(
        <ScrollView style={{backgroundColor : 'white'}} showsVerticalScrollIndicator={false}>
           <Layout style={styles.seriesHidden}>
               <Layout >
                    <Text style={styles.seriesHiddenTxt}>{`Hidden Gems in Korea`}</Text>
               </Layout>
               <TouchableOpacity style={styles.moreBtnLayout} onPress={() => PressHiddenGems()}>
                    <Text style={styles.moreBtnTxt}>{`More`}</Text>
               </TouchableOpacity>
           </Layout>
          

          {/* hidden gems in korea */}
          <SeriesFlatlist   />
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    seriesHidden:{
        width: Dimensions.get('window').width * 0.8,
        alignSelf:'center',
        marginTop:250,
        flexDirection:'row',
        alignItems:'center'
    },
    seriesHiddenTxt:{
        fontFamily:'IBMPlexSansKR-SemiBold',
        fontSize:17,
        color: '#000000',
    },
    moreBtnLayout:{
        // alignSelf: 'flex-end',
        // justifyContent:'flex-end'
        marginLeft:90
    },
    moreBtn:{
        textAlign:'right',
        width:'30%'
    },
    moreBtnTxt:{
        color:'#AFAFAF',
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
    }

});
