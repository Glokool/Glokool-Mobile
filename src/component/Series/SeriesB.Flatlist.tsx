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
import { SeriesBFlatlistProps } from '../../navigation/ScreenNavigator/Series.navigator';

type Series_Item = {
    cover: '',
    desc: '',
    _id: '',
    title:'',
    comments:'',
}

const SeriesImgW = Dimensions.get('window').width;

export const SeriesBFlatlist = (props : SeriesBFlatlistProps) : LayoutElement => {
    const [content, setContent] = React.useState<Array<Series_Item>>([]);

    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/blog');
        setContent(Content.data);
        console.log(Content.data);
    }

    const renderTour = ({ item }) => {

      console.log(item, '플랫 리스트');

      return(
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "center",
            margin: 15,
          }}
        >
          <TouchableOpacity>
            <Layout style={styles.SeriesStyle} >
              <Image source={{ uri: item.cover }} style={styles.SeriesImgStyle} />
              <Text style={styles.SeriesTxtStyle}>{item.title}</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>
      )
    };


    return (
            <Layout>
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
    width: SeriesImgW*0.27,
    justifyContent: 'flex-start'

  },

})


