import { TNavigationStrategy } from '../types';

type TNavigationStrategyKey =
  'DATA' | 'DATASET' | 'DATA_FIRST' | 'DATASET_FIRST' | 'BALANCE';

export const NavigationStrategy: Record<
  TNavigationStrategyKey,
  TNavigationStrategy
> = {
  DATA: 'data',
  DATASET: 'dataset',
  DATA_FIRST: 'data-first',
  DATASET_FIRST: 'dataset-first',
  BALANCE: 'balance',
} as const;
