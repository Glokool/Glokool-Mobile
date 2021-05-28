import React from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Layout, LayoutElement } from "@ui-kitten/components"
import axios from 'axios';
import { SERVER } from '../../server.component';
import { HomeCarouselProps } from '../../navigation/ScreenNavigator/Home.navigator';
import { Dimensions, Image, StyleSheet } from 'react-native';

type HomeCarousel_Item = {
    title: '',
    type: '',
    image: '',
    id: ''
}

export const HomeCarousel = (props : HomeCarouselProps) : LayoutElement => {

    const [entries, setEntries] = React.useState<Array<HomeCarousel_Item>>([]);
    const [activeSlide, setActiveSlide] = React.useState<Number>(0);

    const ImageWidth = Dimensions.get('window').width * 0.85;
    const ImageHeight = ImageWidth;

    React.useEffect(() => {

        axios.get(SERVER + '/api/main')
            .then((result) => {
                console.log(result.data)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    const Pagination = () => {

        return(
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        )
    }

    const RenderItem = ( item : HomeCarousel_Item, index : Number) => {
        <Layout style={styles.ImageContainer}>
            <Image width={ImageWidth} height={ImageHeight} resizeMode={'stretch'} source={{uri : item.image}} />
        </Layout>        
    }

    return (
            <Layout>
                <Carousel
                  data={entries}
                  renderItem={RenderItem}
                  onSnapToItem={(index : Number) => setActiveSlide(index) }
                />
                { Pagination }
            </Layout>
    )
}

const styles = StyleSheet.create({
    ImageContainer: {
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 5,
    }
})