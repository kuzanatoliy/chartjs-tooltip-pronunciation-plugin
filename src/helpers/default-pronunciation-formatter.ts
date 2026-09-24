import { TChartjsTooltipPronunciationPluginOptions } from '../types/chartjs-tooltip-pronunciation-plugin-options.types';

export const defaultPronunciationFormatter: Required<TChartjsTooltipPronunciationPluginOptions>['pronunciationFormatter'] =
  () => {
    console.warn(
      'The pronunciationFormatter is required to pronunce tooltip text'
    );
    return '';
  };
