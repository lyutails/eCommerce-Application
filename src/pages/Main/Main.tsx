import { getCustomer } from '../../api/createCustomer';
import style from './_main.module.scss';

function Main(): JSX.Element {
  console.log('lalala');
  // // const [allCategories, setAllCategories] = useState<string[]>([]);
  // useEffect(() => {
  //   const customerDraftData = {
  //     email: 'TashaOneMore@example.com',
  //     firstName: 'lalala',
  //     lastName: 'again',
  //     password: 'secret123',
  //     streetName: 'Stedman St',
  //     streetNumber: '10',
  //     postalCode: '99901',
  //     city: 'Ketchikan',
  //     state: 'AK',
  //     country: 'US',
  //     building: '5',
  //     apartment: '2346',
  //   };
  //   createCustomer(customerDraftData);
  // }, []);
  getCustomer('TashaOneMore@example.com');
  return (
    <div className={style.main}>
      <div className={style.main_wrapper}>
        <div className={style.main_categories_block}>
          <h1 className={style.main_title}>
            Awesome RSSchool Merch Categories
          </h1>
        </div>
        <div className={style.main_advertisment}>discounts promotions</div>
        <div className={style.main_advertisment}>
          or pick and customize your own with RSSchool cool merch... paste sloth
          pic here... your advertisment can be here ^^
        </div>
        <div className={style.main_slider}>
          <div className={`${style.main_arrow} ${style.left}`}></div>
          <div className={style.main_slide}>slider product</div>
          <div className={style.main_slide}>slider product</div>
          <div className={style.main_slide}>slider product</div>
          <div className={style.main_slide}>slider product</div>
          <div className={`${style.main_arrow} ${style.right}`}></div>
        </div>
      </div>
    </div>
  );
}
export default Main;

// <div className={style.main_arrow + ' ' + style.left}></div>
// <div className={`${style.main_arrow} ${style.left}`}></div>

//   {menuList.map((item, index) => {
//     const {id, idx, img, name, description, price, weight} = item;
//     return(
//         <Link to = {`/products/${id}`} key= {index}>
//         <Card
//             idx = {idx}
//             id={id}
//             img={img}
//             name ={name}
//             description ={description}
//             price ={price}
//             weight ={weight}
//         />
//         </Link>
//     );
// })}
