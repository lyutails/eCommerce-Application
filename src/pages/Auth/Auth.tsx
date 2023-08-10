import style from '../Auth/_auth.module.scss';

const clue = {
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

function AuthPage(): JSX.Element {
  return (
    <div className={style.login}>
      <AuthPageLogin />
      <AuthPageRegistration />
    </div>
  );
}

function AuthPageRegistration(): JSX.Element {
  return (
    <div className={style.registration}>
      <h2 className={style.title}>Registartion</h2>
      <button className={style.registration_button}>Registration</button>
    </div>
  );
}

function AuthPageLogin(): JSX.Element {
  return (
    <div className={style.authorization}>
      <h2 className={style.title}>Login</h2>
      <form action="" className={style.form}>
        <div className={style.email}>
          <div className={style.email_wrapper}>
            <div className={style.email_wrapper_img}></div>
            <input
              className={style.email_wrapper_input}
              type="email"
              placeholder="E-mail"
              required
            />
          </div>
          <span className={style.email_clue}>{clue.invalidEmail}</span>
        </div>
        <div className={style.password}>
          <div className={style.password_wrapper}>
            <div className={style.password_img}></div>
            <input
              className={style.password_input}
              type="password"
              placeholder="Password"
              required
            />
            <div className={style.password_eye}></div>
          </div>
          <span className={style.password_clue}>{clue.shortPassword}</span>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}

// const obj = {
//   email: {

//   },
//   password: {

//   }
// }
export default AuthPage;
