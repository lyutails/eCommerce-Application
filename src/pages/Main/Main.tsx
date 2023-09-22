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
import { Attribute } from '@commercetools/platform-sdk';
import { getBestsellers } from '../../api/getBestsellers';
import { throwNewError } from '../../utils/throwNewError';

export const mainPageOffersSlides = [
  'HOT SALES 10% OFF for all RED T-Shirts and Caps during hot summer and autumn!',
  'RSSchool or Trinity are infinitely working DISCOUNT codes giving you 10% OFF or 30% OFF respectively per one purchase.',
  'Winter is coming - so get 10% OFF for all WHITE Hoodies, Mugs and Mice.',
  '2 = 1 !!! Back to black... all designers favourite colour - Two BLACK T-Shirts by the price of One!',
];

function MainPage(): JSX.Element {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const intervalRef = useRef(null) as MutableRefObject<number | null>;
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [discountCopiedModal, setDiscountCopiedModal] = useState(false);

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
        <div className={`${style.main_offer}`}>
          <div className={style.main_offer_text} key={index}>
            {child}
          </div>
        </div>
      ));
      return [
        <div
          className={`${style.main_offer}`}
          key={mainPageOffersSlides.length + 1}
        >
          <div className={style.main_offer_text}>
            {mainPageOffersSlides[mainPageOffersSlides.length - 1]}
          </div>
        </div>,
        ...items,
        <div className={style.main_offer} key={mainPageOffersSlides.length + 2}>
          <div className={style.main_offer_text}>{mainPageOffersSlides[0]}</div>
        </div>,
      ];
    }

    return (
      <div className={`${style.main_offer} ${style.one}`}>
        {mainPageOffersSlides[0]}
      </div>
    );
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

  const bestsellersArray: Attribute[][] = [];

  useEffect(() => {
    getBestsellers()
      .then((data) => {
        return data.map(
          (itemAttributes) => itemAttributes.masterVariant.attributes
        );
      })
      .then((response) => {
        if (response.length) {
          response.forEach((bestsellerItem) => {
            if (bestsellerItem && bestsellerItem[3]?.value === true) {
              bestsellersArray.push(bestsellerItem);
            }
          });
        }
      });
  }, [bestsellersArray]);

  async function copyTextToClipboard(text: string): Promise<string | void> {
    try {
      const copiedDiscount = await navigator.clipboard.writeText(text);
      return copiedDiscount;
    } catch {
      throwNewError('failed to copy discount');
    }
  }

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
        <div className={style.main_discounts_wrapper}>
          <button
            className={style.main_rsschool}
            onClick={(e): string | void => {
              copyTextToClipboard(e.currentTarget.textContent).then(
                (response) => {
                  return response;
                }
              );
              setDiscountCopiedModal(true);
              setTimeout(() => {
                setDiscountCopiedModal(false);
              }, 1500);
            }}
          >
            RSSchool
          </button>
          <button
            className={style.main_trinity}
            onClick={(e): string | void => {
              copyTextToClipboard(e.currentTarget.textContent);
              setDiscountCopiedModal(true);
              setTimeout(() => {
                setDiscountCopiedModal(false);
              }, 1500);
            }}
          >
            Trinity
          </button>
        </div>
        <Link className={style.main_customize} to="/customize">
          <div className={`${style.main_advertisment} ${style.customize}`}>
            <div className={style.main_advertisment_info}>
              <div className={style.main_glitch_container}>
                <div className={style.main_advertisment_glitch}>
                  {/* <div className={style.main_advertisment_title}>CUSTOMIZE</div> */}
                  CUSTOMIZE
                  {/* <div className={style.main_advertisment_title}>CUSTOMIZE</div> */}
                </div>
              </div>
              <div className={style.main_advertisment_text}>
                Pick and CUSTOMIZE RSSchool MERCHBAR&apos;s cool products by
                your own with RSSchool amazing merch... have fun \o/
              </div>
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
      <div
        className={
          discountCopiedModal
            ? `${style.modal_wrapper} ${style.show}`
            : style.modal_wrapper
        }
      >
        <div className={style.modal_body}></div>
      </div>
      <div
        className={
          discountCopiedModal ? `${style.overlay} ${style.show}` : style.overlay
        }
      ></div>
    </div>
  );
}

export default MainPage;
