import { Layout, LayoutElement, ListItem } from '@ui-kitten/components';
import React from 'react';
import { Dimensions, Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const ImageSize = Dimensions.get('window').width
type banner = {
    url : string,
    image : any
}

export const AdBanner = () : LayoutElement => {

    const [carouselIndex, setCarouselIndex] = React.useState<number>(1);
    const ImageSize = Dimensions.get('window').width
    const banner = [
        {
          url : 'https://www.instagram.com/glokool_official/',
          image: require('../../assets/feed_banner_04.png'),
        },
    ];

    const RenderCarousel = (data: { item: banner; index: number; }) => {

        return(
            <TouchableOpacity style={styles.ItemContainer} onPress={() => {Linking.openURL(data.item.url)}}>
                <Image source={data.item.image} style={styles.ImageContainer} />
            </TouchableOpacity>    
        )
    }


    return(
        <Layout style={styles.CarouselContainer}>
            <Carousel
                data={banner}
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
                loop={true}
                autoplay={true}
                autoplayDelay={1500}
                autoplayInterval={4000}
                onSnapToItem={(index : number) => setCarouselIndex(index) }
            />
        </Layout>
    )
}


const styles = StyleSheet.create({
    CarouselContainer: {
        width: ImageSize - 60,
        height: ImageSize * 0.25,
        marginHorizontal: 30,
        marginBottom: 50,
    },
    Carousel: {
        width: ImageSize - 60,
        height: ImageSize * 0.25
    },
    ItemContainer: {
        width: ImageSize - 60,
        height: ImageSize * 0.25,
    },
    ImageContainer: {
        width: ImageSize - 60,
        height: ImageSize * 0.25,
        borderRadius: 15
    }

})