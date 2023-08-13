import iconCloseEye from '../../../public/assets/icon/eye-close.svg';
import iconEye from '../../../public/assets/icon/eye.svg';

export const showPassword = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
  const parent = e.target as HTMLImageElement;
  const input = parent.parentNode?.previousSibling as HTMLInputElement;
  console.log();
  if (parent.src === iconEye) {
    input.type = 'text';
    parent.src = iconCloseEye;
  } else {
    input.type = 'password';
    parent.src = iconEye;
  }
};
