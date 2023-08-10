import style from './_footer.module.scss';

function Footer(): JSX.Element {
  return (
    <div className={style.footer}>
      <div className={style.footer_wrapper}>
        <div className={style.footer_left}>
          <a className={style.footer_rsschool} href="https://rs.school/">
            <div className={style.footer_rsschool_logo}></div>
          </a>
          <div className={style.footer_year}>2023</div>
        </div>
        <div className={style.footer_right}>
          <div className={style.footer_teamlogo}></div>
          <a className={style.footer_github_link} href="https://github.com/CRAFTSW0MAN/">
            <div className={style.footer_github_logo}></div>
          </a>
          <a className={style.footer_github_link} href="https://github.com/yanabel1996">
            <div className={style.footer_github_logo}></div>
          </a>
          <a className={style.footer_github_link} href="https://github.com/lyutails/">
            <div className={style.footer_github_logo}></div>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Footer;
