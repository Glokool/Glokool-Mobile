import React from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Layout, LayoutElement, Text } from "@ui-kitten/components"
import axios from 'axios';
import { SERVER } from '../../server.component';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SeriesCarouselProps } from '../../navigation/ScreenNavigator/Series.navigator';

type SeriesCarousel_Item = {
    image: string,
}

const ImageSize = Dimensions.get('window').width;

export const SeriesCarousel = (props : SeriesCarouselProps) : LayoutElement => {

    const [content, setContent] = React.useState<Array<SeriesCarousel_Item>>([
        {image: '../../assets/image/Banner_01.png'},
        {image: '../../assets/image/Banner_02.png'},
    ]);
    const [carouselIndex, setCarouselIndex] = React.useState<number>(1);
    const [activeSlide, setActiveSlide] = React.useState<Number>(0);

    React.useEffect(() => {
        InitSeriesCarousel();
    }, []);

    async function InitSeriesCarousel() {

    }

    const RenderCarousel = (data: { item: SeriesCarousel_Item; index: number; }) => {

        return(
            <TouchableOpacity style={styles.ItemContainer}>
                <Image source={require('../../assets/image/Banner_01.png')} style={styles.ImageContainer} />
            </TouchableOpacity>    
        )
    }

    return (
        <Layout style={styles.CarouselContainer}>
            <Carousel
                data={content}
                layout={'default'}
                renderItem={RenderCarousel}
                style={styles.Carousel}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={ImageSize}
                hasParallaxImages={false}
                firstItem={0}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                inactiveSlideShift={0}
                containerCustomStyle={styles.CarouselInsideContainer}
                loop={true}
                autoplay={true}
                autoplayDelay={1500}
                autoplayInterval={4000}
                onSnapToItem={(index : number) => setCarouselIndex(index) }
            />
                <Pagination
                  dotsLength={content.length}
                  containerStyle={styles.CarouselDotContainer}
                  activeDotIndex={carouselIndex}
                  dotColor={'#FFFFFF'}
                  dotStyle={styles.CarouselDot}
                  inactiveDotColor={'black'}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={1}
                />
        </Layout>
    )
}

const styles = StyleSheet.create({
    CarouselContainer: {
        height: ImageSize * 0.48,
        width: ImageSize,
        backgroundColor: '#00FF0000'
    },
    Carousel: {
        height: ImageSize * 0.48,
        backgroundColor: '#00FF0000',
    },
    CarouselInsideContainer: {
        marginLeft: 0
    },
    CarouselDotContainer: {
        position: 'absolute',
        bottom : -15,
        left: -2,
        backgroundColor: '#00FF0000'
    },
    CarouselDot: {
        width: 13,
        height: 4,
        borderRadius: 30,        
    },
    ItemContainer: {
        width: ImageSize,
        height: ImageSize * 0.48,
        backgroundColor: '#00FF0000',
    },
    ImageContainer: {
        width: ImageSize,
        height: ImageSize * 0.48,
        resizeMode: 'stretch',
    }
})