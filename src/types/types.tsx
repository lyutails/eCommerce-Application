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
