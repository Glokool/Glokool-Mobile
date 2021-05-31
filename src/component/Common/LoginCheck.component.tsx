import React from 'react';
import { LayoutElement, Layout, Modal, Card, Text, Button } from "@ui-kitten/components";
import { NavigatorRoute } from "../../navigation/app.route";
import { StyleSheet } from 'react-native';
import { LoginCheckProps } from '../../navigation/Common.navigator';



export const LoginCheck = (props : LoginCheckProps) : LayoutElement => {

    const [visible, setVisible] = React.useState(props.visible)

    return(
        <Layout style={styles.container}>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
            >
            <Card disabled={true}>
                <Text style={{marginVertical: 30}}>Login is required. Would you like to login?</Text>
                
                <Layout style={{flexDirection: 'row'}}>
                <Layout style={{margin: 15, flex: 1}}>
                    <Button style={styles.cancelButton} appearance='outline' onPress={() => {
                    props.navigation.goBack();
                    setVisible(false);
                    }}>
                    CANCLE
                    </Button>
                </Layout>
                <Layout style={{margin: 15, flex: 1}}>
                    <Button onPress={() => {
                    setVisible(false);
                    props.navigation.replace(NavigatorRoute.AUTH);
                    }}>
                    MOVE
                    </Button>
                </Layout>
                
                </Layout>
                
            </Card>
            </Modal>

        </Layout>
    )
}
const styles = StyleSheet.create({
  
    container: {
      flex: 1,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    cancelButton: {
      borderColor: '#FFC043',
      backgroundColor: 'white',   
    },
  });