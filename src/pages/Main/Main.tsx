import { Link } from 'react-router-dom';
import style from './_main.module.scss';
import {
  Children,
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export const mainPageOffersSlides = [
  'RSSchool or Trinity are infinitely working DISCOUNT codes giving you 10% OFF or 30% OFF respectively per one purchase.',
  'HOT SALES 10% OFF for all red t-shirts and caps during hot summer and autumn!',
  'Winter is coming - so get the 10% OFF for all white hoodies, mugs and mice.',
  '2 = 1 !!! Back to black... all designers favourite colour - Two Black t-shirts by the price of One!',
];

function MainPage(): JSX.Element {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const intervalRef = useRef(null) as MutableRefObject<number | null>;
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);

  const actionHandler = useCallback(
    (mode: string): void => {
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
          setTranslateX(
            containerRef.current.clientWidth * (mainPageOffersSlides.length + 1)
          );
          setCurrent(1);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current + 1));
          setCurrent((prev) => ++prev);
        }
      }
    },
    [current]
  );

  useEffect(() => {
    const transitionEnd = (): void => {
      if (current <= 1) {
        containerRef.current.style.transitionDuration = '0ms';
        setTranslateX(containerRef.current.clientWidth * current);
      }
      if (current >= mainPageOffersSlides.length) {
        containerRef.current.style.transitionDuration = '0ms';
        setTranslateX(containerRef.current.clientWidth * current);
      }
    };
    document.addEventListener('transitionend', transitionEnd);
    return () => {
      document.removeEventListener('transitionend', transitionEnd);
    };
  }, [current]);

  const offerSlides = useMemo(() => {
    if (mainPageOffersSlides.length > 1) {
      const items = Children.map(mainPageOffersSlides, (child, index) => (
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
  }, []);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setTranslateX(containerRef.current.clientWidth * current);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      actionHandler('next');
    }, 3000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [actionHandler]);

  return (
    <div className={style.main} data-testid="main-component">
      <div className={style.main_wrapper}>
        <div className={style.main_top}>
          <h1 className={style.main_title}>Awesome RSSchool Merch here</h1>
          <div className={style.main_profile_buttons}>
            <Link className={style.main_menu_link} to="/login">
              LogIn
            </Link>
            <Link className={style.main_menu_link} to="/registration">
              Registration
            </Link>
          </div>
        </div>
        <div className={style.main_offers_slider}>
          <button
            data-testid="prev"
            onClick={(): void => actionHandler('prev')}
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
            data-testid="next"
            onClick={(): void => actionHandler('next')}
            className={`${style.main_offers_arrow} ${style.right}`}
          ></button>
        </div>
        <Link to="/customize">
          <div className={`${style.main_advertisment} ${style.customize}`}>
            <div className={style.main_sloth_left}></div>
            <div className={style.main_advertisment_text}>
              Pick and CUSTOMIZE RSSchool MERCHBAR&apos;s cool products by your
              own with RSSchool amazing merch... have fun \o/
            </div>
            <div className={style.main_sloth_right}></div>
          </div>
        </Link>
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
