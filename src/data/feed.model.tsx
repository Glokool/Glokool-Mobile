import * as Yup from 'yup';
import auth from '@react-native-firebase/auth'

// 입력값 검증 모델 - 로그인 화면

const user = auth().currentUser;

export class FeedData {

  constructor(
    readonly name: string,
    readonly email: string,) {
  }

  static empty(): FeedData {
    return new FeedData(
      user?.displayName,
      user?.email,
    );
  }
}

export const FeedSchema = Yup.object().shape({
  name: Yup.string().min(3, 'name must be at least 3 characters'),
  email: Yup.string().email('Invalid email'),  
});