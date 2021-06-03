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
import { SeriesFlatlistProps } from '../../navigation/ScreenNavigator/Series.navigator';

type Series_Item = {
    banner: string,
    title: string,
    _id: string,
    loc: string,
    region: string,
}

const SeriesImgW = Dimensions.get('window').width;

export const SeriesFlatlist = (props : SeriesFlatlistProps) : LayoutElement => {
    const [content, setContent] = React.useState<Array<Series_Item>>([]);

    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/main-tours');
        setContent(Content.data);
    }

    const renderTour = ({ item }) => {

      return(
          <TouchableOpacity>
            <Layout style={styles.SeriesStyle} >
              <Image source={{ uri: item.banner }} style={styles.SeriesImgStyle} />
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
    alignItems: "center",
    marginRight: 10,
    
  },
  SeriesImgStyle: {
    width: SeriesImgW * 0.42,
    height: SeriesImgW * 0.42 *1.2,
    borderRadius: 10,
    position:'relative'
  },
  SeriesTxtStyle:{
    position: 'absolute',
    bottom: 10,
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 20,
    color: '#FFFFFF',
   
  },

})


