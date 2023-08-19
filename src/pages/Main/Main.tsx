import style from './_main.module.scss';

function MainPage(): JSX.Element {
  return (
    <div className={style.main} data-testid="main-component">
      <div className={style.main_wrapper}>
        <div className={style.main_categories_block}>
          <h1 className={style.main_title}>Awesome RSSchool Merch here</h1>
        </div>
        <div className={style.main_offers_wrapper}>
        <div className={style.main_offers}>
          <div className={style.main_offer}>
            'RSSchool' is infinitely working DISCOUNT code giving you 20% OFF
            per one purchase per one day
            <span className={style.main_offer_pic}></span>
          </div>
          <div className={style.main_offer}>
            HOT SALES 80% OFF on all white t-shirts
            <span className={style.main_offer_pic}></span>
          </div>
          <div className={style.main_offer}>
            2 = 1 two t-shirts with the same art by price of one
            <span className={style.main_offer_pic}></span>
          </div>
          <div className={style.main_offer}>
            get the gift with every second purchase - sticker pack, mug or cap
            <span className={style.main_offer_pic}></span>
          </div>
        </div>
        </div>
        <div className={`${style.main_advertisment} ${style.customize}`}>
          <div className={style.main_sloth_left}></div>
          your advertisment can be here ^^
          <div className={style.main_sloth_right}></div>
        </div>
        <div className={style.main_slider}>
          <div className={`${style.main_arrow} ${style.left}`}></div>
          <div className={`${style.main_slide} ${style.one}`}></div>
          <div className={`${style.main_slide} ${style.two}`}></div>
          <div className={`${style.main_slide} ${style.three}`}></div>
          <div className={`${style.main_slide} ${style.four}`}></div>
          <div className={`${style.main_arrow} ${style.right}`}></div>
        </div>
      </div>
    </div>
  );
}
export default MainPage;
