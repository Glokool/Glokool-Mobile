import React from 'react'
import { Layout, LayoutElement } from '@ui-kitten/components';
import { 
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    FlatList, 
    ScrollView,
    View,
} from 'react-native';
import { AngleLeft } from '../../assets/icon/Common';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
export const SeriesTopTabBar = () : LayoutElement => {
    const Navigation = useNavigation();

    return (
        <Layout style={styles.ContainerLayoutAngleLeft}>
            <SafeAreaView style={{flex:0, backgroundColor: '#00FF0000'}} />
            <Layout style={styles.ContainerIconLayout}>
                <TouchableOpacity style={styles.ContainerAngleLeft} onPress={() => Navigation.goBack()}>
                    <AngleLeft style={styles.AngleLeft} />
                </TouchableOpacity>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    ContainerLayoutAngleLeft: {
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0,
        backgroundColor: '#ffffff',
        // borderWidth: 1,
        // borderColor:'red',
    },
    ContainerIconLayout: {
        flexDirection: 'row',
        width: windowWidth,
    },
    ContainerAngleLeft: {
        marginLeft: 20,
        padding: 20,
    },
    AngleLeft: {
    },
})