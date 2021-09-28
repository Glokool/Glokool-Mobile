import React from 'react';
import { LayoutElement, Layout, Modal, Card, Text, Button, } from "@ui-kitten/components";
import { NavigatorRoute } from "../../navigation/app.route";
import { StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LoginCheckProps } from '../../navigation/Common.navigator';
import { Delete } from '../../assets/icon/Common'


const windowWidth = Dimensions.get('window').width;

export const alertWindow = (navigation: any) => {
    Alert.alert(
        "Login Request",
        "This service requires login.\n Click 'Continue' to log in.",
        [{
            text: "Cancel",
            onPress: () => console.log("login canceled"),
            style: "destructive"
        }, {
            text: "Continue",
            onPress: () => navigation.navigate(NavigatorRoute.AUTH),
            style: "default"
        }]
    );
}

export const LoginCheck = (props: LoginCheckProps): LayoutElement => {

    const [visible, setVisible] = React.useState(props.visible);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {

            setVisible(props.visible);

        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
        >
            {/* <Card disabled={true} style={{backgroundColor: '#F8F8F8'}}> */}
            <Layout style={styles.ModalLayout}>
                <Layout style={styles.ModalIconContainer}>
                    <TouchableOpacity style={styles.CancelIcon} onPress={() => { setVisible(false); props.navigation.goBack() }}>
                        <Delete />
                    </TouchableOpacity>
                </Layout>

                <Layout style={styles.ModalTxtContainer}>
                    <Text style={styles.modalTitle}>This service requires Login.</Text>
                </Layout>

                <Layout style={styles.ModalBtnContainer}>
                    <TouchableOpacity style={styles.MoveButton} onPress={() => { setVisible(false); props.navigation.navigate(NavigatorRoute.AUTH) }}>
                        <Text style={styles.MoveButtonText}>Click to Login</Text>
                    </TouchableOpacity>
                </Layout>
            </Layout>
            {/* </Card> */}
        </Modal>

    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    // modal
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ModalLayout: {
        width: windowWidth * 0.85,
        height: (windowWidth * 0.85) * 0.57,
        borderRadius: 10,
    },
    ModalIconContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#00FF0000',
    },
    CancelIcon: {
        marginRight: 20,
        padding: 10,
    },
    ModalTxtContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#00FF0000',
    },
    modalTitle: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF'
    },
    ModalBtnContainer: {
        backgroundColor: '#00FF0000',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderWidth: 1,
    },
    modalDesc: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 15,
        color: '#AEAEAE',
        marginTop: 10,
        marginBottom: 30,
    },
    MoveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7777FF',
        borderRadius: 10,
        width: windowWidth * 0.85 * 0.84,
        height: 50,
        marginLeft: 5,
    },
    MoveButtonText: {
        fontFamily: 'BrandonGrotesque-BoldItalic',
        fontSize: 22,
        color: '#FFFFFF'
    },
});