import { FormEvent } from 'react';

let loginCheck = false;
const passwordCheck = false;

// import { MouseEventHandler } from "react";

const REGEXP = {
  // eslint-disable-next-line no-useless-escape
  mail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  zip: /^\d{5}(-\d{4})?$/,
  phone:
    /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
  password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
  strengthPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
};

function alertError(): void {
  return console.log('error');
}

export const checkEmail = (e: FormEvent<HTMLInputElement>): void => {
  if (!(e.target as HTMLInputElement).value) {
    console.log((e.target as HTMLInputElement).value);
    alertError();
    loginCheck = false;
  } else if ((e.target as HTMLInputElement).value === 'f') {
    alertError();
    loginCheck = false;
  }
};

//listener with arguments
/* const smth =
  (param: string) =>
  (e: MouseEventHandler<HTMLButtonElement>): void => {
    return console.log(param);
  };

<button
  onClick={(e: MouseEventHandler<HTMLButtonElement>): void => smth('sdced')(e)}
></button>; */