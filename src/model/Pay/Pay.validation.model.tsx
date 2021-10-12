import * as Yup from 'yup';

export class PayValidationData {
    constructor (
        readonly name: string,
        readonly email: string,
        readonly phone?: string,
        readonly snsID?: string,
    ) {}

    static empty(): PayValidationData {
        return new PayValidationData (
            '',
            '',
            '',
            '',
        );
    }
}

export const PayValidationModel = Yup.object().shape({
    email: Yup.string().email('Incorrect email value'),
    name: Yup.string().min(1, 'Please write your full name'),
});