import React from "react";
import { LayoutElement, Layout } from "@ui-kitten/components";
import { BookFouthScreenProps } from "../../navigation/Book.navigator";
import { StyleSheet } from "react-native";
import { TopTabBar } from "../../component/Booking";


export const BookFouthScreen = (props : BookFouthScreenProps) : LayoutElement => {

    const success = props.route.params.success;

    return(
        <Layout>
            

            <TopTabBar index={4}/>
        </Layout>
    )
} 

const styles = StyleSheet.create({

})