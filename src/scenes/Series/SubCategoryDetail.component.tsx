import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
    FlatList,
    Platform,
    View,
    Text,
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { SeriesADetailContentProps, SubCategoryDetailProps } from '../../navigation/ScreenNavigator/Series.navigator';
import moment from 'moment';
import { SceneRoute } from '../../navigation/app.route';
import { CountNum_Purple } from '../../assets/icon/Series';
import { AngleLeft } from '../../assets/icon/Common';

type Series_Item = {
    image: string;
    count: number;
    _id: string;
    title: string;
    createdAt: Date;
};

const windowWidth = Dimensions.get('window').width;

export const SubCategoryDetail = (props: SubCategoryDetailProps) => {

    const sampleData = [86, 223, 34, 452, 5234, 653];

    useEffect(() => {
        console.log(props.route.params.Name);
    }, []);

    const renderItem = (item: any) => {
        return (
            <View style={styles.listItemContainer}>
                {/* Image */}
                <View style={styles.imageContainer} />

                <View style={styles.propsContainer}>

                    <View>
                        <Text style={styles.titleText}>Title text goes here.</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.grayText}>
                            Date goes here.
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '35%' }}>
                            <CountNum_Purple />
                            <Text style={styles.grayText}>{item.item}</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.topTab}>
                <TouchableOpacity onPress={()=>props.navigation.pop()}> 
                <AngleLeft />
                </TouchableOpacity>
                <Text style={styles.topTabText}>{props.route.params.Name}</Text>
            </View>
            <View style={styles.descContainer}>
                <Text style={styles.descText}>Everything you want to know about Korea</Text>
            </View>
            <FlatList
                data={sampleData}
                renderItem={renderItem}
                style={{paddingTop: 20,}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    topTab: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: Platform.OS === 'ios' ? 50 : 20,
        paddingVertical: 10,
    },
    topTabText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 22,
        color: '#7777ff',
        marginLeft: 20,
    },
    descContainer: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    descText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        color: '#a0a0a0',
    },
    listItemContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5,
        width: windowWidth - 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        width: 113,
        height: 113,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: '#6495ED'
    },
    propsContainer:{
        flex: 1, 
        backgroundColor: 'white', 
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingLeft: 15,
        paddingVertical: 15,
        justifyContent: 'space-between'
    },
    titleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
    },
    grayText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 13,
        color: '#b5b5b5',
        marginLeft: 5,
    },
});
