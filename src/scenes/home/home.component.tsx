import React from "react"
import { Layout, LayoutElement } from "@ui-kitten/components"
import { HomeScreenProps } from "../../navigation/home.navigator"
import { Dimensions, Image, Linking, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity } from "react-native"
import Carousel from "react-native-banner-carousel"
import { SafeAreaView } from "react-native-safe-area-context"





export const HomeScreen = (props: HomeScreenProps): LayoutElement => {

  const BannerWidth = Dimensions.get('window').width;
  const BannerHeight = 200;


        return(
        <Layout>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}} />

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




        </Layout>
    )
}

const styles = StyleSheet.create({
  mainContainer:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 200
  }
});