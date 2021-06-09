import React from 'react'
import { Divider, Layout, LayoutElement,  } from '@ui-kitten/components'
import { 
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    FlatList, 
    ScrollView,
    View,
    TextInput
} from 'react-native';
import { NavigatorRoute } from "../../navigation/app.route"
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SeriesBDetailInfoProps } from '../../navigation/ScreenNavigator/Series.navigator';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from "moment";
import { SceneRoute } from '../../navigation/app.route';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type recommendation_Item = {
    _id: string,
    image: string,
    title: string,
}

type Comments_Item = {
    writer: {
        uid: string,
        name: string,
        avatar: string,
        grade: string,
    },
    comment: string,
    parentComment: string,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
}

type Series_Item = {
    images: Array<string> ,
    comments: Array<Comments_Item>,
    _id: string,
    count:string,
    desc: string,
    gloPick: string,
    plus: Array<string>,
    title: string,
    createdAt: Date,
    recommendation: Array<recommendation_Item>
}

export const SeriesBInfoScreen = (props : SeriesBDetailInfoProps) : LayoutElement => {
    const [Id, setId] = React.useState(props.route.params.Id);
    const [content, setContent] = React.useState<Series_Item>();
    return (
        <Layout></Layout>
    )
}

