import { Image } from '@commercetools/platform-sdk';

export type CategoryCardProps = {
  images?: Image[];
  keyCard: string;
  prices?: number | string;
  discounted?: number | string;
  sku: string;
  brand?: string;
  description?: string;
};

export type CartProductProps = {
  name: string;
  images?: Image[];
  keyCard?: string;
  prices?: number | string;
  discounted?: number | string;
  sku: string;
  onDelete: () => void;
  quantity: number;
  reduceQuantity: React.MouseEventHandler<HTMLButtonElement> | undefined;
  increaseQuantity: () => void;
  idCard: string;
};

export type BestsellerProps = {
  sku: string;
  images?: Image[];
};
