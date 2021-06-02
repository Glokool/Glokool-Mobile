import React from 'react';
import { LayoutElement, Layout, Modal, Card, Text, Button } from "@ui-kitten/components";
import { NavigatorRoute } from "../../navigation/app.route";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LoginCheckProps } from '../../navigation/Common.navigator';



export const LoginCheck = (props : LoginCheckProps) : LayoutElement => {

    const [visible, setVisible] = React.useState(props.visible)

    return(
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
        >
            <Card disabled={true} style={{backgroundColor: '#F8F8F8'}}>
                
                <Text style={styles.modalTitle}>Login?</Text>

                <Text style={styles.modalDesc}>{`This part needs Login`}</Text>
                
                <Layout style={{flexDirection: 'row', backgroundColor: '#00FF0000', justifyContent: 'center'}}>

                    <TouchableOpacity style={styles.CancelButon} onPress={() => {setVisible(false); props.navigation.goBack()}}>
                        <Text style={styles.CancelButonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.MoveButton} onPress={() => {setVisible(false); props.navigation.navigate(NavigatorRoute.AUTH)}}>
                        <Text style={styles.MoveButtonText}>Move</Text>
                    </TouchableOpacity>

                </Layout>
                
            </Card>
        </Modal>

    )
}
const styles = StyleSheet.create({
  
    container: {
      flex: 1,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF'
    },
    modalDesc: {
        fontFamily : 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#AEAEAE',
        marginTop: 10,
        marginBottom: 30,
    },
    CancelButon: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#8797FF',
        borderRadius: 10,
        width: 150,
        height: 50,
        marginRight: 5,
      },
    CancelButonText: {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF'
    },
    MoveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#292434',
        borderRadius: 10,
        width: 150,
        height: 50,
        marginLeft: 5,
    },
    MoveButtonText: {
        fontFamily : 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF'
    },
  });