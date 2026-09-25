import { ChartType } from 'chart.js';
import { type TChartjsKeyboardPluginOptions } from './src/types';
declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    chartjsKeyboardPlugin?: TChartjsKeyboardPluginOptions;
  }
}
