export const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    func: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    func(e.target.checked);
  };