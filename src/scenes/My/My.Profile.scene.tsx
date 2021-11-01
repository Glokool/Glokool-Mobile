import React, { useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
    Text
} from 'react-native';
import {
    IndexPath,
    Layout,
    Select,
    SelectItem,
    LayoutElement,
} from '@ui-kitten/components';
import { MYProfileProps } from '../../navigation/SceneNavigator/My.navigator';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker/src';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AngleLeft } from '../../assets/icon/Common';
import { Profile } from '../../assets/icon/My';
import { Mini_K, Mini_R, Mini_T } from '../../assets/icon/UserType';
import { Loading } from '../../component/Common/Loading.component';
import { AuthContext } from '../../context/AuthContext';
import { ChangeProfile, ProfileBasic, ProfileBlue, ProfileGray, ProfileOrange, ProfileGreen, ProfilePurple } from '../../assets/icon/My';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const MyProfile = (props: MYProfileProps): LayoutElement => {
    const user = auth().currentUser;

    const [name, setName] = React.useState<string>("");
    const [profile, setProfile] = React.useState<string | any>("");
    const [checkProfileChange, setCheckProfileChange] = React.useState<boolean>(
        false,
    );
    const [checkDefaultProfileChange, setCheckDefaultProfileChange] = React.useState<boolean>(
        false,
    );

    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const [FBLoading, setFBLoading] = React.useState(true);
    const [userData, setUserData] = React.useState<FirebaseFirestoreTypes.DocumentData | undefined>({
        avatar: "",
        birthDate: {
            nanoseconds: 0,
            seconds: 0,
        },
        country: "",
        email: "",
        gender: "",
        name: "",
        signupDate: {
            nanoseconds: 0,
            seconds: 0,
        },
        tokens: [],
        type: "",
    });
    const [birthDate, setBirthDate] = React.useState({
        year: 0,
        month: 0,
        day: 0,
    });
    const [selectedTypeIndex, setSelectedTypeIndex] = React.useState<IndexPath | any>(
        new IndexPath(0),
    );
    const type = ['Traveler', 'Resident', 'Korean'];
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

        if (checkDefaultProfileChange) {

            Object.assign(firestoreUpdate, {
                avatar: profile,
            });

            Object.assign(authUpdate, {
                photoURL: profile,
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

    const PressDefaultPic = (idx: number) => {
        let defaultProfile;
        if (idx == 1) {
            defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/glokool-a7604.appspot.com/o/profile%2FprofileDefault5.png?alt=media&token=9590f8ce-f405-474f-936c-9d880e1b1b2e'
        } else if (idx == 2) {
            defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/glokool-a7604.appspot.com/o/profile%2FprofileDefault2.png?alt=media&token=77abf795-cd96-4f79-88af-0b170d6f9d7e'
        } else if (idx == 3) {
            defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/glokool-a7604.appspot.com/o/profile%2FprofileDefault3.png?alt=media&token=2a1bc2ed-9d1b-4b64-95fb-968691e8bf72'
        } else if (idx == 4) {
            defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/glokool-a7604.appspot.com/o/profile%2FprofileDefault4.png?alt=media&token=79d39c00-7a5e-405e-b4c7-c31d3fd41eb1'
        } else {
            defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/glokool-a7604.appspot.com/o/profile%2FprofileDefault1.png?alt=media&token=df83f1e1-5efc-40bf-a62f-f1191d3cef81'
        }
        setProfile(defaultProfile);
        setCheckDefaultProfileChange(true);
    };

    /* 이미지 변경 */
    const PressPicture = async () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                quality: 1,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response: ImagePickerResponse) => {
                if (response.didCancel == true) {
                    //중도 취소시
                } else {
                    setProfile(response.uri);
                    setCheckProfileChange(true);
                }
            },
        );
    };

    React.useEffect(() => {
        setName(currentUser?.displayName);
        setProfile(currentUser?.photoURL);
    }, []);

    const updateData = async () => {
        firestore()
            .collection('Users')
            .doc(currentUser?.uid)
            .get()
            .then(function (doc) {
                setUserData(doc.data());

                var date = new Date(doc.data()?.birthDate.seconds * 1000);

                setBirthDate({
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                });

                const Type = doc.data()?.type;

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

    React.useEffect(() => {


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
                                    <Text style={[styles.title, { color: '#7777ff' }]}>Photo</Text>

                                    <Layout style={styles.miniProfileContainer}>
                                        <TouchableOpacity
                                            style={styles.smallProfileContainer}
                                            onPress={() => PressDefaultPic(1)}>
                                            <ProfileGray />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.smallProfileContainer}
                                            onPress={() => PressDefaultPic(2)}>
                                            <ProfileOrange />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.smallProfileContainer}
                                            onPress={() => PressDefaultPic(3)}>
                                            <ProfilePurple />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.smallProfileContainer}
                                            onPress={() => PressDefaultPic(4)}>
                                            <ProfileGreen />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.smallProfileContainer}
                                            onPress={() => PressDefaultPic(5)}>
                                            <ProfileBlue />
                                        </TouchableOpacity>
                                    </Layout>
                                </Layout>

                                <Layout style={{ flex: 1, marginRight: 15 }}>
                                    <TouchableOpacity onPress={PressPicture}>
                                        {profile == undefined ||
                                            profile == null ||
                                            profile == '' ? (
                                            <Layout style={{ width: 75, height: 75, }}>
                                                <ProfileBasic />
                                                <ChangeProfile style={{ position: 'absolute', bottom: 0, right: 0 }} />
                                            </Layout>
                                        ) : (
                                            <Layout style={{ width: 75, height: 75, }}>
                                                <Image
                                                    style={styles.profile}
                                                    source={{
                                                        uri: profile,
                                                    }}
                                                />
                                                <ChangeProfile style={{ position: 'absolute', bottom: 0, right: 0 }} />
                                            </Layout>
                                        )}
                                    </TouchableOpacity>
                                </Layout>
                            </Layout>

                            <Layout style={styles.infoContainer}>
                                <Layout style={{ flex: 2 }}>
                                    <Text style={[styles.title, { color: '#7777ff' }]}>User Name</Text>
                                </Layout>

                                <Layout
                                    style={{ flex: 2, alignItems: 'flex-end', borderBottomWidth: 3, borderColor: '#F8F8F8' }}>
                                    <TextInput
                                        style={[styles.title]}
                                        value={name}
                                        onChangeText={(nextValue) =>
                                            setName(nextValue)
                                        }
                                    />
                                </Layout>
                            </Layout>

                            <Layout style={styles.infoContainer}>
                                <Layout style={{ flex: 1 }}>
                                    <Text style={[styles.title, { color: '#7777ff' }]}>
                                        User Status
                                    </Text>
                                </Layout>

                                <Layout
                                    style={{ flex: 2, alignItems: 'flex-end' }}>
                                    <Select
                                        selectedIndex={selectedTypeIndex}
                                        style={{
                                            minWidth:
                                                Dimensions.get('window').width * 0.5,
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
                                    <Text style={[styles.title, { color: '#7777ff' }]}>Gender</Text>
                                </Layout>
                                <Layout
                                    style={{ flex: 2, alignItems: 'flex-end', borderBottomWidth: 3, borderColor: '#F8F8F8' }}>
                                    <Text style={styles.title}>
                                        {userData?.gender}
                                    </Text>
                                </Layout>
                            </Layout>

                            <Layout style={styles.infoContainer}>
                                <Layout style={{ flex: 2 }}>
                                    <Text style={[styles.title, { color: '#7777ff' }]}>
                                        Date of Birth
                                    </Text>
                                </Layout>

                                <Layout
                                    style={{ flex: 2, alignItems: 'flex-end', borderBottomWidth: 3, borderColor: '#F8F8F8' }}>
                                    <Text style={styles.title}>
                                        {birthDate.year}.{birthDate.month}.
                                        {birthDate.day}
                                    </Text>
                                </Layout>
                            </Layout>

                            <Layout style={styles.infoContainer}>
                                <Layout style={{ flex: 2 }}>
                                    <Text style={[styles.title, { color: '#7777ff' }]}>
                                        Nationality
                                    </Text>
                                </Layout>
                                <Layout
                                    style={{ flex: 2, alignItems: 'flex-end', borderBottomWidth: 3, borderColor: '#F8F8F8' }}>
                                    <Text style={styles.title}>
                                        {userData?.country}
                                    </Text>
                                </Layout>
                            </Layout>

                            <TouchableOpacity
                                style={styles.SaveButton}
                                onPress={() => PressChange()}>
                                <Text style={styles.ButtonText}>
                                    Save Profile
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
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Pretendard-Medium',
        fontWeight: '400',
        color: '#000000'
    },
    photoContainer: {
        flexDirection: 'row',
        marginVertical: 30,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        width: 75,
        height: 75,
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
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7777ff',
    },
    ButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: 'white',
    },
    smallProfileContainer: {
        marginRight: 5,
    },
});
