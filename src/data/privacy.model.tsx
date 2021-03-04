import * as Yup from 'yup';

// 입력값 검증 모델 - 로그인 화면

export class PrivacyData {
  constructor(
    readonly password: string) {
  }

  static empty(): PrivacyData {
    return new PrivacyData(
      '',
    );
  }
}

export const PrivacySchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be at least 8 characters'),
});