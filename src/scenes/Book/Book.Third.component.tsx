import React from 'react';
import { Layout, LayoutElement, Text } from "@ui-kitten/components";
import { BookThirdScreenProps } from "../../navigation/Book.navigator";
import { ScrollView, StyleSheet } from 'react-native';
import { TopTabBar } from '../../component/Booking';
import { SERVER } from '../../server.component';
import axios from 'axios';

type PriceData = {
    active: boolean, 
    discountedPrice: number, 
    price: string,
    discount: number,
  }

export const BookThirdScreen = (props : BookThirdScreenProps) : LayoutElement => {

    const data = props.route.params;
    const [price, setPrice] = React.useState<PriceData>()

    React.useEffect(() => {
        InitBookThird()
    }, [])

    async function InitBookThird() {
    
        var config = {
          Method: 'get',
          url: SERVER + '/api/price',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        };
    
        var result = await axios(config);
        setPrice({
          active: result.data.active,
          discountedPrice: result.data.discountedPrice, 
          price: result.data.price,
          discount: result.data.discount
        });
    
      }

    return(
        <Layout style={styles.Container}>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.MainContainer}>
                
                <Text style={styles.TitleText}>Payment Notification</Text>

                <Layout style={styles.priceContainer}>
                    
                </Layout>
                

            </ScrollView>

            <TopTabBar index={3}/>
        </Layout>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    MainContainer: {
        flex: 1,
        marginHorizontal: 30,
        alignItems: 'center'
    },
    TitleText: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 18,
        marginTop: 30,
        textAlign: 'center'
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    PriceTitle: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        flex : 3
    },
    Price : {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        flex : 1
    },
    PromotionPrice : {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        flex : 1,
        color: '#7777FF'
    }
})