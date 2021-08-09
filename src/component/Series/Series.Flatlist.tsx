import React from 'react'
import auth from '@react-native-firebase/auth'
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { Layout, LayoutElement, styled, Text } from "@ui-kitten/components"
import { SeriesFlatlistProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { SceneRoute } from '../../navigation/app.route';

type Series_Item = {
  banner: string,
  title: string,
  _id: string,
  loc: string,
  region: string,
}

/*
[{"_id": "60b4642c230e71b5684266f7", 
"banner": "https://glokool-api.s3.ap-northeast-2.amazonaws.com/tour/60b4642c230e71b5684266f7/preview/16225374526929dd01e7a-4dc9.png", 
"loc": "3, Dapsimni-ro, Dongdaemun-gu, Seoul, Korea", 
"region": "seoul", 
"title": "test2"}, 
*/

const SeriesImgW = Dimensions.get('window').width;

export const SeriesFlatlist = (props: SeriesFlatlistProps): LayoutElement => {
  const [content, setContent] = React.useState<Array<Series_Item>>([]);

  React.useEffect(() => {
    InitSeries();
  }, []);

  
  async function InitSeries() {

    const config = {
      Method: "get",
      url: SERVER + "/api/main-tours",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    };

    var Content = await axios(config);
    var Data = Content.data;
    Data.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setContent(Content.data);
  }



  const renderTour = (item: { index: number, item: Series_Item }) => {

    return (
      <Pressable style={styles.ImageContainer} onPress={() => { props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL, { TourCode: item.item._id }) }}>
        <Image source={{ uri: item.item.banner }} style={styles.Image} resizeMode={'stretch'} />

        <Layout style={styles.TitleContainer}>
          <Text style={styles.TitleText}>{item.item.title}</Text>
        </Layout>

      </Pressable>
    )
  };

  const renderHeader = () => {
    return <View style={{width:35}}></View>
  }


  return (
    <Layout
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
      }}>
      <FlatList
        data={content}
        renderItem={renderTour}
        contentContainerStyle={{ paddingRight: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        ListHeaderComponent={renderHeader}
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
  // SeriesImgStyle: {
  //   width: SeriesImgW * 0.42,
  //   height: SeriesImgW * 0.42 * 1.2,
  //   borderRadius: 10,
  //   position: 'relative'
  // },
  SeriesTxtStyle: {
    position: 'absolute',
    bottom: 10,
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 20,
    color: '#FFFFFF',
  },
  ImageContainer: {
    width: SeriesImgW * 0.42,
    height: SeriesImgW * 0.52,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10
  },
  Image: {
    width: SeriesImgW * 0.42,
    height: SeriesImgW * 0.52,
    borderRadius: 10,
  },
  TitleContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#00FF0000'
  },
  TitleText: {
    fontFamily: 'BrandonGrotesque-BoldItalic',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  }

})


