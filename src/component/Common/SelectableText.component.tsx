import React from 'react';
import { TextInput, Text, Platform } from 'react-native';

export const SelectableText = (props: any) => {
    return (
        <>
            {Platform.OS === 'ios' ? (
                <TextInput
                    editable={false}
                    multiline={true}
                    scrollEnabled={false}
                    textAlignVertical='top'
                    style={[props.style, { paddingTop: 0, paddingBottom: 0 }]}
                >
                    {props.children}
                </TextInput>
            ) : (
                <Text
                    selectable
                    style={props.style}
                >
                    {props.children}
                </Text>
            )}
        </>
    )
}