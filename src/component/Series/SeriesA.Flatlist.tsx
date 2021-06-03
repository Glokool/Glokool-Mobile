import React from 'react'
import { 
    TouchableOpacity,
    FlatList, 
    ScrollView,
    View,
    Image,
    Dimensions,  
    StyleSheet, 
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { Layout, LayoutElement, styled, Text } from "@ui-kitten/components"
import { SeriesAFlatlistProps } from '../../navigation/ScreenNavigator/Series.navigator';

type Series_Item = {
    image: '',
    plus: '',
    _id: '',
    title:'',
    comments:'',
}

const SeriesImgW = Dimensions.get('window').width;

export const SeriesAFlatlist = (props : SeriesAFlatlistProps) : LayoutElement => {
    const [content, setContent] = React.useState<Array<Series_Item>>([]);

    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/contents');
        setContent(Content.data);
    }

    const renderTour = ({ item }) => {


      return(
          <TouchableOpacity >
            <Layout style={styles.SeriesStyle} >
              <Image source={{ uri: item.image }} style={styles.SeriesImgStyle} />
              <Text style={styles.SeriesTxtStyle} numberOfLines={2}>{item.title}</Text>
            </Layout>
          </TouchableOpacity>
      )
    };


    return (
            <Layout  
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: 35,
              marginTop: 5,
            }}>
                <FlatList
                data={content}
                renderItem={renderTour}
                showsHorizontalScrollIndicator={false}
                horizontal
                />
            </Layout>
    )
}

const styles = StyleSheet.create({
  SeriesStyle: {
    justifyContent: "center", 
    marginRight: 10,
  },
  SeriesImgStyle: {
    width: SeriesImgW*0.27,
    height: SeriesImgW*0.27,
    borderRadius: 10,
  },
  SeriesTxtStyle:{
    fontFamily: 'IBMPlexSansKR-Medium',
    fontSize: 15,
    width: SeriesImgW*0.27,
    color: '#000000',
    marginVertical: 0,
    justifyContent: 'flex-start'
  },

})


