import React from "react"
import { Layout, LayoutElement } from "@ui-kitten/components"
import { HomeScreenProps } from "../../navigation/home.navigator"
import { Dimensions, Image, Linking, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity } from "react-native"
import Carousel from "react-native-banner-carousel"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList } from "react-native-gesture-handler"
import axios from "axios"
import { SERVER } from "../../server.component"





export const HomeScreen = (props: HomeScreenProps): LayoutElement => {


  const [content, setContent] = React.useState([]);
  const BannerWidth = Dimensions.get('window').width;
  const BannerHeight = 150;
  

  React.useEffect(() => {

    axios.get(SERVER + '/api/contents')
      .then((result) => {
        setContent(result.data);
      })
      .catch((err) => {

      })



  }, [])



  const renderContent = ({item}) => {

    const PressContent = (id : string) => {

    }

    return(
      <TouchableOpacity style={{ margin: 15 }} onPress={() => {PressContent(item.id)}}>
        <Image source={{ uri : item.image}} style={{ width: 170, height: 170, borderRadius: 15, resizeMode: 'stretch'}}/>
      </TouchableOpacity>
    );
  }


  return(
    <Layout style={styles.home}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}} />


        {/* 캐러셀 */}
        <Layout style={styles.mainContainer}>
          <Carousel
              autoplay
              autoplayTimeout={5000}
              loop
              index={0}
              pageSize={BannerWidth}
          >
              <TouchableOpacity onPress={() => {Linking.openURL('https://glokool.com')}}>
                <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_01.png')}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {Linking.openURL('https://glokool.com')}}>
                <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_02.png')}/>
              </TouchableOpacity>
              

              <TouchableOpacity onPress={() => {Linking.openURL('https://www.youtube.com/channel/UC4oTkStEsZooHYGZlDkxp1Q')}}>
                <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_03.png')}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {Linking.openURL('https://www.instagram.com/glokool_official/')}}>
                <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch'}} source={require('../../assets/feed_banner_04.png')}/>
              </TouchableOpacity>
          </Carousel>

        </Layout>

      {/* 컨텐츠 */}
      <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, marginVertical: 10 }}>

        <Layout style={{ flex: 1, }}>
          <Text style={{ fontSize: 25, fontFamily: 'BrandonGrotesque-Black' }}>Contents</Text>
        </Layout>

        <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Text style={{ fontSize: 15, fontFamily: 'BrandonGrotesque-Black', color: '#FFD878' }}>SEE MORE</Text>
        </TouchableOpacity>       

      </Layout>

      <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>

        <FlatList
          style={{backgroundColor: '#00FF0000'}}
          data={content}
          renderItem={renderContent}
          keyExtractor={item => item.id}
          numColumns={2}
        />

      </Layout>


    </Layout>
  )
}

const styles = StyleSheet.create({
  home : {

  },
  mainContainer:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 150
  }
});