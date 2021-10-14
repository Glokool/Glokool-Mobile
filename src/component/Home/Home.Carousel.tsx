import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import axios from 'axios';
import { SERVER, CDN } from '../../server.component';
import { HomeCarouselProps } from '../../navigation/ScreenNavigator/Home.navigator';
import { Dimensions, Image, StyleSheet, Pressable } from 'react-native';
import { SceneRoute } from '../../navigation/app.route';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { HomeCarousel_Item } from '../../types';

const ImageSize = Dimensions.get('window').width * 0.85;

export const HomeCarousel = (props: HomeCarouselProps): LayoutElement => {
    const [content, setContent] = React.useState<Array<HomeCarousel_Item>>([]);
    const [carouselIndex, setCarouselIndex] = React.useState<number>(2);

    React.useEffect(() => {
        InitHomeCarousel();
    }, []);

    async function InitHomeCarousel() {
        const Content = await axios.get(SERVER + '/api/home');
        setContent(Content.data);
    }

    function PressCarousel(type: string, id: string) {
        
    }

    const RenderCarousel = (item: {
        item: HomeCarousel_Item;
        index: number;
    }) => {
        return (
            <Pressable
                style={styles.ItemContainer}
                onPress={() => PressCarousel(item.item.type, item.item._id)}>
                <Image
                    source={{ uri: CDN + item.item.image }}
                    style={styles.ImageContainer}
                />

                <Layout style={styles.TitleContainer}>
                    <Layout style={styles.TypeContainer}>
                        {item.item.type === 'tour' ? (
                            <Text></Text>
                        ) : item.item.type === 'blog' ? (
                            <Text></Text>
                        ) : (
                            <Text></Text>
                        )}
                        <Text style={styles.Type}>
                            {item.item.type === 'tour'
                                ? `Hidden Gems in Korea`
                                : item.item.type === 'blog'
                                    ? `Day Trip with Glokool`
                                    : 'Korea A-Z'}
                        </Text>
                    </Layout>
                    <Text style={styles.Title}>
                        {item.item.type === 'tour' ? item.item.title : ''}
                    </Text>
                </Layout>
            </Pressable>
        );
    };

    return (
        <Layout style={styles.CarouselContainer}>
            <SwiperFlatList
                index={0}
                autoplay={true}
                autoplayDelay={2}
                autoplayLoop={true}
                autoplayLoopKeepAnimation={true}
                data={content}
                renderItem={RenderCarousel}
                showPagination
                paginationStyle={{ bottom: -10 }}
                paginationDefaultColor={'#d2d2d2'}
                paginationStyleItemActive={{
                    width: 10,
                    height: 5,
                }}
                paginationActiveColor={'#7777ff'}
                paginationStyleItemInactive={{
                    width: 10,
                    height: 5,
                }}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    CarouselContainer: {
        marginLeft: 30,
        height: ImageSize,
        width: ImageSize,
        backgroundColor: '#00FF0000',
        marginTop: 15,

    },
    Carousel: {
        height: ImageSize,
        backgroundColor: '#00FF0000',
    },
    CarouselInsideContainer: {
        marginLeft: -16,
    },
    CarouselDotContainer: {
        position: 'absolute',
        bottom: -15,
        left: -2,
        backgroundColor: '#00FF0000',
    },
    CarouselDot: {
        width: 13,
        height: 4,
        borderRadius: 30,
    },
    ItemContainer: {
        width: ImageSize,
        height: ImageSize,
        backgroundColor: '#00FF0000',
    },
    TypeContainer: {
        flexDirection: 'row',
        backgroundColor: '#00FF0000',
        marginBottom: 0,
    },
    Type: {
        color: '#E6E6E6',
        fontFamily: 'NotoSans-SemiCondensedSemiBold',
        fontSize: 14,
        marginBottom: 0,
    },
    TitleContainer: {
        position: 'absolute',
        backgroundColor: '#00FF0000',
        bottom: 25,
        left: 25,
        marginRight: 25,
    },
    Title: {
        color: '#FFFFFF',
        fontFamily: 'BrandonGrotesque-BoldItalic',
        marginTop: -5,
        fontSize: 24,
    },
    ImageContainer: {
        width: ImageSize,
        height: ImageSize,
        resizeMode: 'cover',
        borderRadius: 8,
    },
});
