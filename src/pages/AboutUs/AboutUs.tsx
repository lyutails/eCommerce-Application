import style from '../AboutUs/_about-us.module.scss';

function AboutUsPage(): JSX.Element {
  return (
    <section className={style.about_us}>
      <div className={style.about_us_motto}>
        <h2 className={style.motto_title}>Crazy Frontend Developers</h2>
        <p className={style.motto_desc}>Our Crazy Frontend Developers team </p>
      </div>
      <div className={style.about_us_card}>
        <div>
          <div>
            <img src="" alt="" />
            <span>профессия</span>
            <span></span>
          </div>
          <div>
            <p>вклад</p>
            <div>коронная фраза</div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutUsPage;
