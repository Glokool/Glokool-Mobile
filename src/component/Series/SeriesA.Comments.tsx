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
import { Layout, LayoutElement, styled, Text } from "@ui-kitten/components"
import { SeriesADetailInfoCommentsProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { SERVER } from '../../server.component';
import axios from 'axios';

type Series_Item = {
    images: Array<string> ,
    comments: Array<string>,
    _id: string,
    count:string,
    desc: string,
    gloPick: string,
    plus: Array<string>,
    title: string,
    createdAt: Date,
}

export const  SeriesAComments = (props : SeriesADetailInfoCommentsProps) : LayoutElement => {
    const [content, setContent] = React.useState<Series_Item>();
    const [comments, setComments] = React.useState<Array<string>>([]);
    console.log(comments)

      
    return (
       <Layout style={styles.CommentsConainer}>
           <Layout style={styles.CommentsInnerConainer}>
            <Layout style={styles.CommentsTitleLayout}>
                <Text style={styles.CommentsTitleTxt}>Comments</Text>
            </Layout>
           </Layout>
       </Layout>
    )
}

const styles = StyleSheet.create({
    CommentsInnerConainer:{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15
    },
    CommentsTitleLayout: {
    },
    CommentsTitleTxt:{
        fontFamily:'BrandonGrotesque-Bold',
        fontSize:20,
        color: '#000000',

    }
})

