import { NavigationStrategy } from './navigation-strategy';

export class BalanceNavigationStrategy extends NavigationStrategy {
  public goEnd = () => {
    this.activeDatasetId = this.datasetIds.length - 1;
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

  public goNextDataSet = () => {
    this.activeDatasetId++;
    if (this.activeDatasetId === this.datasetIds.length) {
      this.activeDatasetId = 0;
    }
    this.setChartActiveElements();
  };

  public goPrevious = () => {
    this.activeDataId--;
    if (this.activeDataId < 0) {
      this.activeDataId = this.dataIds[this.activeDatasetId].length - 1;
    }
    this.setChartActiveElements();
  };

  public goPreviousDataSet = () => {
    this.activeDatasetId--;
    if (this.activeDatasetId < 0) {
      this.activeDatasetId = this.datasetIds.length - 1;
    }
    this.setChartActiveElements();
  };

  public goHome = () => {
    this.activeDatasetId = 0;
    this.activeDataId = 0;
    this.setChartActiveElements();
  };
}
