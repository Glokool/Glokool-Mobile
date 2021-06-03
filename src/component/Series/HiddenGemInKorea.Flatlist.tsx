import { LayoutElement, ListItem } from '@ui-kitten/components';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {  } from 'react-native-gesture-handler';
import { HiddenGemInKoreaFlatListProps } from '../../navigation/ScreenNavigator/Series.navigator';
import { Loading } from '../Common/Loading';

export const HiddenGemInKoreaFlatList = (props: HiddenGemInKoreaFlatListProps) : LayoutElement => {

    const [data, setData] = React.useState();

    React.useEffect(() => {
     
    }, []);

    async function InitHiddenGemInKoreaFlatList() {

    }

    const renderItem = ({item}) : LayoutElement => {
        
        return(
            <TouchableOpacity>

            </TouchableOpacity>
        )
    }

    return(
        <FlatList
            data={data}
            renderItem={renderItem}
        />

    )
}

const styles = StyleSheet.create({

})