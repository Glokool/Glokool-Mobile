import { useFocusEffect } from "@react-navigation/native";
import { Layout, Modal, Text } from "@ui-kitten/components";
import React, { useCallback } from "react";
import { BackHandler, Pressable, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { windowHeight, windowWidth } from "../../../../Design.component";
import { RootState } from "../../../../model";
import { setImageVisiblityFalse } from "../../../../model/Chat/Chat.UI.model";


export const ImageModal = (props : any) : React.ReactElement => {

    const dispatch = useDispatch();
    
    const imageVisiblity = useSelector((state : RootState) => state.ChatUIModel.imageVisiblity);
    const imageURL = useSelector((state : RootState) => state.ChatUIModel.imageUrl);

    const HardwareBackPress = () => {
        dispatch(setImageVisiblityFalse());
        return true;
    }

    if(imageVisiblity){
        BackHandler.addEventListener('hardwareBackPress', HardwareBackPress);
    }
    else {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            HardwareBackPress,
        );
    }    

    return (
        <Modal
            visible={imageVisiblity}
            backdropStyle={styles.ModalBackgroundContainer}>
            <Layout style={styles.ModalContainer}>
                <Pressable
                    style={styles.ImageModalButtonContainer}
                    onPress={() => dispatch(setImageVisiblityFalse())}>
                    <Text style={styles.ImageModalButton}>X</Text>
                </Pressable>
                <FastImage
                    source={{ uri: imageURL }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                        width: windowWidth,
                        height: Math.round((windowHeight * 9) / 16),
                    }}
                />
            </Layout>
        </Modal>
    );
}

const styles = StyleSheet.create({

    ImageModalButtonContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
    },

    ImageModalButton : {
        color: '#f1f1f1',
        fontSize: 30,
        fontWeight: 'bold',
    },

    ModalContainer: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 10)',
    },

    ModalBackgroundContainer: {
        backgroundColor: 'rgba(0, 0, 0, 10)',
    }



})
