import { Chart } from 'chart.js';
import { DataSetFirstNavigationStrategy } from './dataset-first-navigation-strategy';
import { isOnesetChart, setChartActiveElements } from '../helpers';

jest.mock('../helpers', () => {
  const original = jest.requireActual('../helpers');
  return {
    ...original,
    isOnesetChart: jest
      .fn()
      .mockImplementation((...args) => original.isOnesetChart(...args)),
    setChartActiveElements: jest.fn(),
  };
});

describe('DataSetFirstNavigationStrategy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const STANDART_META_DATA = [
    { type: 'bar', index: 0, data: [{}, {}, {}] },
    { type: 'bar', index: 1, data: [{}, {}, {}] },
    { type: 'bar', index: 2, data: [{}, {}, {}] },
  ];

  const ONESET_META_DATA = [
    { type: 'doughnut', index: 0, data: [{}, {}, {}] },
    { type: 'doughnut', index: 1, data: [{}, {}, {}] },
    { type: 'doughnut', index: 2, data: [{}, {}, {}] },
  ];

  const getSortedVisibleDatasetMetasSpy = jest
    .fn()
    .mockImplementation(() => STANDART_META_DATA);

  const getDataVisibilitySpy = jest.fn().mockImplementation(() => true);

  const chart = {
    getSortedVisibleDatasetMetas: getSortedVisibleDatasetMetasSpy,
    getDataVisibility: getDataVisibilitySpy,
  } as unknown as Chart;

  it('Should init strategy to default', () => {
    new DataSetFirstNavigationStrategy(chart);
    expect(isOnesetChart).toHaveBeenCalled();
    expect(getSortedVisibleDatasetMetasSpy).toHaveBeenCalled();
    expect(getDataVisibilitySpy).not.toHaveBeenCalled();
  });

  it('Should init strategy to oneset type', () => {
    const getSortedVisibleDatasetMetasSpy = jest
      .fn()
      .mockImplementation(() => ONESET_META_DATA);
    new DataSetFirstNavigationStrategy({
      ...chart,
      getSortedVisibleDatasetMetas: getSortedVisibleDatasetMetasSpy,
    } as unknown as Chart);
    expect(isOnesetChart).toHaveBeenCalled();
    expect(getSortedVisibleDatasetMetasSpy).toHaveBeenCalled();
    expect(getDataVisibilitySpy).toHaveBeenCalled();
  });

  it('Should init strategy to empty data and try to display active element', () => {
    const getSortedVisibleDatasetMetasSpy = jest
      .fn()
      .mockImplementation(() => []);
    const strategy = new DataSetFirstNavigationStrategy({
      ...chart,
      getSortedVisibleDatasetMetas: getSortedVisibleDatasetMetasSpy,
    } as unknown as Chart);
    expect(isOnesetChart).not.toHaveBeenCalled();
    expect(getSortedVisibleDatasetMetasSpy).toHaveBeenCalled();
    expect(getDataVisibilitySpy).not.toHaveBeenCalled();
    strategy.display();
    expect(setChartActiveElements).toHaveBeenCalledWith(expect.anything(), []);
  });

  it('Should hide active element', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.hide();
    expect(setChartActiveElements).toHaveBeenCalledWith(chart, []);
  });

  it('Should display active element', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.display();
    expect(setChartActiveElements).toHaveBeenCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
    ]);
  });

  it('Should validate hide/display workflow', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.goHome();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
    ]);
    strategy.hide();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, []);
    strategy.display();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
    ]);
  });

  it('Should validate goHome workflow', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.goEnd();
    strategy.goHome();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
    ]);
  });

  it('Should validate goEnd workflow', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.goEnd();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 2 },
    ]);
  });

  it('Should validate goNext workflow', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.goNext();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 1 },
    ]);
    strategy.goNext();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 2 },
    ]);
    strategy.goNext();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 1, datasetIndex: 0 },
    ]);
  });

  it('Should validate goPrevious workflow', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.goPrevious();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 2 },
    ]);
    strategy.goPrevious();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 1 },
    ]);
    strategy.goPrevious();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 0 },
    ]);
    strategy.goPrevious();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 1, datasetIndex: 2 },
    ]);
  });

  it('Should validate goNextDataSet workflow', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.goNextDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 1 },
    ]);
    strategy.goNextDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 2 },
    ]);
    strategy.goNextDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 1, datasetIndex: 0 },
    ]);
  });

  it('Should validate goPreviousDataSet workflow', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.goPreviousDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 2 },
    ]);
    strategy.goPreviousDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 1 },
    ]);
    strategy.goPreviousDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 0 },
    ]);
    strategy.goPreviousDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 1, datasetIndex: 2 },
    ]);
  });

  it('Should move to first element', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.goEnd();
    strategy.goNext();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
    ]);
  });

  it('Should move to end element', () => {
    const strategy = new DataSetFirstNavigationStrategy(chart);
    strategy.goHome();
    strategy.goPrevious();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 2 },
    ]);
  });
});
