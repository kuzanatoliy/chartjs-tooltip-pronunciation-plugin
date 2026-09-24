import type { TNavigationDirection } from './navigation-direction.types';
import type { TNavigationStrategy } from './navigation-strategy.types';

export type TChartjsKeyboardPluginOptions = {
  strategy?: TNavigationStrategy;
  direction?: TNavigationDirection;
};
