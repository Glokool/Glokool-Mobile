import * as Yup from 'yup';

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