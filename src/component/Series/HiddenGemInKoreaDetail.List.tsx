import React from 'react';
import { Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Layout, LayoutElement, Text } from '@ui-kitten/components';
import { HiddenGemInKoreaDetailListProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { SceneRoute } from '../../navigation/app.route';

const WindowWidth = Dimensions.get('window').width

export const HiddenGemInKoreaDetailList = (props : HiddenGemInKoreaDetailListProps) : LayoutElement => {

    function PressDetail(placeCode : string) {
        

        if(props.type === 'attr'){
            props.navigation.navigate(SceneRoute.SERIES_HIDDEN_GEM_DETAIL_ATTR, { TourCode: props.route.params.TourCode , PlaceCode : placeCode } );
        }
    }

    return(
        <Layout>
            {(props.data?.map((item, index) => 
                <TouchableOpacity style={styles.DataContainer} onPress={() => {PressDetail(item.placeCode)}}>

                    <Image source={{ uri : item.banner }} style={styles.ImageContainer} resizeMode={'stretch'}/>

                    <Text style={styles.TitleText}>{item.title}</Text>
                    <Text style={styles.DescText}>{item.desc}</Text>

                </TouchableOpacity>               
            ))}
        </Layout>
    )
    
};

const styles = StyleSheet.create({

    DataContainer: {
        width: WindowWidth - 60,
        minHeight : WindowWidth * 0.64,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 10,
        backgroundColor: '#00FF0000'
    },
    ImageContainer: {
        width: WindowWidth - 60,
        height: WindowWidth * 0.42,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    TitleText: {
        fontFamily: 'IBMPlexSansKR-Bold',
        fontSize: 17,
        marginLeft: 17,
        marginTop: 5
    },
    DescText: {
        fontFamily: 'IBMPlexSansKR-Text',
        fontSize: 15,
        marginLeft: 17,
        marginRight: 17,
        marginBottom: 10
    }
})

