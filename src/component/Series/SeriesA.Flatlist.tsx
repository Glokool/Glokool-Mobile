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
              <Text style={styles.SeriesTxtStyle}>{item.title}</Text>
            </Layout>
          </TouchableOpacity>
      )
    };


    return (
            <Layout  
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: 15,
            }}>
                <FlatList
                data={content}
                renderItem={renderTour}
                style={{ margin: 20 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                />
            </Layout>
    )
}

const styles = StyleSheet.create({
  SeriesStyle: {
    justifyContent: "center", 
    
  },
  SeriesImgStyle: {
    width: SeriesImgW*0.27,
    height: SeriesImgW*0.27,
    borderRadius: 10,
  },
  SeriesTxtStyle:{
    fontFamily: 'IBMPlexSansKR-Medium',
    fontSize: 15,
    color: '#000000',
    marginTop: 2,
    justifyContent: 'flex-start'
  },

})


