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
import { SceneRoute } from '../../navigation/app.route';

type Series_Item = {
    cover: string,
    desc: string,
    _id: string,
    title: string,
    comments: string,
}

const SeriesImgW = Dimensions.get('window').width;

export const SeriesBFlatlist = (props : SeriesBFlatlistProps) : LayoutElement => {
    const [content, setContent] = React.useState<Array<Series_Item>>([]);

    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/blog');
        var Data = Content.data;
        Data.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setContent(Content.data);
    }

    const renderTour = (item : {index: number, item: Series_Item}) => {
      return(
          <TouchableOpacity style={styles.SeriesStyle} onPress={() => {props.navigation.navigate(SceneRoute.SERIES_B_DETAIL, {Id : item.item._id})}}>
            <Image source={{ uri: item.item.cover }} style={styles.SeriesImgStyle} />
            <Text style={styles.SeriesTxtStyle}>{item.item.title}</Text>
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
                contentContainerStyle={{paddingRight: 20}}
                showsHorizontalScrollIndicator={false}
                horizontal
                />
            </Layout>
    )
}

const styles = StyleSheet.create({
  SeriesStyle: {
    justifyContent: "flex-start", 
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
    color: '#000000',
    marginTop: 2, 
    width: SeriesImgW*0.27,
    justifyContent: 'flex-start'

  },

})


