import iconCloseEye from '../../public/assets/icon/eye-close.svg';
import iconEye from '../../public/assets/icon/eye.svg';

export const showPassword = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
  const image = e.target as HTMLImageElement;
  const input = image.parentNode?.previousSibling as HTMLInputElement;
  console.log();
  if (image.src === iconEye) {
    input.type = 'text';
    image.src = iconCloseEye;
  } else {
    input.type = 'password';
    image.src = iconEye;
  }
};

export const checkboxHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  func: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  func(e.target.checked);
};
