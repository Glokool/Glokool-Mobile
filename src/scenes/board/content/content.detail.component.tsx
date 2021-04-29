import React from 'react'
import { Layout, LayoutElement, Text } from "@ui-kitten/components";
import { ContentDetailScreenProps } from '../../../navigation/board.navigator';
import { Dimensions, Image, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { SceneRoute } from '../../../navigation/app.route';
import Carousel from 'react-native-banner-carousel';
import axios from 'axios';
import { SERVER } from '../../../server.component';
import { ScrollView } from 'react-native-gesture-handler';


export const ContentDetailScreen = (props: ContentDetailScreenProps): LayoutElement => {

    const contentID = props.route.params.id;
    const [content, setContent] = React.useState(null);
    const BannerSize = Dimensions.get('window').width;

    React.useEffect(() => {
        axios.get(SERVER + '/api/contents/' + contentID)
        .then((result) => {
            setContent(result.data);
            console.log(result.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <ScrollView style={{backgroundColor: 'white'}}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <ImageBackground source={require('../../../assets/content/background.png')} style={{ width: '100%' }} resizeMode={'stretch'} >

            {/* Top 바 */}
            <Layout style={{ height: 70, width: '100%' , flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#00FF0000' }}>

                <Layout style={{ flex: 1, backgroundColor: '#00FF0000' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate(SceneRoute.CONTENT_LIST)}>
                        <FontAwesomeIcon icon={faAngleLeft} size={20}/>
                    </TouchableOpacity>                    
                </Layout>

                <Layout style={{ flex: 6, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#00FF0000'}} >
                    <Text style={{ fontSize: 22, fontFamily: 'BrandonGrotesque-Black', textAlign: 'center' }}>Content</Text>
                </Layout>

            </Layout>

            {(content)?
            <Layout style={{ width: '100%', backgroundColor: '#00FF0000' }}>
                
                <Carousel
                    autoplay={false}
                    loop
                    index={0}
                    pageSize={BannerSize}
                >                
                {(content.images.map((item) =>   
                    <Layout style={{ width : Dimensions.get('window').width, height: Dimensions.get('window').width }}>
                        <Image style={{width: BannerSize, height: BannerSize, resizeMode: 'stretch',}} source={{uri: item}}/>
                    </Layout>
                ))}
                </Carousel>

                <Text style={{ fontFamily : 'IBMPlexSansKR-Medium', fontSize: 16, marginTop: 20, marginBottom: 0, textAlign: 'center', backgroundColor: '#00FF0000'}}>{content.title}</Text>

                <Layout style={{ justifyContent: 'center', padding: 20, backgroundColor: '#00FF0000'}}>
                    
                    <Text style={{ fontFamily: 'BrandonGrotesque-Black', color: '#FFD774', fontSize: 22 }}>More Content</Text>

                </Layout>
            </Layout>

            
            :
            null
            }
                



            </ImageBackground>
        </ScrollView>
    );
}