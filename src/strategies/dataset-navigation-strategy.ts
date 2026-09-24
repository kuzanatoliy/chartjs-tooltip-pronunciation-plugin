import { NavigationStrategy } from './navigation-strategy';
import { setChartActiveElements } from '../helpers';

export class DataSetNavigationStrategy extends NavigationStrategy {
  protected setChartActiveElements = () => {
    if (this.activeDatasetId !== -1) {
      setChartActiveElements(
        this.chart,
        this.dataIds[this.activeDatasetId].map((index) => ({
          index,
          datasetIndex: this.datasetIds[this.activeDatasetId],
        }))
      );
    } else {
      setChartActiveElements(this.chart, []);
    }
  };

  public goEnd = () => {
    this.activeDatasetId = this.datasetIds.length - 1;
    this.setChartActiveElements();
  };

  public goNext = () => {
    this.activeDatasetId++;
    if (this.activeDatasetId === this.datasetIds.length) {
      this.activeDatasetId = 0;
    }
    this.setChartActiveElements();
  };

  public goNextDataSet = this.goNext;

  public goPrevious = () => {
    this.activeDatasetId--;
    if (this.activeDatasetId < 0) {
      this.activeDatasetId = this.datasetIds.length - 1;
    }
    this.setChartActiveElements();
  };

  public goPreviousDataSet = this.goPrevious;

  public goHome = () => {
    this.activeDatasetId = 0;
    this.setChartActiveElements();
  };
}
