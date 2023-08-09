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
      <div className={style.authorization}>
        <h2 className={style.title}>Login</h2>
        <form action="" className={style.form}>
          <div className={style.email}>
            <input
              className={style.email_input}
              type="email"
              placeholder="E-mail"
              required
            />
            <span className={style.email_clue}>{clue.invalidEmail}</span>
          </div>
          <div className={style.password}>
            <input
              className={style.password_input}
              type="password"
              placeholder="Password"
              required
            />
            <span className={style.password_clue}>{clue.shortPassword}</span>
          </div>
          <button>Login</button>
        </form>
      </div>
      <div className={style.registration}>
        <h2 className={style.title}>Registartion</h2>
        <button className={style.registration_button}>Registration</button>
      </div>
    </div>
  );
}
export default AuthPage;
