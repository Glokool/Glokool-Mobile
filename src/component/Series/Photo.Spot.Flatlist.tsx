import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet
} from 'react-native'
import {
    Layout,
    LayoutElement,
    Text,
} from '@ui-kitten/components'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AngleLeft_Color, AngleRight_Color, Bookmark } from '../../assets/icon/Common';
import { Pin } from '../../assets/icon/Series';
import { Instagram, Naver } from '../../assets/icon/SNS';
import { SelectableText } from '../../component/Common/SelectableText.component'

type photoSpot = {
    _id: string;
    desc: string;
    images: Array<photoSpotImage>;
    location: string;
}

type photoSpotImage = {
    _id: string;
    author: string;
    img: string;
}

interface DetailFlatlistProps {
    data: Array<photoSpot> | undefined
}

const WindowSize = Dimensions.get('window').width;

export const PhotoSpotFlatlist = (props: DetailFlatlistProps): LayoutElement => {

    const data = props.data;
    const [change, setChange] = React.useState<Array<boolean>>(Array.from({ length: data?.length }, (undefined, i) => { return false }));
    const [refresh, setRefresh] = React.useState<boolean>(false);


    const PressChage = (index: number) => {

        var tempChange = change;
        tempChange[index] = !change[index];

        setChange(tempChange);
        setRefresh(!refresh);
    }

    const InsideRenderItem = (item: { item: photoSpotImage, index: number }) => {

        return (
            <Layout style={styles.InsideImageContainer}>
                <Image source={{ uri: item.item.img }} style={styles.InsideImage} resizeMode={'stretch'} />

                <Layout style={styles.authorContainer}>
                    {(item.item.author[0] === 'i') ?
                        <Instagram />
                        :
                        (item.item.author[0] === 'n') ?
                            <Naver />
                            :
                            null
                    }
                    {(item.item.author == "" || item.item.author == 'undefined' || item.item.author == undefined) ?
                        null
                        :
                        <Text style={styles.authorText}>
                            {`  ${item.item.author.slice(2,)}`}
                        </Text>
                    }
                </Layout>
            </Layout>
        )
    }

    const renderItem = (item: { item: photoSpot, index: number }) => {


        return (
            <Layout>
                {(change[item.index] === true) ?
                    <Layout style={styles.MainContainer2}>
                        <TouchableOpacity style={styles.BackButton} onPress={() => PressChage(item.index)}>
                            <AngleLeft_Color style={styles.AngleRightButton} />
                        </TouchableOpacity>

                        <Layout>
                            <FlatList
                                data={item.item.images.slice(1,)}
                                renderItem={InsideRenderItem}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                            <SelectableText style={styles.LocationText} item={item.item.desc}/>
                        </Layout>

                    </Layout>
                    :
                    <Layout style={styles.MainContainer}>
                        <Layout>
                            <Layout style={styles.ImageContainer}>
                                <Image source={{ uri: item.item.images[0].img }} style={styles.Image} resizeMode={'stretch'} />
                                <Layout style={styles.authorContainer}>
                                    {(item.item.images[0].author[0] === 'i') ?
                                        <Instagram />
                                        :
                                        (item.item.images[0].author[0] === 'n') ?
                                            <Naver />
                                            :
                                            null
                                    }

                                    {(item.item.images[0].author == "" || item.item.images[0].author == 'undefined' || item.item.images[0].author == undefined) ?
                                        null
                                        :
                                        <Text style={styles.authorText}>
                                            {`${item.item.images[0].author.slice(2,)}`}
                                        </Text>
                                    }
                                </Layout>
                                <TouchableOpacity style={styles.NextButton} onPress={() => PressChage(item.index)}>
                                    <AngleRight_Color style={styles.AngleRightButton} />
                                </TouchableOpacity>
                            </Layout>

                            <Layout style={styles.LocationContainer}>
                                <Pin style={styles.Pin} />
                                <SelectableText style={styles.LocationText} item={item.item.location}/>
                            </Layout>
                        </Layout>
                    </Layout>
                }

            </Layout>



        );
    }



    return (
        <Layout>
            <FlatList
                data={data}
                extraData={refresh}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        width: WindowSize * 0.72,
        minHeight: WindowSize,
        overflow: 'visible',
        marginLeft: 60,
        marginVertical: 20
    },
    MainContainer2: {
        width: WindowSize * 0.72,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginVertical: 20
    },
    authorContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 10,
        left: 20,
        backgroundColor: '#00FF0000'
    },
    authorText: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 13,
        color: 'white'
    },
    ImageContainer: {
        width: WindowSize * 0.90,
        height: WindowSize * 0.97,
        flexDirection: 'row',
        alignItems: 'center',
    },
    InsideImageContainer: {
        width: WindowSize * 0.72,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Image: {
        width: WindowSize * 0.72,
        height: WindowSize * 0.97,
    },
    InsideImage: {
        width: WindowSize * 0.58,
        height: WindowSize * 0.77,
    },
    LocationText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 17,
        color: 'black',
        marginTop: -5,
        marginRight: 30
    },
    NextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    BackButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginLeft: 10,
    },
    AngleRightButton: {
        margin: 15
    },
    LocationContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    Pin: {
        marginLeft: 0,
        marginRight: 10
    }
})

