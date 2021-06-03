import React from 'react'
import { 
    TouchableOpacity,
    FlatList, 
    ScrollView,
    View,
    Image,
    Dimensions,  
    StyleSheet, 
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { Layout, LayoutElement, styled, Text } from "@ui-kitten/components"
import { SeriesADetailContentProps } from '../../navigation/ScreenNavigator/Series.navigator';
import moment from "moment";


type Series_Item = {
    image: string,
    count: number,
    _id: string,
    title: string,
    createdAt: Date,
}


const SeriesImgW = Dimensions.get('window').width;

export const SeriesADetail = (props : SeriesADetailContentProps) : LayoutElement => {
    const [content, setContent] = React.useState<Array<Series_Item>>([]);
    const [image, setImage] = React.useState();

    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/contents');
        var Data = Content.data;
        console.log(new Date(Content.data))
        // Content.data.sort(function (a, b) {
        //     return new Date(a.createdAt) - new Date(b.createdAt);
        //   });
        
        setContent(Content.data);
        console.log(Content.data);
    }

    return (
        <Layout style={styles.SeriesContainer} >
            {(content.map((item) =>
                <TouchableOpacity style={styles.SeriesInnerContainer}>
                    <Image style={styles.SeriesImage} source={{uri: item.image}} />
                    <Layout style={styles.SeriesLayout}>
                        <Text style={styles.SeriesTxtStyle} numberOfLines = {2}>{item.title}</Text>
                        <Layout style={styles.SeriesBottomLayout}>
                            <Text style={styles.SeriesDateTxtStyle}>{moment(item.createdAt).format("YYYY-MM-DD")}</Text>
                            <Text style={styles.SeriesCountTxtStyle}>{item.count}</Text>
                        </Layout>
                    </Layout>
                </TouchableOpacity>
            ))}
        </Layout>
    )
}

const styles = StyleSheet.create({
    SeriesContainer: {
        marginTop: 30,
    },
    SeriesInnerContainer: {
        marginLeft: 30,
        marginRight: 30,
        width: SeriesImgW - 60,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection:'row',
        // alignItems:'center',
    },
    SeriesImage: {
        width: (SeriesImgW - 60) * 0.3,
        height: (SeriesImgW - 60) * 0.3,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        resizeMode: 'stretch',
    },
    SeriesLayout: {
        width: '70%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    SeriesTxtStyle: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 18,
        color: '#000000',
        marginLeft: 20,
        marginRight: 5,
        marginTop: 10,
    },
    SeriesBottomLayout: {
        flexDirection:'row',
        marginLeft: 20
    },
    SeriesDateTxtStyle: {
        color:'#B5B5B5',
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
    },
    SeriesCountTxtStyle: {
        color:'#B5B5B5',
        fontFamily:'IBMPlexSansKR-Medium',
        fontSize:15,
    },
   
})

