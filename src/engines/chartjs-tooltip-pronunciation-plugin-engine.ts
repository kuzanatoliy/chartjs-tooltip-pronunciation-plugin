import { Chart } from 'chart.js';
import { type TChartjsTooltipPronunciationPluginOptions } from '../types';
import { defaultPronunciationFormatter } from '../helpers';

export class ChartjsTooltipPronunciationPluginEngine {
  private chart: Chart;
  private statusContainer = document.createElement('div');
  private currTooltipKey = '';
  private pronunciationFormatter: Required<TChartjsTooltipPronunciationPluginOptions>['pronunciationFormatter'] =
    defaultPronunciationFormatter;

  private init = () => {
    this.statusContainer.setAttribute('role', 'status');
    this.statusContainer.style.position = 'fixed';
    this.statusContainer.style.overflow = 'hidden';
    this.statusContainer.style.width = '0';
    this.chart.canvas.insertAdjacentElement('afterend', this.statusContainer);
  };

  private getTooltipKey = () => {
    return (
      this.chart.tooltip
        ?.getActiveElements()
        .map((item) => `${item.index}|${item.datasetIndex}`)
        .join('|') || ''
    );
  };

  constructor(
    chart: Chart,
    options: TChartjsTooltipPronunciationPluginOptions = {}
  ) {
    this.chart = chart;
    this.init();
    if (options.pronunciationFormatter) {
      this.pronunciationFormatter = options.pronunciationFormatter;
    }
  }

  public pronunce = () => {
    const key = this.getTooltipKey();
    if (!key) {
      this.statusContainer.textContent = '';
    } else if (key !== this.currTooltipKey) {
      setTimeout(
        () =>
          (this.statusContainer.textContent = this.pronunciationFormatter(
            this.chart.tooltip!.dataPoints
          ))
      );
    }
    this.currTooltipKey = key;
  };

  public destroy = () => {
    this.statusContainer.remove();
  };
}
