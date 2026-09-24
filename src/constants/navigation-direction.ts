import { TNavigationDirection } from '../types';

type TNavigationDirectionKey = 'LTR' | 'RTL';

export const NavigationDirection: Record<
  TNavigationDirectionKey,
  TNavigationDirection
> = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const;
