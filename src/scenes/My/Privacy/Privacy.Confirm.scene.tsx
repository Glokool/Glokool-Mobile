import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Layout,
  LayoutElement,
  Text,
  Button
} from '@ui-kitten/components';
import { Formik, FormikProps } from 'formik';
import { PrivacyConfirmData, PrivacyConfirmSchema } from '../../../data/Privacy.Confirm.model';
import { FormInput } from '../../../component/privacy.component';
import { EyeIcon, EyeOffIcon } from '../../../component/icon';
import Toast from 'react-native-easy-toast';
import { PrivacyConfirmProps } from '../../../navigation/ScreenNavigator/My.navigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { SceneRoute } from '../../../navigation/app.route'
import { CommonActions } from '@react-navigation/native';

import {
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';

var toastRef: any;

export const PrivacyConfirm = (props: PrivacyConfirmProps): LayoutElement => {

  //뒤로 돌아가지 못하게
  const PrivacyNavigator = CommonActions.reset({
    index: 0,
    routes: [{ name: SceneRoute.MY }],
  });

  const PressBack = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: SceneRoute.MY }],
    });
  }

  //비밀번호 보이기 안보이기
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const renderPasswordIcon = (props: any): React.ReactElement => {
    const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;

    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <IconComponent {...props} />
      </TouchableWithoutFeedback>
    );
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderForm = (props: FormikProps<PrivacyConfirmData>): React.ReactFragment => (
    <React.Fragment>
      <Layout style={styles.inputContainer}>
        <FormInput
          id='password'
          placeholder='Password'
          secureTextEntry={!passwordVisible}
          accessoryRight={renderPasswordIcon}
        />
        <FormInput
          id='passwordConfirm'
          placeholder='Password Confirm'
          secureTextEntry={!passwordVisible}
          accessoryRight={renderPasswordIcon}
        />
        <Button
          style={styles.submitButton}
          onPress={props.handleSubmit}
          size='large'
        >
          CONFIRM
        </Button>

      </Layout>
    </React.Fragment>
  );

  const onFormSubmit = (values: PrivacyConfirmData): void => {
    if (values.password == "" || values.passwordConfirm == "") {

    }
    else {
      const user = auth().currentUser;

      user?.updatePassword(values.password)
        .then(response => {
          props.navigation.dispatch(PrivacyNavigator);
        })
        .catch(error => {
          toastRef.show('Change Failed!', 3000);
        })
    }
  };

  return (
    <React.Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
      <Layout style={styles.mainContainer}>

        {/*탭바 표현*/}
        <Layout style={styles.Tabbar}>
          <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={PressBack}>
              <FontAwesomeIcon icon={faAngleLeft} size={24} />
            </TouchableOpacity>
          </Layout>
          <Layout style={{ flex: 3, alignItems: 'center', justifyContent: 'center', marginHorizontal: 25 }}>
            <Text style={styles.TextStyle}>SETTINGS</Text>
          </Layout>
          <Layout style={{ flex: 1 }} />
        </Layout>

        {/* 세팅 내용물*/}
        <Layout style={styles.Container}>
          <Text style={styles.mainTitle}>Privacy</Text>
          <Formik
            initialValues={PrivacyConfirmData.empty()}
            validationSchema={PrivacyConfirmSchema}
            onSubmit={onFormSubmit}>
            {renderForm}
          </Formik>
        </Layout>
      </Layout>

      <Toast ref={(toast) => toastRef = toast} textStyle={{ color: 'white' }} position={'bottom'} />
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
  TextStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  Container: {
    flex: 9,
    padding: 20
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20
  },
  inputContainer: {
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFC043',
    width: '100%',
  },
  submitButton: {
    marginVertical: 30,
    width: '100%',
    height: '20%',
  },
});