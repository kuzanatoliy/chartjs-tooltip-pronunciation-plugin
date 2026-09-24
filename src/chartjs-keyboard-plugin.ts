import type { Chart, Plugin } from 'chart.js';
import { NavigationStrategy } from './constants';
import { ChartjsKeyboardPluginEngine } from './engines';
import {
  BalanceNavigationStrategy,
  DataFirstNavigationStrategy,
  DataNavigationStrategy,
  DataSetFirstNavigationStrategy,
  DataSetNavigationStrategy,
} from './strategies';
import { type TChartjsKeyboardPluginOptions } from './types';

const store = new Map<Chart, ChartjsKeyboardPluginEngine>();

export const chartjsKeyboardPlugin: Plugin = {
  id: 'chartjsKeyboardPlugin',
  afterInit: (chart: Chart, _, options: TChartjsKeyboardPluginOptions) => {
    let Strategy = BalanceNavigationStrategy;
    switch (options.strategy) {
      case NavigationStrategy.DATA_FIRST:
        Strategy = DataFirstNavigationStrategy;
        break;
      case NavigationStrategy.DATASET_FIRST:
        Strategy = DataSetFirstNavigationStrategy;
        break;
      case NavigationStrategy.DATA:
        Strategy = DataNavigationStrategy;
        break;
      case NavigationStrategy.DATASET:
        Strategy = DataSetNavigationStrategy;
        break;
    }
    store.set(
      chart,
      new ChartjsKeyboardPluginEngine(chart, new Strategy(chart), options)
    );
  },

  afterEvent: (chart: Chart, args) => {
    if (chart.canvas !== document.activeElement) {
      return;
    }
    if (args.event.type === 'click') {
      store.get(chart)?.refresh();
    }
  },

  afterDestroy: (chart: Chart) => {
    store.get(chart)?.destroy();
    store.delete(chart);
  },
};
