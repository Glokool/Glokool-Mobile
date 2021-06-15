import React from 'react';
import auth from '@react-native-firebase/auth';

import { IndexPath, Input, Layout, LayoutElement, Select, SelectItem, Text } from '@ui-kitten/components';
import { StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { CancellationPolicy, TopTabBar } from '../../component/Booking';
import { SceneRoute } from '../../navigation/app.route';
import { BookSecondScreenProps } from '../../navigation/Book.navigator';


const WindowSize = Dimensions.get('window').width


export const BookSecondScreen = (props : BookSecondScreenProps) : LayoutElement => {

    const PickerDate = props.route.params.date;
    const user = auth().currentUser;
    
    const [visible, setVisible] = React.useState<boolean>(false);

    const [name, setName] = React.useState(user?.displayName);
    const [email, setEmail] = React.useState(user?.email);
    const [contact, setContact] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));    
    const contactType = [
        'Phone Number',
        'Instagram',
        'Kakao Talk'
    ]
    const displayValue = contactType[selectedIndex.row];
    const NextAble = (name != '') && (email != '');

    function NextButton() {
        props.navigation.navigate(SceneRoute.BOOK_THIRD, {
            date : PickerDate,
            Name: name,
            Email : email,
            Contact : {
                type : displayValue,
                info : contact
            }
        })
    }

    React.useEffect(() => {
        console.log(visible);
    }, [visible])



    return(
        <Layout style={styles.Container}>
            
            <ScrollView style={styles.ScrollViewContainer} showsVerticalScrollIndicator={false}>

                <Text style={styles.TitleText}>Fill in your Informaion</Text>

                <Text style={styles.smallTitle}>NAME</Text>
                <Input
                    placeholderTextColor={'#8797FF'}
                    style={styles.Input}
                    value={name}
                    textStyle={styles.InputText}
                    onChangeText={nextValue => setName(nextValue)}
                />

                <Text style={styles.smallTitle}>E-Mail for Voucher</Text>
                <Input
                    placeholderTextColor={'#8797FF'}
                    style={styles.Input}
                    value={email}
                    textStyle={styles.InputText}
                    onChangeText={nextValue => setEmail(nextValue)}
                />

                <Text style={styles.smallTitle}>Contact in Korea    <Text style={styles.smallTitle2}>Optional</Text></Text>
                <Layout style={styles.ContactContainer}>
                    <Select
                        style={styles.Select}
                        selectedIndex={selectedIndex}
                        value={displayValue}
                        onSelect={index => setSelectedIndex(index)}>
                        <SelectItem title='Phone Number'/>
                        <SelectItem title='Instagram'/>
                        <SelectItem title='Kakao Talk'/>
                    </Select>
                    <Input
                        style={styles.smallInput}
                        value={contact}
                        placeholder={'ID / Number'}
                        textStyle={styles.InputText}
                        onChangeText={nextValue => setContact(nextValue)}
                    />
                </Layout>

                <Text style={styles.DescText}>
                    By proceeding,{'\n'}
                    You agree to our 'Terms of service',{'\n'}
                    'Privacy Policy & Cancellation Policy'
                </Text>

                <TouchableOpacity style={styles.TermsButton} onPress={() => setVisible(!visible)}>
                    <Text style={styles.TermsButtonText}>{`Click to Check     >`}</Text>
                </TouchableOpacity>


                <Layout style={{marginVertical: 100}}/>

            </ScrollView>

            <CancellationPolicy visible={visible} />

            <Layout style={styles.NextButtonContainer}>
                {(NextAble)? 
                <TouchableOpacity style={styles.Button} onPress={() => NextButton()} >
                    <Text style={styles.ButtonText}>NEXT</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.Button_D} >
                        <Text style={styles.ButtonText_D}>NEXT</Text>
                </TouchableOpacity>
                } 


                <SafeAreaView style={{flex: 0, backgroundColor: '#00FF0000'}}/>
            </Layout>

            <TopTabBar index={2} />
            
        </Layout>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
    },
    ScrollViewContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 80,
        marginHorizontal: 30
    },
    TitleText: {
        fontFamily: 'IBMPlexSansKR-SemiBold',
        fontSize: 18,
        marginTop: 50,
        textAlign: 'center'
    },
    Button: {
        backgroundColor: '#7777FF',
        borderRadius: 10,
        width: 350,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText:{
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
    },
    Button_D: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        width: 350,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText_D:{
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: '#AEAEAE',
    },
    Input: {
        width: WindowSize - 60,
        backgroundColor: '#00FF0000',
        borderWidth: 0,
        borderBottomWidth: 2,
    },
    smallInput: {
        width: (WindowSize - 60) / 2,
        backgroundColor: '#00FF0000',
        borderWidth: 0,
        borderBottomWidth: 2,
        marginTop: 10
    },
    smallTitle :{
        marginTop: 30,
        color: '#7777FF',
        fontSize: 12,
        
    },
    smallTitle2 :{
        marginTop: 15,
        color: '#D2D2D2',
        fontSize: 12,
        marginBottom : 10
    },
    InputText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 18,
        marginBottom: -15
    },
    ContactContainer: {
        flexDirection: 'row'
    },
    Select: {
        width: (WindowSize - 60) / 2,
        marginTop: 10
    },
    DescText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 16,
        marginTop: 30
    },
    TermsButton: {
        backgroundColor: '#00FF0000',
        paddingVertical: 20,
        paddingRight: 20
    },
    TermsButtonText: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 13,
        color: '#7777FF',
    },
    NextButtonContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 10,
        backgroundColor: '#00FF0000',
        alignItems: 'center'
    },
    Button2: {
        backgroundColor: '#7777FF',
        borderRadius: 10,
        width: 350,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText2:{
        fontFamily: 'BrandonGrotesque-BoldItalic',
        color: 'white',
    }
})