import style from '../AboutUs/_about-us.module.scss';
import logo from '../../../public/assets/icons/logo-rsschool.png';
import CardAboutUs from '../../components/CardAboutUs/CardAboutUs';

function AboutUsPage(): JSX.Element {
  const developers = [
    {
      catchphrase: `"Oh, my God, That's Genius!"`,
      lastName: 'Lyusya Cool',
      position: 'Teamlead, Frontend developer ',
      githab: `https://github.com/lyutails`,
      biography:
        'Wonderful girl from St. Petersburg who found herself in Frontend development',
      contribution:
        'Creator of Main, Catalog, Cart, Category pages. Goddess of Commercetools. Creator of all UI-Kit ',
      cooperation:
        'Our leader who always finds the right words of encouragement. Bringing us all together and helping us all make friends',
      img: 'black',
    },
    {
      catchphrase: `"It's working for me!"`,
      lastName: 'Iana Belousova',
      position: 'Frontend developer ',
      githab: `https://github.com/yanabel1996`,
      biography:
        'Wonderful girl from Poland who found herself in Frontend development',
      contribution:
        'Creator of the Registration, Authorization, Profile and Card pages.  Goddess of Arti and React-Store.',
      cooperation:
        'Inexhaustible source of energy, always came to the rescue at any second, loves the code and is always there to help with it',
      img: 'white',
    },
    {
      catchphrase: `"Who touched the Header again!"`,
      lastName: 'Natalia Grischenok',
      position: 'Frontend developer ',
      githab: `https://github.com/CRAFTSW0MAN/`,
      biography:
        'A former lawyer who realized he wanted to do more than read contracts. Loves to code and create amazing things out of nothing.',
      contribution:
        'Creator of the Product, About Us, Customize pages.  Goddess "console.log"  ',
      cooperation:
        'Figoro of this team, tried to participate in the creation of each page and always forgot to make a commit',
      img: 'red',
    },
  ];
  return (
    <section className={style.about_us}>
      <div className={style.about_us_motto}>
        <h2 className={style.motto_title}>Development Team</h2>
        <h2 className={style.motto_title2}>Crazy Frontend Developers</h2>
      </div>
      <div className={style.about_us_developers}>
        {developers.map((developer) => (
          <div key={developer.img}>
            <CardAboutUs
              catchphrase={developer.catchphrase}
              name={developer.lastName}
              position={developer.position}
              githab={developer.githab}
              biography={developer.biography}
              contribution={developer.contribution}
              cooperation={developer.cooperation}
              img={developer.img}
            />
          </div>
        ))}
      </div>

      <div className={style.map_block}>
        <h3 className={style.map_block_title}>
          A map of the world and our cities
        </h3>
        <div className={style.map}>
          <div className={style.map_children}></div>
        </div>
      </div>
      <div className={style.desc_training_platform}>
        <h3 className={style.training_platform_title}>
          Training Platform
          <span className={style.training_platform_title_span}>
            <br /> &quot;The Rolling Scopes School&quot;
          </span>
        </h3>
        <div className={style.desc_training_platform_block}>
          <span>
            This project is the final assignment of a learning platform
            RS-School, that prepares a highly qualified Frontend of Developers.
          </span>{' '}
          <br />
          <span className={style.desc_span}>Join us! Follow this link!</span>
          <a
            className={style.link}
            href="https:/rs.school"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.link_img} src={logo} alt="logo" />
          </a>
        </div>
      </div>
    </section>
  );
}
export default AboutUsPage;
