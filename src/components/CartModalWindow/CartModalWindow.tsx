import style from './_cart-modal-window.module.scss';

export type CartModalWindowProps = {
  deleteFanc: () => void;
  abolishFanc: () => void;
};
function CartModalWindow(props: CartModalWindowProps): JSX.Element {
  return (
    <div className={style.modal_wrapper}>
      <div className={`${style.modal} ${style.modal_visible}`}>
        <div className={style.modal_block}>
          <h3 className={style.modal_title}>
            Are you sure you want to Clear Shopping Cart?
          </h3>
          <div className={style.modal_buttons}>
            <button onClick={props.deleteFanc} className={style.modal_button}>
              Yes
            </button>
            <button onClick={props.abolishFanc} className={style.modal_button}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartModalWindow;
