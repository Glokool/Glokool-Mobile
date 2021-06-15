import { LayoutElement, ListItem,Layout, Text } from '@ui-kitten/components';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { string } from 'yup/lib/locale';
import { Count } from '../../assets/icon/Common';
import { SceneRoute } from '../../navigation/app.route';
import { HiddenGemInKoreaFlatListProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { SERVER } from '../../server.component';
import { Loading } from '../Common/Loading';

const SeriesImgW = Dimensions.get('window').width;

type Series_Item = {
    banner: string,
    title: string,
    _id: string,
    loc: string,
    region: string,
    createdAt: Date,
    tag: Array<string>,
    count: number,
}

export const HiddenGemInKoreaFlatList = (props: HiddenGemInKoreaFlatListProps) : LayoutElement => {

    const [data, setData] = React.useState();

    React.useEffect(() => {
        InitHiddenGemInKoreaFlatList();
    }, []);

    async function InitHiddenGemInKoreaFlatList() {
        
        const config = {
            Method: "get",
            url: SERVER + "/api/main-tours",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            }
        };

        const TourData = await axios(config);
        TourData.data.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setData(TourData.data);

    }

    const renderItem = (item : { item : Series_Item, index: number }) : LayoutElement => {

        return(
            <TouchableOpacity style={(item.index % 2 === 0)? styles.TourContainerEven : styles.TourContainerOdd } onPress={() => {props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL, { TourCode: item.item._id })}}>
                
                <Layout style={styles.ImageContainer}>
                    <Image source={{uri : item.item.banner}} style={(item.index % 2 === 0)? styles.ImageEven : styles.ImageOdd } resizeMode={'stretch'}/>
                    
                    <Layout style={styles.TitleContainer}>
                        <Text style={styles.TitleText}>{item.item.title}</Text>
                    </Layout>
                </Layout>

                <Layout style={styles.infoContainer}>

                    <Layout style={styles.infoContainer1}>
                        {item.item.tag.map((tag, idx) => 
                            <Text style={styles.TagText}><Text style={styles.TagText2}>#</Text> {`${tag} `}</Text>
                        )}                    
                    </Layout>

                    <Layout style={styles.infoContainer2}>

                        <Layout style={{flex: 1, backgroundColor: '#00FF0000'}}>
                            <Text style={styles.CreateText} numberOfLines={1}>{moment(item.item.createdAt).format('YY. MM. DD')}</Text>
                        </Layout>

                        <Layout style={styles.CountContainer}>
                            <Count />
                            <Text style={styles.CountText}>{`  ${item.item.count}`}</Text>
                        </Layout>                      

                    </Layout>                    

                </Layout>
                
            </TouchableOpacity>
        )
    }

    return(
        <FlatList
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginTop: 10, paddingBottom: 100}}
            numColumns={2}
        />

    )
}

const styles = StyleSheet.create({
    TourContainerOdd: {
        width: SeriesImgW * 0.42,
        minHeight: SeriesImgW * 0.57,
        borderRadius: 15,
        marginRight: 30,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    ImageContainer: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    ImageOdd: {
        width: SeriesImgW * 0.42,
        height: SeriesImgW * 0.42,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    TourContainerEven: {
        width: SeriesImgW * 0.42,
        minHeight: SeriesImgW * 0.57,
        borderRadius: 15,
        marginLeft: 30,
        marginRight: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    ImageEven: {
        width: SeriesImgW * 0.42,
        height: SeriesImgW * 0.42,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    TitleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        backgroundColor: '#00FF0000'
    },
    TitleText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 20,
        color: 'white'
    },
    TagText:{
        fontFamily: 'BrandonGrotesque-MediumItalic',
        fontSize: 15,
        color: 'black'
    },
    TagText2:{
        fontFamily: 'BrandonGrotesque-MediumItalic',
        fontSize: 15,
        color: '#838383'
    },
    infoContainer: {
        backgroundColor: '#00FF0000',
        minHeight: SeriesImgW * 0.15,
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
    },
    infoContainer1: {
        backgroundColor: '#00FF0000',
        width: SeriesImgW * 0.42,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingRight: 10,

    },
    infoContainer2: {
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
    },
    CreateText: {
        fontFamily : 'IBMPlexSansKR-Text',
        color: '#B5B5B5',
        fontSize: 13,
        textAlign: 'left',
        backgroundColor: '#00FF0000',
    },
    CountText:{
        fontFamily : 'IBMPlexSansKR-Text',
        color: '#B5B5B5',
        fontSize: 13,
        textAlign: 'right',
        backgroundColor: '#00FF0000',
    },
    CountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#00FF0000',
    },
    CountIcon: {
        marginRight: 15
    }
})