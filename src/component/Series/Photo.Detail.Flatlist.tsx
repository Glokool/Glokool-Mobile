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
import { Instagram, Naver } from '../../assets/icon/SNS';

type IntroData = {
    _id : string;
    author: string;
    img: string;
}

interface DetailFlatlistProps {
    data : Array<IntroData> | undefined
}

const WindowSize = Dimensions.get('window').width;

export const PhotoDetailFlatlist = (props : DetailFlatlistProps) : LayoutElement => {

    const data = props.data;
    
    const renderItem = (item : {item : IntroData, index: number}) => {

        return(
            <Layout style={styles.MainContainer}>
                <Image source={{uri : item.item.img}} style={styles.Image} resizeMode={'stretch'}/>

                {(item.item.author === 'undefined')? 
                    null
                :
                (item.item.author === '')?
                    null
                :
                <Layout style={styles.authorContainer}>
                    {(item.item.author[0] === 'i')?
                        <Instagram />
                    :   
                     (item.item.author[0] === 'n')?
                        <Naver />
                    :
                        null
                    }
                    <Text style={styles.authorText}>{`  ${item.item.author.slice(2,)}`}</Text>
                </Layout>
                }                

            </Layout>
        )
    }

    

    return(
        <Layout>
            <FlatList
                data={data}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </Layout>

    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width : WindowSize * 0.85,
        height: WindowSize * 1.14,
        marginRight: 10
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
        color: 'white',
        opacity: 0.6,
    },
    Image: {
        width : WindowSize * 0.85,
        height: WindowSize * 1.14,
    }
})

