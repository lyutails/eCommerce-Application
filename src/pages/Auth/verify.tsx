import { IPasswordErrors } from '../../types/interfaces';
import { ChangeEvent } from 'react';
// import { useDispatch } from 'react-redux';

// import { MouseEventHandler } from "react";

const clue = {
  invalidEmail:
    'Please enter a valid email address (for example: name@example.com)',
  invalidPassword: 'Please enter a valid password',
  shortPassword: 'Password must be at least 8 characters long',
  uppercasePassword:
    'Password must contain at least one uppercase letter (A-Z)',
  lowercasePassword:
    'Password must contain at least one lowercase letter (a-z)',
  digitPassword: 'Password must contain at least one digit (0-9)',
  specialPassword:
    'Password must contain at least one special character (e.g., !@#$%^&*)',
  invalidTypePassword:
    'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  requiredField: 'This is required field',
};

export const passwordErrors = [
  'Password must be at least 8 characters long',
  'Password must contain at least one uppercase letter (A-Z)',
  'Password must contain at least one lowercase letter (a-z)',
  'Password must contain at least one digit (0-9)',
  'Password must not contain leading or trailing whitespace',
];

const REGEXP = {
  // eslint-disable-next-line no-useless-escape
  mail: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
  zip: /^\d{5}(-\d{4})?$/,
  phone:
    /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
  password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
  digitPassword: /^[0-9]+$/,
  uppercasePassword: /^[A-Z]+$/,
  lowercasePassword: /^[a-z]+$/,
  strengthPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
  whitespacePassword: /^\S+$/,
};

//для навигации
// const navigate = useNavigate();

let loginСheck = false;
const passwordСheck = false;

// чтобы значения из инпута попадали в логин и пароль
export const loginHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const passwordHandler = (
  e: ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<string>>
): void => {
  func((e.target as HTMLInputElement).value);
};

export const handleLoginInput = (
  loginField: string,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  if (loginField === '') {
    setErrorLogin(clue.requiredField);
    loginСheck = false;
  } else if (!REGEXP.mail.test(loginField)) {
    setErrorLogin(clue.invalidEmail);
    loginСheck = false;
  } else {
    setErrorLogin('');
    loginСheck = true;
  }
  return loginСheck;
};

export const handlePasswordInput = (passwordField: string): IPasswordErrors => {
  //валидация для пароля
  function isEmpty(): boolean {
    return passwordField === '';
  }
  function hasUppercase(): boolean {
    return !REGEXP.uppercasePassword.test(passwordField);
  }
  function hasLowercase(): boolean {
    return !REGEXP.lowercasePassword.test(passwordField);
  }
  function hasDigit(): boolean {
    return !REGEXP.digitPassword.test(passwordField);
  }
  function isShort(): boolean {
    return passwordField.length < 8;
  }
  function hasWhitespace(): boolean {
    return !REGEXP.whitespacePassword.test(passwordField);
  }
  const passwordErr = {
    empty: {
      text: 'This is required field',
      isError: isEmpty(),
    },
    uppercase: {
      text: 'Password must contain at least one uppercase letter (A-Z)',
      isError: hasUppercase(),
    },
    lowercase: {
      text: 'Password must contain at least one lowercase letter (a-z)',
      isError: hasLowercase(),
    },
    short: {
      text: 'Password must be at least 8 characters long',
      isError: isShort(),
    },
    whitespace: {
      text: 'Password must not contain leading or trailing whitespace',
      isError: hasWhitespace(),
    },
    digit: {
      text: 'Password must not contain leading or trailing whitespace',
      isError: hasDigit(),
    },
  };
  return passwordErr;
};

export const handleСreationReg = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  loginField: string,
  passwordField: string
): void => {
  e.preventDefault();
  handleLoginInput(loginField, setErrorLogin);
  const passwordErr = handlePasswordInput(passwordField);
  // for (const key in passwordErr) {
  //   if (
  //     passwordErr.hasOwnProperty(key) &&
  //     passwordErr[key].hasOwnProperty('isError')
  //   ) {
  //     if (passwordErr[key].isError) {
  //       console.log('Найден ключ isError в', key, 'со значением true');
  //       // Добавьте вашу логику обработки здесь
  //     } else {
  //       console.log('Найден ключ isError в', key, 'со значением false');
  //       // Добавьте вашу логику обработки здесь
  //     }
  //   }
  // }
};
// return (
//   <div>
//     <form action="">
//       <input type="email" onChange={(event): void => loginHandler(event)} />
//       <span className={style.red}>{loginError}</span>
//       <input
//         type="password"
//         onChange={(event): void => passwordHandler(event)}
//       />
//       <span className={style.red}>{passwordError}</span>
//       <button onClick={(event): void => handeleСreationReg(event)}>
//         Click
//       </button>
//     </form>
//   </div>
// );
