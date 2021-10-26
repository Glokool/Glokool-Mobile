
import React from 'react';
import auth from '@react-native-firebase/auth';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { ChatRoomSettingSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';
import { Report_Button } from '../../../assets/icon/Chat';
import { SERVER } from '../../../server.component';
import axios from 'axios';

type MemberInfo = {
    avatar : string,
    name : string,
    uid : string,
}

export const MemberList = (props : ChatRoomSettingSceneProps) : React.ReactElement => {

    const ChatRoomID = props.route.params.id;
    const [memberData, setMemberData] = React.useState<Array<MemberInfo>>([]);

    React.useEffect(() => {

        setMemberData([
            {
                avatar : '',
                name : '',
                uid : '1'
            }
        ]);

        const AuthToken = auth().currentUser?.getIdToken()
            .then((token) => {
            
                const options = {
                    method : 'GET',
                    url : SERVER + '/api/' + ChatRoomID + '/reports',
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }

                axios(options)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((e) => {
                        console.log('최초 유저 리스트 로딩 실패 : ', e);
                    })
            })
            .catch((error) => {
                console.log('Firebase Auth Token Error : ', error)
            })
        


    }, [])

    const renderItem = ({item} : {item : MemberInfo, index : number}) => {

        return(
            <Layout style={styles.MemberContainer}>

                <Layout style={styles.ProfileContainer}>
                    <FastImage source={require('../../../assets/image/Chat/guideGray.png')} style={styles.Avatar}/>
                    <Text style={styles.Title}>멤버 이름</Text>
                </Layout>

                <Pressable>
                    <Report_Button style={styles.Button}/>
                </Pressable>

            </Layout>
        )
    }


    return (
        <Layout style={styles.MainContainer}>
            <FlatList
                keyExtractor={(item, index) => item.uid}
                data={memberData}
                renderItem={renderItem}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width : '100%',
        height: '100%'
    },

    MemberContainer: {
        height : 52,
        width : '100%',
        paddingHorizontal: 20,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent: 'space-between'
    },

    ProfileContainer : {
        height : 52,
        flexDirection : 'row',
        alignItems: 'center'
    },

    Avatar : {
        width : 52,
        height : 52,
        borderRadius: 100,
        marginRight : 10
    },

    Title : {
        fontFamily : 'Pretendard-Medium',
        fontSize: 16
    },

    Button : {
        width : 64,
        height : 28
    }
})