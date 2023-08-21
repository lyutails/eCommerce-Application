import { IInputFields } from '../../types/interfaces';
import iconEmail from '../../../public/assets/icons/email.svg';
import iconPassword from '../../../public/assets/icons/password.svg';
import iconEye from '../../../public/assets/icons/eye.svg';

const inputFields: IInputFields = {
  email: {
    type: 'email',
    placeholder: 'E-mail',
    img1: iconEmail,
  },
  password: {
    type: 'password',
    placeholder: 'Password',
    img1: iconPassword,
    img2: iconEye,
  },
};

export const clue = {
  invalidEmail:
    'Please enter a valid email address (for example: name@example.com)',
  shortPassword: 'Password must be at least 8 characters long',
  uppercasePassword:
    'Password must contain at least one uppercase letter (A-Z)',
  lowercasePassword:
    'Password must contain at least one lowercase letter (a-z)',
  digitPassword: 'Password must contain at least one digit (0-9)',
  specialPassword:
    'Password must contain at least one special character (e.g., !@#$%^&*)',
  requiredField: 'Required field.',
};

export const { email, password } = inputFields;
