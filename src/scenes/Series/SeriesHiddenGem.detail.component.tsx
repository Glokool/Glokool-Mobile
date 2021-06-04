import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import { SeriesHiddenGemDetailProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { 
    LayoutElement,
    Layout,
    Text,
} from '@ui-kitten/components';
import axios from 'axios';
import { SERVER } from '../../server.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AngleLeft_W, Bookmark_W, Plus_W } from '../../assets/icon/Common';

const ImageSize = Dimensions.get('window').width;

export const SeriesHiddenGemDetailScreen = (props : SeriesHiddenGemDetailProps) : LayoutElement => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState();

    React.useEffect(() => {

    }, []);

    async function InitHiddenGemDetail() {
        const HiddenGemDetailData = await axios.get(SERVER + '/api/tours');
    }

    async function PressPlus() {

    }

    return(
        <Layout style={styles.MainContainer}>

            {/* 탑 이미지 */}
            <Layout style={styles.TopImageContainer}>

                <Image source={{}} style={styles.TopImageContainer} resizeMode={'stretch'}/>


            </Layout>


            {/* 탑 탭 바 */}
            <Layout style={styles.TopTabBar}>
                <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />

                <Layout style={styles.TopTabBarContainer}>

                    <TouchableOpacity style={styles.BackButton} onPress={() => props.navigation.goBack()}>
                        <AngleLeft_W />
                    </TouchableOpacity>

                    <Text style={styles.TitleText}>Title</Text>

                </Layout>

                <Layout style={styles.TopTabBarContainer2}>

                    <TouchableOpacity style={styles.BookmarkButton}>
                        <Bookmark_W />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.PlusButton}>
                        <Plus_W />
                    </TouchableOpacity>

                </Layout>
            </Layout>


        </Layout>
    );
}

const styles = StyleSheet.create({

    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    TopImageContainer: {
        width: ImageSize,
        height: ImageSize,
    },
    TopTabBar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        flexDirection: 'row',
    },
    TopTabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
        flex: 1
    },
    TopTabBarContainer2: {
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
        flex: 1,
        justifyContent: 'flex-end'
    },
    BackButton: {
        padding: 10,
        marginLeft: 20,
    },
    TitleText:{
        color: 'white',
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 23,
        marginLeft: 30
    },
    BookmarkButton: {
        padding: 10,
        marginRight: 10
    },
    PlusButton: {
        padding: 10,
        marginRight: 20
    }

});