import React from 'react';
import { View, TextInput } from 'react-native';

export const SelectableText = (props: any) => {
    return (
        <View>
            <TextInput
                editable={false}
                multiline={true}
                scrollEnabled={false}
                textAlignVertical='top'
                style={[props.style,{paddingTop:0, paddingBottom:0}]}
            >
                {props.item}
            </TextInput>
        </View>
    )
}