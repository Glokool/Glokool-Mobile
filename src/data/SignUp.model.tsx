import * as Yup from 'yup';

// 입력값 검증 모델 - 로그인 화면

export class SignUpData {

  constructor(
    readonly email: string,
    readonly password: string,
    readonly passwordConfirm: string,
    readonly name: string,
  ) { }

  static empty(): SignUpData {
    return new SignUpData(
      '',
      '',
      '',
      '',
    );
  }
}

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  name: Yup.string().min(3, 'Name must be at least 3 characters'),
  password: Yup.string().min(8, 'Password must be at least 8 characters'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});