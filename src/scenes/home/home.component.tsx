import React from "react"
import { Layout, LayoutElement } from "@ui-kitten/components"
import { HomeScreenProps } from "../../navigation/home.navigator"
import { Dimensions, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native"
import Carousel from "react-native-banner-carousel"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import { SERVER } from "../../server.component"
import auth from '@react-native-firebase/auth';
import { NavigatorRoute, SceneRoute } from "../../navigation/app.route"


export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

  const [content, setContent] = React.useState([]);
  const [tour, setTour] = React.useState([]);
  const BannerWidth = Dimensions.get('window').width * 0.8;
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

  const PressLogin = () => {
    if(auth().currentUser){
      null;
    }
    else{
      props.navigation.replace(NavigatorRoute.AUTH)
    }
  }


  const renderTour = ({item}) => {

    const PressTour = (id: string) => {

    }

    return(
      <Layout style={{ padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        
        <TouchableOpacity onPress={() => PressTour(item.id)}>
          <Image source={{ uri : item.banner}} style={{ width: 250, height: 330, resizeMode: 'stretch', borderRadius: 5 }}/>
        </TouchableOpacity>

        <Layout style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center',bottom: 20, backgroundColor: '#00FF0000'}}>
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
        <Image source={{ uri : item.image}} style={{ width: 216, height: 216, borderRadius: 15, resizeMode: 'stretch'}}/>
      </TouchableOpacity>
    );
  }




  return(
    <Layout style={{ alignItems : 'flex-start'}}>
      

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <Layout style={{ width: '100%', height: 80 }} />

          <ImageBackground source={require('../../assets/HomeBackground1.png')} style={{ width: '100%' }} resizeMode={'stretch'}>
            
            <Layout style={{ backgroundColor: '#00FF0000', marginVertical: 10 }}>
              

                  <Layout style={{ alignItems: 'flex-start', backgroundColor: '#00FF0000', padding :20}}>
                    <Image source={require('../../assets/HomeMainChat.png')} />
                  </Layout>
                  
                  <TouchableOpacity style={{ alignItems: 'flex-end', backgroundColor: '#00FF0000', paddingHorizontal: 20, paddingBottom: 10}}>
                    <Image source={require('../../assets/HomeMainChat2.png')} />
                  </TouchableOpacity>

            </Layout>
         

          {/* 투어 추천 */}
          <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, marginVertical: 10, backgroundColor: '#00FF0000' }}>

            <Layout style={{ flex: 1,  backgroundColor: '#00FF0000' }}>
              <Text style={{ fontSize: 25, fontFamily: 'BrandonGrotesque-Black' }}>Find Your Tour</Text>
            </Layout>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#00FF0000'}} onPress={() => props.navigation.navigate('FEED') }>
              <Text style={{ fontSize: 15, fontFamily: 'BrandonGrotesque-Black', color: '#FFD878' }}>SEE MORE</Text>
            </TouchableOpacity>      

          </Layout>

          </ImageBackground>

          <Layout style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>

            <FlatList
              style={{backgroundColor: '#00FF0000'}}
              data={tour}
              renderItem={renderTour}
              horizontal={true}
              initialNumToRender={3}
              keyExtractor={item => item.id}
              getItemLayout={(data, index) => (
                {length: 350, offset: 270 * index, index}
              )}
              initialScrollIndex={0.7}
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
                  <Image style={{width: BannerWidth, height: BannerHeight, resizeMode: 'stretch', borderRadius: 5 }} source={item.image}/>
                </TouchableOpacity>
              ))}
                
            </Carousel>

          </Layout>

        {/* 컨텐츠 */}
        <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, marginVertical: 10 }}>

          <Layout style={{ flex: 3 }}>
            <Text style={{ fontSize: 25, fontFamily: 'BrandonGrotesque-Black' }}>Must See Contents</Text>
          </Layout>

          <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 15, fontFamily: 'BrandonGrotesque-Black', color: '#FFD878' }} onPress={() => props.navigation.navigate(SceneRoute.CONTENT_LIST)}>SEE MORE</Text>
          </TouchableOpacity>       

        </Layout>

        <Layout style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingRight: 30, marginVertical: 10 }}>

          <FlatList
            style={{backgroundColor: '#00FF0000'}}
            data={content}
            renderItem={renderContent}
            keyExtractor={item => item.id}
            horizontal={true}
          />

        </Layout>

        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, marginVertical: 10 }} onPress={() => props.navigation.navigate('BOARD')}>

          <Image source={require('../../assets/Banner.png')} />

        </TouchableOpacity>



      </ScrollView>
      
      <Layout style={{ position: 'absolute', top: 0, width: '100%', height: 80, paddingVertical: 20, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
          
          <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
            <SafeAreaView style={{flex: 0}} />
            <Image source={require('../../assets/glokoolLogo.png')}/>
          </Layout>
          
          <Layout style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00FF0000'}}>
            <SafeAreaView style={{flex: 0}} />
              <Layout style={{ flexDirection: 'row', backgroundColor: '#00FF0000' }}>

                <Layout style={styles.loginContainer} onTouchStart={() => {PressLogin()}}>
                  {(auth().currentUser)? 
                    <Text style={{ fontSize: 16, fontFamily: 'BrandonGrotesque-Black', marginHorizontal: 15}} numberOfLines={1}>{`Hi ! I'm ${auth().currentUser?.displayName}`}</Text>
                  :
                    <Text style={{ fontSize: 16, fontFamily: 'BrandonGrotesque-Black', color: '#B8B7B5', marginHorizontal: 15}}>{`Login`}</Text>
                  }                  
                </Layout>



                <TouchableOpacity onPress={() => props.navigation.navigate('MY PAGE')} style={{ backgroundColor: '#00FF0000'}}>
                  {(auth().currentUser)?
                    (auth().currentUser?.photoURL != '')?
                    <Image source={{uri : auth().currentUser?.photoURL}} style={{ width: 34, height: 34, borderRadius: 50, backgroundColor: '#00FF0000' }}/>
                    :
                    <Image source={require('../../assets/profile/profile_05.png')} style={{ width: 34, height: 34, backgroundColor: '#00FF0000' }}/>
                  :
                    <Image source={require('../../assets/profile/profile_06.png')} style={{ width: 34, height: 34, backgroundColor: '#00FF0000' }}/>
                  }
                </TouchableOpacity>
                
              </Layout>
              
          </Layout>



      </Layout>


    </Layout>

  )
}

const styles = StyleSheet.create({
  mainContainer:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 140,
    marginVertical: 10
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: Dimensions.get('window').width * 0.8,
    height: 110,
    padding: 2,
  },
  loginContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,    
    elevation: 6,

    padding: 5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10,  
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 15,
    maxWidth: 150
  }
});