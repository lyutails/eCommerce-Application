import iconCloseEye from '../../public/assets/icons/eye-close.svg';
import iconEye from '../../public/assets/icons/eye.svg';

export const showPassword = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
): void => {
  const image = (e.target as HTMLImageElement).children[0] as HTMLImageElement;
  const input = (e.target as HTMLImageElement)
    .previousSibling as HTMLInputElement;
  if (image.src === iconEye) {
    input.type = 'text';
    image.src = iconCloseEye;
  } else {
    input.type = 'password';
    image.src = iconEye;
  }
};
