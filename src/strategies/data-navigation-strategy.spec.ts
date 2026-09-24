import { Chart } from 'chart.js';
import { DataNavigationStrategy } from './data-navigation-strategy';
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

describe('DataNavigationStrategy', () => {
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
    new DataNavigationStrategy(chart);
    expect(isOnesetChart).toHaveBeenCalled();
    expect(getSortedVisibleDatasetMetasSpy).toHaveBeenCalled();
    expect(getDataVisibilitySpy).not.toHaveBeenCalled();
  });

  it('Should init strategy to oneset type', () => {
    const getSortedVisibleDatasetMetasSpy = jest
      .fn()
      .mockImplementation(() => ONESET_META_DATA);
    new DataNavigationStrategy({
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
    const strategy = new DataNavigationStrategy({
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
    const strategy = new DataNavigationStrategy(chart);
    strategy.hide();
    expect(setChartActiveElements).toHaveBeenCalledWith(chart, []);
  });

  it('Should display active element', () => {
    const strategy = new DataNavigationStrategy(chart);
    strategy.display();
    expect(setChartActiveElements).toHaveBeenCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
      { index: 0, datasetIndex: 1 },
      { index: 0, datasetIndex: 2 },
    ]);
  });

  it('Should validate hide/display workflow', () => {
    const strategy = new DataNavigationStrategy(chart);
    strategy.goHome();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
      { index: 0, datasetIndex: 1 },
      { index: 0, datasetIndex: 2 },
    ]);
    strategy.hide();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, []);
    strategy.display();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
      { index: 0, datasetIndex: 1 },
      { index: 0, datasetIndex: 2 },
    ]);
  });

  it('Should validate goHome workflow', () => {
    const strategy = new DataNavigationStrategy(chart);
    strategy.goEnd();
    strategy.goHome();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
      { index: 0, datasetIndex: 1 },
      { index: 0, datasetIndex: 2 },
    ]);
  });

  it('Should validate goEnd workflow', () => {
    const strategy = new DataNavigationStrategy(chart);
    strategy.goEnd();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 0 },
      { index: 2, datasetIndex: 1 },
      { index: 2, datasetIndex: 2 },
    ]);
  });

  it('Should validate goNext workflow', () => {
    const strategy = new DataNavigationStrategy(chart);
    strategy.goNext();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 1, datasetIndex: 0 },
      { index: 1, datasetIndex: 1 },
      { index: 1, datasetIndex: 2 },
    ]);
    strategy.goNext();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 0 },
      { index: 2, datasetIndex: 1 },
      { index: 2, datasetIndex: 2 },
    ]);
    strategy.goNext();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
      { index: 0, datasetIndex: 1 },
      { index: 0, datasetIndex: 2 },
    ]);
  });

  it('Should validate goPrevious workflow', () => {
    const strategy = new DataNavigationStrategy(chart);
    strategy.goPrevious();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 0 },
      { index: 2, datasetIndex: 1 },
      { index: 2, datasetIndex: 2 },
    ]);
    strategy.goPrevious();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 1, datasetIndex: 0 },
      { index: 1, datasetIndex: 1 },
      { index: 1, datasetIndex: 2 },
    ]);
    strategy.goPrevious();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
      { index: 0, datasetIndex: 1 },
      { index: 0, datasetIndex: 2 },
    ]);
  });

  it('Should validate goNextDataSet workflow', () => {
    const strategy = new DataNavigationStrategy(chart);
    strategy.goNextDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 1, datasetIndex: 0 },
      { index: 1, datasetIndex: 1 },
      { index: 1, datasetIndex: 2 },
    ]);
    strategy.goNextDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 0 },
      { index: 2, datasetIndex: 1 },
      { index: 2, datasetIndex: 2 },
    ]);
    strategy.goNextDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
      { index: 0, datasetIndex: 1 },
      { index: 0, datasetIndex: 2 },
    ]);
  });

  it('Should validate goPreviousDataSet workflow', () => {
    const strategy = new DataNavigationStrategy(chart);
    strategy.goPreviousDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 2, datasetIndex: 0 },
      { index: 2, datasetIndex: 1 },
      { index: 2, datasetIndex: 2 },
    ]);
    strategy.goPreviousDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 1, datasetIndex: 0 },
      { index: 1, datasetIndex: 1 },
      { index: 1, datasetIndex: 2 },
    ]);
    strategy.goPreviousDataSet();
    expect(setChartActiveElements).toHaveBeenLastCalledWith(chart, [
      { index: 0, datasetIndex: 0 },
      { index: 0, datasetIndex: 1 },
      { index: 0, datasetIndex: 2 },
    ]);
  });
});
