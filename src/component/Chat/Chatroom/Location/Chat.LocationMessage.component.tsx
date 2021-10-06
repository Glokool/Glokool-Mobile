import { Text } from "@ui-kitten/components";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { BubbleProps, IMessage } from "react-native-gifted-chat";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch } from "react-redux";
import { setLocation } from "../../../../model/Chat/Chat.Location.model";
import { setLocationVisiblityTrue } from "../../../../model/Chat/Chat.UI.model";


const styles = StyleSheet.create({


})