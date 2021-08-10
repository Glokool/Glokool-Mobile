import React, { useEffect, useState } from 'react'
import {
    ScrollView,
    View,
    Dimensions,
    Image,
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SceneRoute } from '../../navigation/app.route';
import { FlatGrid } from 'react-native-super-grid';
import { TestBanner } from '../../assets/icon/Series';

type GridItem = {
    image: string,
    title: string,
}

const windowWidth = Dimensions.get('window').width;

export const SeriesGrid = () => {

    const [content, setContent] = useState<Object>([]);

    useEffect(() => {
        InitGrid();
    }, [])

    const InitGrid = async () => {
        const tmpContent: Array<Object> = [];
        const config = {
            Method: "get",
            url: SERVER + "/api/main-tours",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        };

        const hiddenGem = await axios(config);
        const hiddenGemData = hiddenGem.data;
        hiddenGemData.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        hiddenGem.data.map((item: any, index: any) => {
            tmpContent.push(({
                image: item.banner,
                title: item.title,
            }))
        })

        const seriesA = await axios.get(SERVER + '/api/contents');
        seriesA.data.map((item: any, index: any) => {
            tmpContent.push(({
                image: item.image,
                title: item.title,
            }))
        })

        const seriesB = await axios.get(SERVER + '/api/blog');
        seriesB.data.map((item: any, index: any) => {
            tmpContent.push(({
                image: item.cover,
                title: item.title,
            }))
        })
        tmpContent.sort(() => Math.random() - 0.5);
        setContent(tmpContent);
    }

    const renderItem = (item: { index: number, item: GridItem }) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10, overflow: 'hidden' }}>
                <Image source={{ uri: item.item.image }} style={{ width: windowWidth * 0.33, height: windowWidth * 0.33, }} resizeMode={'stretch'} />
                {/* <Text>{item.item.title}</Text> */}
            </View>
        )
    }

    return (
        <View>
            <TestBanner />

            <FlatGrid
                itemDimension={100}
                data={content}
                renderItem={renderItem}
                spacing={1.5}
            />

        </View>
    )

}