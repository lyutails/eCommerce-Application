import { Attribute } from '@commercetools/platform-sdk';

export type CategoryCardProps = {
  images?: string;
  keyCard: string;
  prices?: number;
  discounted?: number | string;
  sku: string;
  brand?: string;
};
