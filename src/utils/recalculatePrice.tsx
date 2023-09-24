export const increasePrice = (
  oldPrice: number,
  newPrice: number,
  setPriceTest: (value: React.SetStateAction<number>) => void
): void => {
  let as = oldPrice;
  const pi = newPrice;

  const r = setInterval(() => {
    setPriceTest((as += 100));
    if (as === pi) {
      clearInterval(r);
    }
  }, 20);
};

export const reducePrice = (
  oldPrice: number,
  newPrice: number,
  setPriceTest: (value: React.SetStateAction<number>) => void
): void => {
  let as = oldPrice;
  const pi = newPrice;

  const r = setInterval(() => {
    setPriceTest((as -= 100));
    if (as === pi) {
      clearInterval(r);
    }
  }, 20);
};
