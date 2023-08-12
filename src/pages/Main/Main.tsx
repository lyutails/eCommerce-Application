import { categories } from '../../api/createClient';
import { useSelector } from 'react-redux';
import style from './_main.module.scss';
import { useEffect, useState } from 'react';

function Main(): JSX.Element {
  categories;
  // let category;
  // const category = useSelector((state: ICategoryState) => state.category);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  useEffect(() => {
    categories.then((response) => {
      // category = response;
      setAllCategories(response);
    });
    // return response;
  }, []);
  return (
    <div className={style.main}>
      <div className={style.main_wrapper}>
        <div className={style.main_categories_block}>
          <h1 className={style.main_title}>
            Awesome RSSchool Merch Categories
          </h1>
          <div className={style.main_categories}>
            {allCategories.map((category) => {
              return (
                <div className={style.main_category} key={category}>
                  add Sloth pic here staring at / choosing {category}
                </div>
              );
            })}
          </div>
        </div>
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
