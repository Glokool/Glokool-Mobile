import React, { useCallback, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import {
    IndexPath,
    Layout,
    Text,
    Input,
    Select,
    SelectItem,
    LayoutElement,
} from '@ui-kitten/components';
import { MYProfileProps } from '../../navigation/ScreenNavigator/My.navigator';
import { launchImageLibrary } from 'react-native-image-picker/src';
import { ScrollView } from 'react-native-gesture-handler';
import { AngleLeft } from '../../assets/icon/Common';
import { Profile } from '../../assets/icon/My';
import { Mini_K, Mini_R, Mini_T } from '../../assets/icon/UserType';
import { Loading } from '../../component/Common/Loading';
import { AuthContext } from '../../context/AuthContext';

var toastRef: any;

export const MyProfile = (props: MYProfileProps): LayoutElement => {
    const user = auth().currentUser;

    const [name, setName] = React.useState('');
    const [profile, setProfile] = React.useState(null);
    const [checkProfileChange, setCheckProfileCHange] = React.useState<boolean>(
        false,
    );

    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const [FBLoading, setFBLoading] = React.useState(true);

    //Date of Birth
    const startDay = new Date(1900, 1, 1);
    const [date, setDate] = React.useState(new Date());
    //Sex
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const gender = ['Male', 'Female'];
    const displayValue = gender[selectedIndex.row]; // 성별 정하기 (0 : male, 1: female)
    const [userData, setUserData] = React.useState({
        name: '',
        gender: '',
        country: '',
        signupDate: new Date(),
    });
    const [birthDate, setBirthDate] = React.useState({
        year: '',
        month: '',
        day: '',
    });
    const [selectedTypeIndex, setSelectedTypeIndex] = React.useState(
        new IndexPath(0),
    );
    const type = ['Travler', 'Resident', 'Korean'];
    const displayTypeValue = type[selectedTypeIndex.row];
    const [loading, setLoading] = React.useState<boolean>(false);

    const TravelIcon = () => <Mini_T />;

    const KoreanIcon = () => <Mini_K />;

    const ResidentIcon = () => <Mini_R />;

    const PressBack = () => {
        props.navigation.goBack();
    };

    /* FB storage에 이미지 배열 업로드 */
    const uploadImg = async () => {
        const storageRef = storage().ref();
        const picRef = storageRef.child(`profile/${currentUser?.uid}`);
        return picRef.putFile(profile).then(() => picRef.getDownloadURL());
    };

    /* save the profile btn */
    const PressChange = async () => {
        setLoading(true);

        const firestoreUpdate = {
            name: name,
            type: displayTypeValue,
        };

        const authUpdate = {
            displayName: name,
        };

        if (checkProfileChange) {
            const pic = await uploadImg();

            Object.assign(firestoreUpdate, {
                avatar: pic,
            });

            Object.assign(authUpdate, {
                photoURL: pic,
            });
        }

        Promise.all([
            firestore()
                .collection('Users')
                .doc(currentUser?.uid)
                .update(firestoreUpdate),
            user?.updateProfile(authUpdate),
        ]);

        setCurrentUser({ ...currentUser, ...authUpdate });

        props.navigation.goBack();
    };

    const PressDefaultPic = (index: string) => {};

    /* 이미지 변경 */
    const PressPicture = async () => {
        await launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                quality: 1,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (response.didCancel == true) {
                    //중도 취소시
                } else {
                    setProfile(response.uri);
                    setCheckProfileCHange(true);
                }
            },
        );
    };
    React.useEffect(() => {
        setName(currentUser?.displayName);
        setProfile(currentUser?.photoURL);
    }, []);

    React.useEffect(() => {
        const updateData = async () => {
            await firestore()
                .collection('Users')
                .doc(currentUser?.uid)
                .get()
                .then(function (doc) {
                    setUserData(doc._data);

                    var date = new Date(doc._data.birthDate.seconds * 1000);

                    setBirthDate({
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                    });

                    const Type = doc._data.type;

                    if (Type === 'Korean') {
                        setSelectedTypeIndex(new IndexPath(2));
                    } else if (Type === 'Resident') {
                        setSelectedTypeIndex(new IndexPath(1));
                    } else {
                        setSelectedTypeIndex(new IndexPath(0));
                    }

                    setFBLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        updateData();
    }, []);

    return (
        <React.Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            {!FBLoading ? (
                <Layout style={styles.mainContainer}>
                    {/*탭바 표현*/}
                    <Layout style={styles.Tabbar}>
                        <Layout
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={PressBack}
                                style={{ padding: 10 }}>
                                <AngleLeft />
                            </TouchableOpacity>
                        </Layout>
                        <Layout
                            style={{
                                flex: 3,
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                flexDirection: 'row',
                            }}>
                            <Profile style={{ marginRight: 10 }} />
                            <Text style={styles.TextStyle}>Profile</Text>
                        </Layout>
                        <Layout style={{ flex: 1 }} />
                    </Layout>
                    <Layout style={styles.Container}>
                        <ScrollView style={{ marginHorizontal: 15 }}>
                            <Layout style={styles.photoContainer}>
                                <Layout style={{ flex: 4 }}>
                                    <Text style={styles.title}>Photo</Text>

                                    <Layout style={styles.miniProfileContainer}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                PressDefaultPic('1')
                                            }>
                                            <Image
                                                style={styles.miniProfile}
                                                source={require('../../assets/profile/profile_01.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                PressDefaultPic('2')
                                            }>
                                            <Image
                                                style={styles.miniProfile}
                                                source={require('../../assets/profile/profile_02.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                PressDefaultPic('3')
                                            }>
                                            <Image
                                                style={styles.miniProfile}
                                                source={require('../../assets/profile/profile_03.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                PressDefaultPic('4')
                                            }>
                                            <Image
                                                style={styles.miniProfile}
                                                source={require('../../assets/profile/profile_04.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                PressDefaultPic('5')
                                            }>
                                            <Image
                                                style={styles.miniProfile}
                                                source={require('../../assets/profile/profile_05.png')}
                                            />
                                        </TouchableOpacity>
                                    </Layout>
                                </Layout>

                                <Layout style={{ flex: 1, marginRight: 15 }}>
                                    <TouchableOpacity onPress={PressPicture}>
                                        {profile == undefined ||
                                        profile == null ||
                                        profile == '' ? (
                                            <Image
                                                style={styles.profile}
                                                source={require('../../assets/profile/profile_01.png')}
                                            />
                                        ) : (
                                            <Image
                                                style={styles.profile}
                                                source={{
                                                    uri: profile,
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </Layout>
                            </Layout>

                            <Layout style={styles.infoContainer}>
                                <Layout style={{ flex: 1 }}>
                                    <Text style={styles.title}>User Name</Text>
                                </Layout>

                                <Layout
                                    style={{ flex: 2, alignItems: 'flex-end' }}>
                                    <Input
                                        style={{
                                            maxWidth:
                                                Dimensions.get('window').width *
                                                0.5,
                                        }}
                                        value={name}
                                        onChangeText={(nextValue) =>
                                            setName(nextValue)
                                        }
                                    />
                                </Layout>
                            </Layout>

                            <Layout style={styles.infoContainer}>
                                <Layout style={{ flex: 1 }}>
                                    <Text style={styles.title}>
                                        User Status
                                    </Text>
                                </Layout>

                                <Layout
                                    style={{ flex: 2, alignItems: 'flex-end' }}>
                                    <Select
                                        selectedIndex={selectedTypeIndex}
                                        style={{
                                            minWidth:
                                                Dimensions.get('window').width *
                                                0.5,
                                        }}
                                        onSelect={(index) =>
                                            setSelectedTypeIndex(index)
                                        }
                                        placeholder={'Please select a Type'}
                                        value={displayTypeValue}>
                                        <SelectItem
                                            accessoryLeft={TravelIcon}
                                            title="Traveler"
                                        />
                                        <SelectItem
                                            accessoryLeft={ResidentIcon}
                                            title="Resident"
                                        />
                                        <SelectItem
                                            accessoryLeft={KoreanIcon}
                                            title="Korean"
                                        />
                                    </Select>
                                </Layout>
                            </Layout>

                            <Layout style={styles.infoContainer}>
                                <Layout style={{ flex: 2 }}>
                                    <Text style={styles.title}>Gender</Text>
                                </Layout>
                                <Layout style={{ flex: 1 }} />
                                <Layout
                                    style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.title}>
                                        {userData?.gender}
                                    </Text>
                                </Layout>
                            </Layout>

                            <Layout style={styles.infoContainer}>
                                <Layout style={{ flex: 2 }}>
                                    <Text style={styles.title}>
                                        Date of Birth
                                    </Text>
                                </Layout>

                                <Layout
                                    style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.title}>
                                        {birthDate.year}.{birthDate.month}.
                                        {birthDate.day}
                                    </Text>
                                </Layout>
                            </Layout>

                            <Layout style={styles.infoContainer}>
                                <Layout style={{ flex: 1 }}>
                                    <Text style={styles.title}>
                                        Nationality
                                    </Text>
                                </Layout>
                                <Layout style={{ flex: 1 }} />
                                <Layout
                                    style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={styles.title}>
                                        {userData?.country}
                                    </Text>
                                </Layout>
                            </Layout>

                            <TouchableOpacity
                                style={styles.SaveButton}
                                onPress={() => PressChange()}>
                                <Text style={styles.ButtonText}>
                                    Save the Profile
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </Layout>
                </Layout>
            ) : null}

            {loading === true ? <Loading /> : null}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    Tabbar: {
        flex: 1,
        flexDirection: 'row',
    },
    Container: {
        flex: 8,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    TextStyle: {
        fontFamily: 'IBMPlexSansKR-Medium',
        fontSize: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: 'IBMPlexSansKR-Medium',
        color: '#7777FF',
    },
    photoContainer: {
        flexDirection: 'row',
        marginVertical: 30,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    miniProfileContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    miniProfile: {
        width: 34,
        height: 34,
        borderRadius: 100,
        marginRight: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    cancelButton: {
        borderColor: '#FFC043',
        backgroundColor: 'white',
    },
    SaveButton: {
        width: Dimensions.get('window').width - 60,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        height: 50,
        borderWidth: 1.5,
        borderColor: '#8797FF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    ButtonText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 22,
        color: '#8797FF',
    },
});
