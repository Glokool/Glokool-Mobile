import React from 'react';
import { Image } from 'react-native';


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
     <Image
       style={{ width: '100%', height: undefined, aspectRatio: ratio, padding: 0 }}
       resizeMode="contain"
       source={{uri : uri}}
      
     />
   );
};