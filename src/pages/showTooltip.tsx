export function showTooltip(
  setPasswordFocus: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setPasswordFocus(true);
}

export function hideTooltip(
  setPasswordFocus: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setPasswordFocus(false);
}
