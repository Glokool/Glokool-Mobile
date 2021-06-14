
import React from 'react';
import { 
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { 
    LayoutElement, 
    Text,
    Card,
    Modal,
    Layout
} from '@ui-kitten/components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface CancellationPolicyProps {
    visible : boolean;
}

export const CancellationPolicy = (props : CancellationPolicyProps) : LayoutElement => {

    const [visible, setVisible] = React.useState<boolean>(props.visible);
    
    const CancellationHeader = () => (
        <Layout style={{flexDirection: 'row', padding: 20}}>
          <Layout style={{flex: 2, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', alignItems: 'center'}}>Cancellation Policy</Text>
          </Layout>                  
          
          <Layout style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <FontAwesomeIcon icon={faTimes} size={28}/>
            </TouchableOpacity> 
          </Layout>
          
        </Layout>      
    );

    return(
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
        >
            <Card disabled={true} header={CancellationHeader} style={styles.CardHeader}>
                <ScrollView style={{flex: 1}}> 
                    <Text>
                    
                    </Text>
                </ScrollView>            
            </Card>
        </Modal>
    )
}


const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    CardHeader: {
        width: (Dimensions.get('window').width * 0.8), 
        height: (Dimensions.get('window').height * 0.8),
        backgroundColor: '#00FF0000',
    }
})