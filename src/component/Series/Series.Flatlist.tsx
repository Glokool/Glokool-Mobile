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
    banner: '',
    title: '',
    _id: '',
    loc:'',
    region:'',
}

const SeriesImgW = Dimensions.get('window').width * 0.42;

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
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "center",
            margin: 15,
          }}
        >
          <TouchableOpacity>
            <Layout style={styles.SeriesStyle} >
              <Image source={{ uri: item.banner }} style={styles.SeriesImgStyle} />
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
    alignItems: "center",
    
  },
  SeriesImgStyle: {
    width: SeriesImgW,
    height: SeriesImgW*1.2,
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


