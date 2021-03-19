import React from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Divider,
  IndexPath,
  Layout,
  LayoutElement,
  Text,
  Input,
  Modal,
  Button,
  Card
} from '@ui-kitten/components';
import { MyPageProfileScreenProps } from '../../navigation/myPage.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { launchImageLibrary } from 'react-native-image-picker/src';
import Toast from 'react-native-easy-toast';
var toastRef;

export const MyPageProfileScreen = (props: MyPageProfileScreenProps): LayoutElement => {
  //Name
  const [name, setName] = React.useState('');
  const [withDrawal, setWithDrawal] = React.useState(false);
  const user = auth().currentUser;
  const uid = user?.uid;
  //Date of Birth
  const startDay = new Date(1900, 1, 1);
  const [date, setDate] = React.useState(new Date()); 
  //Sex
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const gender = [
    'Male',
    'Female',
  ];
  const displayValue = gender[selectedIndex.row]; // 성별 정하기 (0 : male, 1: female)
  const [profile, setProfile] = React.useState(null);
  const [userData, setUserData] = React.useState({
    name: '',
    gender: '',
    country: '',
    signupDate: new Date()
  });
  const [birthDate, setBirthDate] = React.useState({
    year: '',
    month: '',
    day: ''
  })

  
  

  const PressBack = () => {
    props.navigation.goBack();
  }

  const PressChange = () => {
    var profile = user?.updateProfile({
      displayName: name,          
    })
    .then(() => {
      console.log('프로필 업데이트 성공')
      toastRef.show('Profile Update Success', 2000);
      props.navigation.goBack();
    })
    .catch(() => {      
      console.log('프로필 업데이트 실패')
    })

  }

  const PressPicture = async() => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 1,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
          if(response.didCancel == true){
            //중도 취소시
          }
          else{
              var type = response.type
              const imageType = type.split('/')
              const reference = storage().ref();
              setProfile(response.uri);
              
              const picRef = reference.child(`profile/${uid}.${imageType[1]}`).putFile(response.uri);
              picRef.on(storage.TaskEvent.STATE_CHANGED,
                  function(snapshot) {
                      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                      switch (snapshot.state) {
                      case storage.TaskState.PAUSED:
                          console.log('Upload is paused');
                          break;
                      case storage.TaskState.RUNNING:
                          console.log('Upload is running');
                          break;
                      }
                  }, function(error) {
                      switch (error.code) {
                          case 'storage/unauthorized':
                          break;
                      
                          case 'storage/canceled':
                          break;

                          case 'storage/unknown':
                          break;
                  }
                  }, function() {
                      picRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        var profile = user?.updateProfile({
                          photoURL: downloadURL,          
                        })         
                        .then(() => {
                          console.log('프로필 업데이트 성공')
                        })
                        .catch(() => {      
                          console.log('프로필 업데이트 실패')
                        })

                        firestore().collection('Users').doc(uid).set({
                          avatar: downloadURL
                        }, { merge: true });


                      });
              })
          }
      })
  }

  const withDrawalFunction = () => {
    
    firestore().collection('Users').doc(uid).delete()
      .then((result) => {
        user?.delete();
        // 유저를 삭제하고 완전히 삭제
      })


  }

  React.useEffect(() => {

    

    const updateData = async() => {
      
      await firestore().collection('Users').doc(uid).get()
        .then(function(doc) {
          
          setUserData(doc._data);
          setProfile(doc._data.avatar);
          
          
          var date = new Date(doc._data.birthDate.seconds * 1000);
          console.log(date.getDay())

          setName(user?.displayName);
          
          setBirthDate({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          })
          
          
        })
        .catch((err) => {
          console.log(err)
        })
    }
    
    console.log(user?.photoURL)
    updateData();
  }, [])


  return (
    <React.Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <Layout style={styles.mainContainer}>

      <Modal
          visible={withDrawal}
          backdropStyle={styles.backdrop}
        >
          <Card disabled={true}>
            <Text style={{marginVertical: 30}}>Are you Sure?</Text>
            
            <Layout style={{flexDirection: 'row'}}>
              <Layout style={{margin: 15, flex: 1}}>
                <Button style={styles.cancelButton} appearance='outline' onPress={() => {
                  setWithDrawal(false);
                }}>
                  CANCLE
                </Button>
              </Layout>
              <Layout style={{margin: 15, flex: 1}}>
                <Button onPress={() => {
                  setWithDrawal(false);
                }}>
                  MOVE
                </Button>
              </Layout>
              
            </Layout>
            
          </Card>
        </Modal>

        {/*탭바 표현*/}
        <Layout style={styles.Tabbar}>
          <Layout style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={PressBack}>
              <FontAwesomeIcon icon={faAngleLeft} size={24}/>
            </TouchableOpacity>
          </Layout>
          <Layout style={{flex:3, alignItems:'center', justifyContent: 'center', marginHorizontal: 25}}>
            <Text style={styles.TextStyle}>SETTINGS</Text>
          </Layout>
          <Layout style={{flex:1}}/>         
        </Layout>

        <Layout style={styles.Container}>
          <Layout style={{marginHorizontal: 20, marginVertical: 10}}>
            <Text style={styles.title}>Profile</Text>
          </Layout>

          <Layout style={styles.photoContainer}>
            <Layout style={{flex: 1}}>
              <Text style={styles.title}>Photo</Text>
            </Layout>
            <Layout style={{flex: 3}}/>
            <Layout style={{flex: 1}}>
              <TouchableOpacity onPress={PressPicture}>
                {(profile == undefined || profile == null)?
                  <Image style={styles.profile} source={require('../../assets/profile.jpg')}/>
                :
                  <Image style={styles.profile} source={{uri: profile}}/>
                }
               
              </TouchableOpacity>
            </Layout>
          </Layout>

          <Layout style={styles.infoContainer}>
            <Layout style={{flex: 1}}>
              <Text style={styles.title}>User Name</Text>
            </Layout>
            <Layout style={{flex: 1}}/>
            <Layout style={{flex: 1, alignItems: 'flex-end'}}>
              <Input
                value={name}
                onChangeText={nextValue => setName(nextValue)}
              />
              {/*<Text style={styles.title}>{userData?.name}</Text>*/}
            </Layout>
          </Layout>

          <Layout style={styles.infoContainer}>
            <Layout style={{flex: 1}}>
              <Text style={styles.title}>Gender</Text>
            </Layout>
            <Layout style={{flex: 1}}/>
            <Layout style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.title}>{userData?.gender}</Text>
            </Layout>
          </Layout>

          <Layout style={styles.infoContainer}>
            <Layout style={{flex: 1}}>
              <Text style={styles.title}>Date of Birth</Text>
            </Layout>
            <Layout style={{flex: 1}}/>
            <Layout style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.title}>{birthDate.year}.{birthDate.month}.{birthDate.day}</Text>
            </Layout>
          </Layout>

          <Layout style={styles.infoContainer}>
            <Layout style={{flex: 1}}>
              <Text style={styles.title}>Nationality</Text>
            </Layout>
            <Layout style={{flex: 1}}/>
            <Layout style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.title}>{userData?.country}</Text>
            </Layout>
          </Layout>

          <Divider style={{backgroundColor: 'gray', margin: 20}}/>
          
          <TouchableOpacity style={{marginVertical: 10}} onPress={() => setWithDrawal(true)}>
            <Layout style={styles.infoContainer}>            
                <Layout style={{flex: 1}}>
                  <Text style={styles.title}>Withdrawal</Text>
                </Layout>                      
            </Layout>
          </TouchableOpacity>  

          <TouchableOpacity onPress={PressChange}>
            <Layout style={styles.infoContainer}>            
                <Layout style={{flex: 1}}>
                  <Text style={styles.title}>Change The Profile</Text>
                </Layout>                       
            </Layout>
          </TouchableOpacity> 


        </Layout>

      </Layout>

      <Toast ref={(toast) => toastRef = toast} position={'center'}/>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: 'white',
  },
  Tabbar: {
    flex: 1,
    flexDirection: 'row',
  },
  Container:{
    flex: 8,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  TextStyle: {    
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  photoContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    marginHorizontal: 20,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 100
  },
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cancelButton: {
    borderColor: '#FFC043',
    backgroundColor: 'white',   
  },
});