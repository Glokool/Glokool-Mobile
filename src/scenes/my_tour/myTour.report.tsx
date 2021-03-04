import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  
} from 'react-native';
import {
  Icon,
  Layout,
  LayoutElement,
  Input,
  Button,
  Select,
  SelectItem,
  IndexPath
} from '@ui-kitten/components';
import Toast, {DURATION} from 'react-native-easy-toast';
import { MyTourReportProps } from '../../navigation/myTour.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faFlag, faAngleLeft, faExclamation, faComment } from '@fortawesome/free-solid-svg-icons';
import { SceneRoute } from '../../navigation/app.route';



var ToastRef;

export const MyTourReportScreen = (props: MyTourReportProps): LayoutElement => {

  const [place, setPlace] = React.useState('')
  const [attraction, setAttraction] = React.useState(true);
  const [restaurant, setRestaurant] = React.useState(false);
  const [cafe, setCafe] = React.useState(false);
  

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const location = [
    'Asoko',
    'Beomseok Restaurant',
    'Kimchi',
  ];
  const displayValue = location[selectedIndex.row];

  const [value, setValue] = React.useState('');

  const renderOption = (item) => (
    <SelectItem title={item}/>
  );

  const PressBack = () => {
      props.navigation.goBack();
  }

  const PressSend = () => {
    if(value == ''){
      ToastRef.show('신고 내용을 입력해주세요', 3000)
    }
    else{
      
    }
  }

  const PressAttraction = () => {
    setAttraction(true);
    setRestaurant(false);
    setCafe(false);
  }

  const PressRestaurant = () => {
    setAttraction(false);
    setRestaurant(true);
    setCafe(false);
  }

  const PressCafe = () => {
    setAttraction(false);
    setRestaurant(false);
    setCafe(true);
  }


    return(
        <React.Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
          
          {/*탭바 디자인*/}
          <Layout style={styles.TabBar}>
              <TouchableOpacity style={styles.IconContainer} onPress={PressBack}>
                  <FontAwesomeIcon icon={faAngleLeft} size={28}/>
              </TouchableOpacity>

              <Layout style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>      
                  <Text style={{fontSize: 16, fontWeight: 'bold',}}>HELP</Text>
              </Layout>

              <Layout style={styles.IconContainer}/>
          </Layout>

          {/* 내용물 */}
          <Layout style={{flex: 9, padding: 20, flexDirection: 'column'}}>
            <Text style={styles.desc}>If there is any problem, please report to let us know.</Text>
            

            {(attraction == true)? 
            <Layout>
              <Text style={styles.smallTitle}>Category</Text>
              
              <Layout style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={PressAttraction}>
                  <Layout style={styles.selectLayout}>
                    <Text style={styles.selectText}>Attraction</Text>
                  </Layout>
                </TouchableOpacity>

                <TouchableOpacity onPress={PressRestaurant}>
                  <Layout style={styles.layout}>
                    <Text style={styles.Text}>Restaurant</Text>
                  </Layout>
                </TouchableOpacity>

                <TouchableOpacity onPress={PressCafe}>
                  <Layout style={styles.layout}>
                    <Text style={styles.Text}>Cafe</Text>
                  </Layout>
                </TouchableOpacity>
              </Layout>
            </Layout>
            : null }

            {(restaurant == true)?
            <Layout>
              <Text style={styles.smallTitle}>Category</Text>

              <Layout style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={PressAttraction}>
                  <Layout style={styles.layout}>
                    <Text style={styles.Text}>Attraction</Text>
                  </Layout>
                </TouchableOpacity>

                <TouchableOpacity onPress={PressRestaurant}>
                  <Layout style={styles.selectLayout}>
                    <Text style={styles.selectText}>Restaurant</Text>
                  </Layout>
                </TouchableOpacity>

                <TouchableOpacity onPress={PressCafe}>
                  <Layout style={styles.layout}>
                    <Text style={styles.Text}>Cafe</Text>
                  </Layout>
                </TouchableOpacity>
              </Layout>
            </Layout>
            : null }

            {(cafe == true)?
            <Layout>
              <Text style={styles.smallTitle}>Category</Text>
              <Layout style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={PressAttraction}>
                  <Layout style={styles.layout}>
                    <Text style={styles.Text}>Attraction</Text>
                  </Layout>
                </TouchableOpacity>

                <TouchableOpacity onPress={PressRestaurant}>
                  <Layout style={styles.layout}>
                    <Text style={styles.Text}>Restaurant</Text>
                  </Layout>
                </TouchableOpacity>

                <TouchableOpacity onPress={PressCafe}>
                  <Layout style={styles.selectLayout}>
                    <Text style={styles.selectText}>Cafe</Text>
                  </Layout>
                </TouchableOpacity>
              </Layout>
              </Layout>
            : null }

            <Layout>
              <Text style={styles.smallTitle}>Place Name</Text>
              <Select
                style={styles.picker}
                placeholder='Choose the Location'
                value={displayValue}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                {location.map(renderOption)}
              </Select>

              <Input
                placeholder='신고내용을 써주세요 (번역필요)'
                style={styles.input}
                value={value}
                multiline={true}
                onChangeText={nextValue => setValue(nextValue)}
              />
              <Button
                style={styles.submitButton}
                onPress={PressSend}
                size='large'
              >
                SEND
              </Button>  

            </Layout>
          </Layout>


          <Toast ref={(toast) => ToastRef = toast} style={{backgroundColor:'#C9C9C9'}} textStyle={{color:'black'}} position={'bottom'}/>
        </React.Fragment>
    );
}


const styles = StyleSheet.create({
  Container: {    
      flex: 1,
      backgroundColor: 'white',
  },
  picker: {
    width: '80%',
    marginTop: 5,
    marginBottom: 30
  },
  TabBar:{        
      flexDirection: 'row',
      flex: 1
  },
  MainContainer: {
      flex: 10,
      backgroundColor : '#FFC043',
  },
  IconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon2: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    flexDirection: 'row',
    marginVertical: 15
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  desc: {
    fontSize: 16,
    marginVertical: 20,
  },
  input: {
    width: '100%',
    height: '50%'
  },
  submitButton: {
    marginVertical: 30,
    width: '100%',
    height: '10%',
  },
  selectLayout: {
    backgroundColor: '#FCCA67',
    borderRadius: 25,
    marginHorizontal: 10
  },
  layout: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    marginHorizontal: 10
  },
  selectText: {
    fontSize: 12,
    color: 'white',
    margin : 10
  },
  Text: {
    fontSize: 12,
    color: '#C9C9C9',
    margin : 10
  },
  smallTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  }
});