export const recalculatePrice = (
  oldPrice: number,
  newPrice: number,
  setPriceTest: (value: React.SetStateAction<number>) => void
): void => {
  let as = 0;
  const pi = 10;

  const r = setInterval(() => {
    setPriceTest(as++);
    if (as > pi) {
      clearInterval(r);
    }
  }, 70);
};
