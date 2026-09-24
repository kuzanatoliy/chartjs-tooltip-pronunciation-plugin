import { NavigationStrategy } from './navigation-strategy';
import { setChartActiveElements } from '../helpers';

export class DataNavigationStrategy extends NavigationStrategy {
  protected setChartActiveElements = () => {
    if (this.activeDataId !== -1) {
      setChartActiveElements(
        this.chart,
        this.datasetIds.map((datasetIndex) => ({
          index: this.activeDataId,
          datasetIndex,
        }))
      );
    } else {
      setChartActiveElements(this.chart, []);
    }
  };

  public goEnd = () => {
    this.activeDataId = this.dataIds[this.dataIds.length - 1].length - 1;
    this.setChartActiveElements();
  };

  public goNext = () => {
    this.activeDataId++;
    if (this.dataIds[this.activeDatasetId].length === this.activeDataId) {
      this.activeDataId = 0;
    }
    this.setChartActiveElements();
  };

  public goNextDataSet = this.goNext;

  public goPrevious = () => {
    this.activeDataId--;
    if (this.activeDataId < 0) {
      this.activeDataId = this.dataIds[this.activeDatasetId].length - 1;
    }
    this.setChartActiveElements();
  };

  public goPreviousDataSet = this.goPrevious;

  public goHome = () => {
    this.activeDataId = 0;
    this.setChartActiveElements();
  };
}
