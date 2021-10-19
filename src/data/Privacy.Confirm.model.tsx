import * as Yup from 'yup';

// 입력값 검증 모델 - 로그인 화면

export class PrivacyConfirmData {
  constructor(
    readonly password: string,
    readonly passwordConfirm: string) {
  }

  static empty(): PrivacyConfirmData {
    return new PrivacyConfirmData(
      '',
      ''
    );
  }
}

export const PrivacyConfirmSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be at least 8 characters'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});