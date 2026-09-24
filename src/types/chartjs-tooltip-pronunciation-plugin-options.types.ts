import type { TooltipItem, ChartType } from 'chart.js';

export type TChartjsTooltipPronunciationPluginOptions = {
  pronunciationFormatter?: (tooltipItems: TooltipItem<ChartType>[]) => string;
};
