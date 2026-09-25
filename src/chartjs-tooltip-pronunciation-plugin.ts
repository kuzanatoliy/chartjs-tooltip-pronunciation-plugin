import { Chart, type Plugin } from 'chart.js';
import { type TChartjsTooltipPronunciationPluginOptions } from './types';
import { ChartjsTooltipPronunciationPluginEngine } from './engines';

const store = new Map<Chart, ChartjsTooltipPronunciationPluginEngine>();

export const chartjsTooltipPronunciationPlugin: Plugin = {
  id: 'chartjsTooltipPronunciationPlugin',

  afterInit: (
    chart: Chart,
    _,
    options: TChartjsTooltipPronunciationPluginOptions
  ) => {
    store.set(
      chart,
      new ChartjsTooltipPronunciationPluginEngine(chart, options)
    );
  },

  afterTooltipDraw: (chart: Chart) => {
    store.get(chart)?.pronunce();
  },

  beforeDestroy: (chart: Chart) => {
    store.get(chart)?.destroy();
  },

  afterDestroy: (chart: Chart) => {
    store.delete(chart);
  },
};
