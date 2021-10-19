
import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';

type MemberInfo = {
    avatar : string,
    name : string,
    uid : string,
}

export const MemberList = (props : any) : React.ReactElement => {

    const [memberData, setMemberData] = React.useState<Array<MemberInfo>>([]);

    React.useEffect(() => {

        setMemberData([
            {
                avatar : '',
                name : '',
                uid : '1'
            }
        ])


    }, [])

    const renderItem = ({item} : {item : MemberInfo, index : number}) => {

        console.log(item);

        return(
            <Layout style={styles.MemberContainer}>

                <Layout style={styles.ProfileContainer}>
                    <FastImage source={require('../../../assets/image/Chat/guideGray.png')} style={styles.Avatar}/>
                    <Text style={styles.Title}>멤버 이름</Text>
                </Layout>

                <Pressable>
                    <FastImage source={require('../../../assets/image/Chat/Report_Button.png')} style={styles.Button}/>
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