import React from 'react';
import { Layout, LayoutElement } from "@ui-kitten/components";
import { BookThirdScreenProps } from "../../navigation/Book.navigator";
import { StyleSheet } from 'react-native';
import { TopTabBar } from '../../component/Booking';



export const BookThirdScreen = (props : BookThirdScreenProps) : LayoutElement => {

    const data = props.route.params;

    return(
        <Layout style={styles.Container}>

            <TopTabBar index={3}/>
        </Layout>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1
    }
})