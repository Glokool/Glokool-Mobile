import React from 'react'
import { Layout, LayoutElement, Text } from "@ui-kitten/components"
import { ContentListScreenProps } from '../../../navigation/board.navigator'
import { SERVER } from '../../../server.component'
import axios from 'axios'
import { FlatList, Image, ImageBackground, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { SceneRoute } from '../../../navigation/app.route'


export const ContentListScreen = (props: ContentListScreenProps): LayoutElement => {

    const [content, setContent] = React.useState([]);
    const [glopick, setGlopick] = React.useState([]);

    React.useEffect(() => {
        axios.get(SERVER + '/api/contents')
          .then((result) => {
            setContent(result.data);
          })
          .catch((err) => {
            console.log(err);
          })
 
    }, [])

    const renderContent = ({item}) => {

        return(
            <TouchableOpacity style={styles.content} onPress={() => {PressContent(item.id)}}>
                <Image source={{ uri : item.image }} style={styles.glopickImage}/>
            </TouchableOpacity>
        )
    }

    const PressContent = (id : string) => {
        props.navigation.navigate(SceneRoute.CONTENT_DETAIL, { id })
    }


    return(
        <Layout>

            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <ScrollView>
            <ImageBackground source={require('../../../assets/content/background.png')} style={{ width: '100%' }} resizeMode={'stretch'} >

            {/* Top 바 */}
            <Layout style={{ height: 70, width: '100%' , flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#00FF0000' }}>

                <Layout style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate(SceneRoute.BOARD)}>
                        <FontAwesomeIcon icon={faAngleLeft} size={20}/>
                    </TouchableOpacity>                    
                </Layout>

                <Layout style={{ flex: 5, alignItems: 'center', justifyContent: 'center'}} >
                    <Text style={{ fontSize: 22, fontFamily: 'BrandonGrotesque-Black', textAlign: 'center' }}>Full Content</Text>
                </Layout>

                <Layout style={{ flex: 1 }} />

            </Layout>

            

            {/* 글로픽 두개 화면 */}
            {(content.length != 0)?
            <Layout style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00FF0000', marginBottom: 20 }}>

                <TouchableOpacity style={styles.gloPick} onPress={() => PressContent(content[0].id)}>                    
                    <Image source={{ uri : content[0].image }} style={styles.glopickImage}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gloPick} onPress={() => PressContent(content[1].id)}>                  
                    <Image source={{ uri : content[1].image }} style={styles.glopickImage}/>
                </TouchableOpacity>

                <Layout style={{ position: 'absolute', top: 0, left: 65, backgroundColor: '#00FF0000' }}>
                    <Image source={require('../../../assets/content/glo.png')} style={{ width: 65, height: 29 }} />
                </Layout>

                <Layout style={{ position: 'absolute', top: 0, right: 65, backgroundColor: '#00FF0000' }}>
                        <Image source={require('../../../assets/content/pick.png')} style={{ width: 65, height: 29 }} />
                </Layout>

            </Layout>
            :
                null
            }

            <Layout style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00FF0000' }}>
                <FlatList
                    data={content}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#00FF0000' }}
                    renderItem={renderContent}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                />
            </Layout>

            </ImageBackground>
            </ScrollView>

        </Layout>
    );
}

const styles = StyleSheet.create({
    gloPick: {
        marginTop: 10,
        backgroundColor: '#00FF0000' 
    },
    glopickImage:{
        width : 180, 
        height: 180,
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        backgroundColor: '#00FF0000',
        zIndex: 20
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF0000' 
    }


});