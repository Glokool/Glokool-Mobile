import React from 'react'
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
import { SeriesAFlatlistProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { SceneRoute } from '../../navigation/app.route';


type Series_Item = {
  image: string,
  plus: string,
  _id: string,
  title: string,
  comments: string,
}

const SeriesImgW = Dimensions.get('window').width;

export const SeriesAFlatlist = (props: SeriesAFlatlistProps): LayoutElement => {
  const [content, setContent] = React.useState<Array<Series_Item>>([]);

  React.useEffect(() => {
    InitSeries();
  }, []);

  async function InitSeries() {
    var Content = await axios.get(SERVER + '/api/contents');
    var Data = Content.data;
    Data.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setContent(Content.data);
  }

  const renderTour = (item: { index: number, item: Series_Item }) => {
    return (
      <Pressable style={styles.SeriesStyle} onPress={() => { props.navigation.navigate(SceneRoute.SERIES_A_DETAIL, { Id: item.item._id }) }}>
        <Image source={{ uri: item.item.image }} style={styles.SeriesImgStyle} />
        <Text style={styles.SeriesTxtStyle} numberOfLines={2}>{item.item.title}</Text>
      </Pressable>
    )
  };

  const renderHeader = () => {
    return <View style={{ width: 35 }}></View>
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
        horizontal={true}
        ListHeaderComponent={renderHeader}
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
    width: SeriesImgW * 0.27,
    height: SeriesImgW * 0.27,
    borderRadius: 10,
  },
  SeriesTxtStyle: {
    fontFamily: 'IBMPlexSansKR-Medium',
    fontSize: 15,
    width: SeriesImgW * 0.27,
    color: '#000000',
    marginVertical: 0,
    justifyContent: 'flex-start',
    lineHeight: 20,
    marginTop: 10,
  },

})


