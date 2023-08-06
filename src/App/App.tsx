import { tokenCustomer } from '../../src/api/clientBuilder';
import { tokenAdmin } from '../../src/api/adminBuilder';
import style from './_app.module.scss';

function App(): JSX.Element {
  // const string = 'lalala';
  console.log(tokenAdmin);
  console.log(tokenCustomer);
  return (
    <div>
      <h1 className={style.title}>Hello!</h1>
    </div>
  );
}
export default App;
