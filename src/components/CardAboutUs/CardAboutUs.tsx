import style from './_card-about-us.module.scss';
export type CardAboutUsProps = {
  catchphrase: string;
  name: string;
  position: string;
  img: string;
  githab: string;
  biography: string;
  contribution: string;
  cooperation: string;
};
function CardAboutUs(props: CardAboutUsProps): JSX.Element {
  const imageClass =
    props.img === 'red'
      ? style.red
      : props.img === 'black'
      ? style.black
      : style.white;
  return (
    <div className={style.about_us_all_card}>
      <div className={style.about_us_catchphrase}>
        <span>{props.catchphrase}</span>
      </div>
      <div className={style.card}>
        <div className={style.card_block_imeges}>
          <div className={`${style.image} ${imageClass}`}></div>
          <div className={style.card_block_name}>
            <div className={style.image_title}>{props.name}</div>
            <div className={style.image_title2}>{props.position}</div>
            <div className={style.image_title_git}>
              <span> GitHub: </span>
              <a
                className={style.git_link}
                href={props.githab}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <div className={style.git_link_logo}></div>
              </a>
            </div>
          </div>
        </div>
        <div className={style.card_decs}>
          <div className={style.card_biography}>
            <span className={style.class_span}>Biography: </span>
            <span>{props.biography}</span>
          </div>
          <div className={style.card_contribution}>
            <span className={style.class_span}>Contribution: </span>
            <span>{props.contribution}</span>
          </div>
          <div className={style.card_cooperation}>
            <span className={style.class_span}>Cooperation: </span>
            <span>{props.cooperation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardAboutUs;
