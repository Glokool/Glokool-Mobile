import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet
} from 'react-native';
import {
    Divider,
    Layout,
    LayoutElement,
    Text,
} from '@ui-kitten/components'
import FastImage from 'react-native-fast-image'
import { Menu_Vegetble, Menu_Spicy } from '../../assets/icon/Series';

type image = {
    width: number,
    height: number
}

interface MenuDetailProps {
    data : Array<string>;
}

export const MenuDetail = (props : MenuDetailProps) : LayoutElement => {

    const [image, setImage] = React.useState<image>();
    const WindowWidth = Dimensions.get('window').width;



    React.useEffect(() => {
        InitMenuDetail();
    }, []);

    async function InitMenuDetail() {

        Image.getSize(props.data[0], (width, height) => {

            var ImageRatio = WindowWidth / width;
            
            setImage({width: WindowWidth - 60, height: height * ImageRatio});
        });
        

    }


    return (
        <Layout style={{width: '100%'}}>

            <Layout style={styles.ContainerTitle}>
                <Text style={styles.ContainerTitleText}>Menu</Text>
                <Divider style={styles.Divider}/>
            </Layout>

            <Layout style={styles.DetailContainer}>

                <Text style={styles.DetailText}>Here are some of the most popular menus</Text>
                
                <Layout style={{flex: 1}}>
                    <Layout style={styles.DetailContainer2}>
                        <Menu_Vegetble />
                        <Text style={styles.DetailText2}>  Vegan</Text>
                    </Layout>
                    <Layout style={styles.DetailContainer2}>
                        <Menu_Spicy />
                        <Text style={styles.DetailText2}>  Spiciness</Text>
                    </Layout>                   
                </Layout>


            </Layout>

            {(props.data != undefined && image != undefined)? 
                <FastImage  source={{uri : props.data[0]}} style={{width: (image?.width), height: image?.height, alignSelf: 'center'}} resizeMode={'stretch'}/>
            :
                null
            }
            
        </Layout>
    );
}

const styles = StyleSheet.create({
    ContainerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 30
    },
    ContainerTitleText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 25,
        color: '#7777FF',
    },
    Divider: {
        backgroundColor: '#7777FF',
        flex: 1,
        marginLeft: 20,
    },
    DetailContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 30,
    },
    DetailText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 21,
        color: '#8797FF',
        flex: 1
    },
    DetailContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30
    },
    DetailText2: {
        fontFamily: 'NotoSans-SemiCondensed',
        fontSize: 15,
        color: '#8C8C8C',
        marginLeft: 10,
    }
})