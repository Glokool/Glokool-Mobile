import React from 'react';
import { LoadEarlierProps, LoadEarlier} from 'react-native-gifted-chat';

export const renderLoadEarlier = (props : LoadEarlierProps) : React.ReactElement => {

    return(
        <LoadEarlier 
            {...props}
            label={'Load Earlier Messages'}
            textStyle={{ fontFamily: 'Pretendard-Bold' }}        
        />
    )
}