import { Link } from 'react-router-dom';
import style from './_main.module.scss';
import { IRootState } from '@/types/interfaces';
import { useSelector } from 'react-redux';
import { Children, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

export const mainPageOffersSlides = [
  'RSSchool is infinitely working DISCOUNT code giving you 20% OFF per one purchase per one day',
  'HOT SALES 80% OFF on all white t-shirts',
  '2 = 1 !!! two t-shirts with the same art by price of one',
  'Get the gift with every second purchase - sticker pack, mug or cap - by your taste!',
];

function MainPage(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const containerRef = useRef<any>();
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);

  const actionHandler = (mode: string) => {
    containerRef.current.style.transitionDuration = '400ms';
    if (mode === 'prev') {
      if (current <= 1) {
        setTranslateX(0);
        setCurrent(mainPageOffersSlides.length);
      } else {
        setTranslateX(containerRef.current.clientWidth * (current - 1));
        setCurrent((prev) => --prev);
      }
    } else if (mode === 'next') {
      if (current >= mainPageOffersSlides.length) {
        setTranslateX(containerRef.current.clientWidth * (mainPageOffersSlides.length + 1));
        setCurrent(1);
      } else {
        setTranslateX(containerRef.current.clientWidth * (current + 1));
        setCurrent((prev) => ++prev);
      }
    }
  };

  useEffect(() => {
    const transitionEnd = () => {
      if (current <= 1) {
        containerRef.current.style.transitionDuration = '0ms';
        setTranslateX(containerRef.current.clientWidth * current)
      }
      if ((current: number) => mainPageOffersSlides.length) {
        containerRef.current.style.transitionDuration = '0ms';
        setTranslateX(containerRef.current.clientWidth * current)
      }
    }
    document.addEventListener('transitionend', transitionEnd);
    return () => {
      document.removeEventListener('transitionend', transitionEnd);
    }
  }, [current, mainPageOffersSlides])

  const offerSlides = useMemo(() => {
    if (mainPageOffersSlides.length > 1) {
      let items = Children.map(mainPageOffersSlides, (child, index) => (
        <div className={style.main_offer}>
          <div className={style.main_offer_text} key={index}>
            {child}
          </div>
          <span className={style.main_offer_pic}></span>
        </div>
      ));
      return [
        <div className={style.main_offer} key={mainPageOffersSlides.length + 1}>
          <div className={style.main_offer_text}>
            {mainPageOffersSlides[mainPageOffersSlides.length - 1]}
          </div>
          <span className={style.main_offer_pic}></span>
        </div>,
        ...items,
        <div className={style.main_offer} key={mainPageOffersSlides.length + 2}>
          <div className={style.main_offer_text}>{mainPageOffersSlides[0]}</div>
          <span className={style.main_offer_pic}></span>
        </div>,
      ];
    }

    return <div className={style.main_offer}>{mainPageOffersSlides[0]}</div>;
  }, [mainPageOffersSlides]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setTranslateX(containerRef.current.clientWidth * current);
    }
  }, []);

  return (
    <div className={style.main} data-testid="main-component">
      <div className={style.main_wrapper}>
        <div className={style.main_top}>
          <h1 className={style.main_title}>Awesome RSSchool Merch here</h1>
          <div className={style.main_profile_buttons}>
            <Link className={style.main_menu_link} to="/profile">
              {isAuth ? 'Profile' : 'LogIn'}
            </Link>
            <Link className={style.main_menu_link} to="/registration">
              Registration
            </Link>
          </div>
        </div>
        <div className={style.main_offers_slider}>
          <button
            onClick={() => actionHandler('prev')}
            className={`${style.main_offers_arrow} ${style.left}`}
          ></button>
          <div className={style.main_offers_wrapper}>
            <div
              ref={containerRef}
              className={style.main_offers}
              style={{ transform: `translate3d(${-translateX / 6}px, 0, 0)` }}
            >
              {offerSlides}
            </div>
          </div>
          <button
            onClick={() => actionHandler('next')}
            className={`${style.main_offers_arrow} ${style.right}`}
          ></button>
        </div>
        <div className={`${style.main_advertisment} ${style.customize}`}>
          <div className={style.main_sloth_left}></div>
          <div className={style.main_advertisment_text}>
            or pick and customize your own with RSSchool cool merch
          </div>
          <div className={style.main_sloth_right}></div>
        </div>
        <div className={style.main_slider}>
          <div className={`${style.main_arrow} ${style.left}`}></div>
          <div className={style.main_slide}>
            <div className={`${style.main_slide_pic} ${style.one}`}></div>
          </div>
          <div className={style.main_slide}>
            <div className={`${style.main_slide_pic} ${style.two}`}></div>
          </div>
          <div className={style.main_slide}>
            <div className={`${style.main_slide_pic} ${style.three}`}></div>
          </div>
          <div className={style.main_slide}>
            <div className={`${style.main_slide_pic} ${style.four}`}></div>
          </div>
          <div className={`${style.main_arrow} ${style.right}`}></div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
