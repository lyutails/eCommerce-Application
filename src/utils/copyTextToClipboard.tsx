import { throwNewError } from './throwNewError';

export async function copyTextToClipboard(
  text: string
): Promise<string | void> {
  try {
    const copiedDiscount = await navigator.clipboard.writeText(text);
    return copiedDiscount;
  } catch {
    throwNewError('failed to copy discount');
  }
}
