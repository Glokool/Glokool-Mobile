import React from "react"
import { Layout, LayoutElement } from "@ui-kitten/components"
import { HomeScreenProps } from "../../navigation/home.navigator"
import { Animated, Dimensions, Image, Linking, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native"
import Carousel from "react-native-banner-carousel"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlatList } from "react-native-gesture-handler"
import axios from "axios"
import { SERVER } from "../../server.component"
import { PageIndicatorConfig } from "react-native-banner-carousel/out/Carousel"
import { NavigatorRoute, SceneRoute } from "../../navigation/app.route"





export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

  const [content, setContent] = React.useState([]);
  const [tour, setTour] = React.useState([]);
  const BannerWidth = Dimensions.get('window').width;
  const BannerHeight = 110;

  const banner = [
    {
      url : 'https://glokool.com',
      image: require('../../assets/feed_banner_01.png'),
    },
    {
      url : 'https://glokool.com',
      image: require('../../assets/feed_banner_02.png'),
    },
    {
      url : 'https://www.youtube.com/channel/UC4oTkStEsZooHYGZlDkxp1Q',
      image: require('../../assets/feed_banner_03.png'),
    },
    {
      url : 'https://www.instagram.com/glokool_official/',
      image: require('../../assets/feed_banner_04.png'),
    },
  ]
  

  React.useEffect(() => {

    axios.get(SERVER + '/api/contents')
      .then((result) => {
        setContent(result.data);
      })
      .catch((err) => {

      })

    axios.get(SERVER + '/api/tour/recommend')
      .then((result) => {
        setTour(result.data);
        console.log(result.data)
      })
      .catch((err) => {

      })
    




  }, [])


  const renderTour = ({item}) => {

    const PressTour = (id: string) => {

    }

    return(
      <Layout style={{ margin: 10}}>
        
        <TouchableOpacity onPress={() => PressTour(item.id)}>
          <Image source={{ uri : item.banner}} style={{ width: 250, height: 330, resizeMode: 'stretch', borderRadius: 5 }}/>
        </TouchableOpacity>

        <Layout style={{ alignItems: 'center', bottom: 50, backgroundColor: '#00FF0000'}}>
          <Text style={{ fontSize: 25, fontFamily: 'BrandonGrotesque-Black', color: 'white' }}>{item.title}</Text>
        </Layout>


      </Layout>
    )

  }

  const renderContent = ({item}) => {

    const PressContent = (id : string) => {

    }

    return(
      <TouchableOpacity style={{ margin: 10 }} onPress={() => {PressContent(item.id)}}>
        <Image source={{ uri : item.image}} style={{ width: 170, height: 170, borderRadius: 15, resizeMode: 'stretch'}}/>
      </TouchableOpacity>
    );
  }




  return(
    <ScrollView>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white'}} />

        {/* 투어 추천 */}
        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, marginVertical: 10 }}>

          <Layout style={{ flex: 1, }}>
            <Text style={{ fontSize: 25, fontFamily: 'BrandonGrotesque-Black' }}>Recommend Tour</Text>
          </Layout>

          <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}} onPress={() => props.navigation.navigate('FEED') }>
            <Text style={{ fontSize: 15, fontFamily: 'BrandonGrotesque-Black', color: '#FFD878' }}>SEE MORE</Text>
          </TouchableOpacity>      

        </Layout>

        <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>

          <FlatList
            style={{backgroundColor: '#00FF0000'}}
            data={tour}
            renderItem={renderTour}
            horizontal={true}
            keyExtractor={item => item.id}
            getItemLayout={(data, index) => (
              {length: 300, offset: 200 * index, index}
            )}
            initialScrollIndex={1}
          />

        </Layout>


        {/* 캐러셀 */}
        <Layout style={styles.mainContainer}>
          <Carousel
              autoplay
              autoplayTimeout={5000}
              loop
              index={0}
              pageSize={BannerWidth}
          >
            {(banner.map((item) =>   
              <TouchableOpacity onPress={() => {Linking.openURL(item.url)}} style={styles.banner}>
                <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch', borderRadius: 5}} source={item.image}/>
              </TouchableOpacity>
            ))}
              
          </Carousel>

        </Layout>

      {/* 컨텐츠 */}
      <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, marginVertical: 10 }}>

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


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 120,
    borderColor: '#FFD774',
    borderWidth: 2
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});