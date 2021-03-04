import * as Yup from 'yup';

// 입력값 검증 모델 - 로그인 화면

export class PasswordData {

  constructor(
    readonly email: string,
    ) {
  }

  static empty(): PasswordData {
    return new PasswordData(
      ''
    );
  }
}

export const PasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
});