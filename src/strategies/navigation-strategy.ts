import type { Chart } from 'chart.js';
import { isOnesetChart, setChartActiveElements } from '../helpers';

export abstract class NavigationStrategy {
  protected datasetIds: number[] = [];
  protected activeDatasetId: number = -1;
  protected dataIds: number[][] = [];
  protected activeDataId: number = -1;
  protected chart: Chart;

  constructor(chart: Chart) {
    this.chart = chart;
    this.refreshMeta();
  }

  public refreshMeta = () => {
    const meta = this.chart.getSortedVisibleDatasetMetas();
    this.datasetIds = meta.map((item) => item.index);
    this.dataIds =
      meta[0] && isOnesetChart(meta[0].type)
        ? meta.map((item) =>
            item.data
              .map((_, ind) => ind)
              .filter((ind) => this.chart.getDataVisibility(ind))
          )
        : meta.map((item) => item.data.map((_, ind) => ind));
    if (this.dataIds.length && this.dataIds[0].length) {
      this.activeDatasetId = 0;
      this.activeDataId = 0;
    } else {
      this.activeDatasetId = -1;
      this.activeDataId = -1;
    }
  };

  protected setChartActiveElements = () => {
    if (this.activeDataId !== -1 && this.activeDatasetId !== -1) {
      setChartActiveElements(this.chart, [
        {
          index: this.dataIds[this.activeDatasetId][this.activeDataId],
          datasetIndex: this.datasetIds[this.activeDatasetId],
        },
      ]);
    } else {
      setChartActiveElements(this.chart, []);
    }
  };

  abstract goEnd(): void;
  abstract goNext(): void;
  abstract goNextDataSet(): void;
  abstract goPrevious(): void;
  abstract goPreviousDataSet(): void;
  abstract goHome(): void;

  public hide = () => {
    setChartActiveElements(this.chart, []);
  };

  public display = () => {
    this.setChartActiveElements();
  };
}
