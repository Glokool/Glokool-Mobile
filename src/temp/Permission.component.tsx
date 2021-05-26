import {
    Modal,
    Card,
    Layout,
    Text,
    Button
} from '@ui-kitten/components'


export const PermissionCheckScreen = () => {


    return(

        <Modal
        visible={permissionVisible}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        style={{ padding: 10 }}
        >
        <Card disabled={true} style={{borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>

        <Layout style={{ alignItems: 'center'}}>
            <Image source={require('../../assets/home/PermissionLogo.png')} style={{marginVertical: 10 }}/>
        </Layout>
        

        <Layout style={{justifyContent: 'center', alignItems: 'flex-start', padding: 10}}>              

            <Text style={{marginVertical: 10, textAlign: 'center', fontSize: 24, fontFamily: 'IBMPlexSansKR-Medium'}}>Glokool needs access to permissions below</Text>


            <Layout style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>

            <Image source={require('../../assets/home/Places.png')} />

            <Layout style={{marginLeft: 10}}>
                <Text style={{fontFamily: 'IBMPlexSansKR-SemiBold', fontSize: 18, marginVertical: -5}}>Location</Text>
                <Text style={{fontFamily: 'IBMPlexSansKR-Medium', fontSize: 15, color: '#A1A1A1', marginVertical: -5}}>Share your location with guide</Text>
            </Layout>

            </Layout>

            <Layout style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>

            <Image source={require('../../assets/home/Photos.png')} />

            <Layout style={{marginLeft: 10}}>
                <Text style={{fontFamily: 'IBMPlexSansKR-SemiBold', fontSize: 18, marginVertical: -5}}>Files</Text>
                <Text style={{fontFamily: 'IBMPlexSansKR-Medium', fontSize: 15, color: '#A1A1A1', marginVertical: -5}}>{`Share images to Q&A board`}</Text>
            </Layout>

            </Layout>

            <Layout style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>

            <Image source={require('../../assets/home/Camera.png')} />

            <Layout style={{marginLeft: 10}}>
                <Text style={{fontFamily: 'IBMPlexSansKR-SemiBold', fontSize: 18, marginVertical: -5}}>Camera</Text>
                <Text style={{fontFamily: 'IBMPlexSansKR-Medium', fontSize: 15, color: '#A1A1A1', marginVertical: -5}}>Send pictures to chat</Text>
            </Layout>

            </Layout>

            <Layout style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5, marginBottom: 10}}>

            <Image source={require('../../assets/home/Microphone.png')} />

            <Layout style={{marginLeft: 10}}>
                <Text style={{fontFamily: 'IBMPlexSansKR-SemiBold', fontSize: 18, marginVertical: -5}}>Microphone</Text>
                <Text style={{fontFamily: 'IBMPlexSansKR-Medium', fontSize: 15, color: '#A1A1A1', marginVertical: -5}}>Send voice message to chat</Text>
            </Layout>

            </Layout>

        </Layout>

        <Layout style={{flexDirection: 'row'}}>
            <Layout style={{margin: 15, flex: 1}}>
            <Button style={{ borderColor: '#D2D2D2', backgroundColor: '#D2D2D2', borderRadius: 10 }} onPress={() => {
                setPermissionVisible(false);
                //AsyncStorage.setItem('PermissionCheck', JSON.stringify('check'));
            }}>
                Skip
            </Button>
            </Layout>
            <Layout style={{margin: 15, flex: 1}}>
            <Button 
            style={{ borderRadius: 10 }}
            onPress={() => {
                setPermissionVisible(false);
                //AsyncStorage.setItem('PermissionCheck',  JSON.stringify('check'));
                PermissionRequest();
            }}>
                Continue
            </Button>
            </Layout>
            
        </Layout>
        
        </Card>
        </Modal>

    )

}


