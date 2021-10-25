import React from 'react';
import { LoadEarlierProps, LoadEarlier} from 'react-native-gifted-chat';
import { Layout, Spinner, Text } from '@ui-kitten/components';


export const renderLoadEarlier = (props : LoadEarlierProps) : React.ReactElement => {


    return(
        <LoadEarlier 
            {...props}
            label={'Load Earlier Messages'}
            textStyle={{ fontFamily: 'Pretendard-Bold' }}        
        />
    )
}