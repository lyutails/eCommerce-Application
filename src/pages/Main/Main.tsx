import './_main.scss';
/* import { useRef, useEffect } from 'react';

const GetToken = (): JSX.Element => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClick = (event: Event): void => {
      console.log('Button clicked');

      console.log('bobbyhadz.com');
    };

    const element = ref.current;

    if (!element) {
      throw new Error('no button get token found');
    }

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div>
      <button ref={ref}>Click</button>
    </div>
  );
};

export default GetToken; */

function Main(): JSX.Element {
  return (
    <div className="products">
      <h1 className="products_title">New Awesome Products</h1>
      <button className="get_token">Get Token</button>
      <div className="products_body">
        <div className="products_card"></div>
      </div>
    </div>
  );
}
export default Main;
