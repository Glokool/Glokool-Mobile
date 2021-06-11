import { Layout, LayoutElement } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { TopTabBar } from "../../component/Booking";



export const BookFirstScreen = (props : BookFirstScreen) : LayoutElement => {



    return(
        <Layout>
            



            <TopTabBar index={1} />
        </Layout>
    );
}

const styles = StyleSheet.create({

})