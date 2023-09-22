import style from './_header-paralax.module.scss';

function ParalaxHeader(): JSX.Element {
  window.addEventListener('scroll', () => {
    document.body.style.cssText = `--scrotop: ${window.scrollY}px`;
  });
  return (
    <div className={style.header_wrapper_paralax}>
      <div className={style.paralax_title}>
        <span className={style.paralax_title1}>RSSchool</span>
        <span className={style.paralax_title2}>Merchbar</span>
      </div>
      <div className={style.paralax_back}></div>
      <div className={style.paralax_center}></div>
      <div className={style.paralax_center2}></div>
      <div className={style.paralax_top}></div>
      <div className={style.paralax_arrow1}>Welcome to Shop</div>
      <div className={style.paralax_arrow2}></div>
    </div>
  );
}
export default ParalaxHeader;
