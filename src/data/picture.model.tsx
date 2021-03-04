import React from 'react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image'


export const FullWidthPicture = ({ uri }) => {
    const [ratio, setRatio] = React.useState(1);
    
    React.useEffect(() => {
      if (uri) {
        Image.getSize(uri, (width, height) => {
           setRatio(width / height);
        });
     }
    }, [uri]);
  
    return (
     <FastImage
       style={{ width: '100%', height: undefined, aspectRatio: ratio }}
       resizeMode="contain"
       source={{uri : uri, priority: FastImage.priority.high}}
     />
   );
};