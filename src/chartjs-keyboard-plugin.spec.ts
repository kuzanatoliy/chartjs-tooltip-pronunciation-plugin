/**
 * @jest-environment jsdom
 */

import { Chart, ChartEvent } from 'chart.js';
import { chartjsKeyboardPlugin } from './chartjs-keyboard-plugin';
import { ChartjsKeyboardPluginEngine } from './engines';

const mockDestroy = jest.fn();
const mockRefresh = jest.fn();

jest.mock('./engines', () => {
  const original = jest.requireActual('./engines');

  return {
    ...original,
    ChartjsKeyboardPluginEngine: jest.fn().mockImplementation(function () {
      //@ts-expect-error mock destroy function
      this.destroy = mockDestroy;
      //@ts-expect-error mock refresh function
      this.refresh = mockRefresh;
    }),
  };
});

jest.mock('./strategies', () => {
  const original = jest.requireActual('./strategies');

  return {
    ...original,
    BalanceNavigationStrategy: function () {
      this.name = 'balance';
    },
    DataFirstNavigationStrategy: function () {
      this.name = 'data-first';
    },
    DataNavigationStrategy: function () {
      this.name = 'data';
    },
    DataSetFirstNavigationStrategy: function () {
      this.name = 'dataset-first';
    },
    DataSetNavigationStrategy: function () {
      this.name = 'dataset';
    },
  };
});

describe('chartjsKeyboardPlugin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const chart = {
    canvas: {},
  } as unknown as Chart;

  it.each`
    strategy
    ${'data'}
    ${'dataset'}
    ${'data-first'}
    ${'dataset-first'}
    ${'balance'}
  `('Should init plugin with $Constructor', ({ strategy }) => {
    chartjsKeyboardPlugin.afterInit!(chart, {}, { strategy });
    expect(ChartjsKeyboardPluginEngine).toHaveBeenCalledWith(
      chart,
      expect.objectContaining({
        name: strategy,
      }),
      expect.any(Object)
    );
  });

  it('Should init page with balance strategy by default', () => {
    chartjsKeyboardPlugin.afterInit!(chart, {}, {});
    expect(ChartjsKeyboardPluginEngine).toHaveBeenCalledWith(
      chart,
      {
        name: 'balance',
      },
      expect.any(Object)
    );
  });

  it('Should destroy chart', () => {
    chartjsKeyboardPlugin.afterInit!(chart, {}, {});
    chartjsKeyboardPlugin.afterDestroy!(chart, {}, {});
    expect(mockDestroy).toHaveBeenCalled();
  });

  it('Should not call refressh if chart canvas not active element', () => {
    chartjsKeyboardPlugin.afterInit!(chart, {}, {});
    chartjsKeyboardPlugin.afterEvent!(
      chart,
      {
        event: { type: 'hover' } as unknown as ChartEvent,
        replay: false,
        cancelable: false,
        inChartArea: false,
      },
      {}
    );
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it('Should not call refressh if event type is not click', () => {
    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(chart.canvas);
    chartjsKeyboardPlugin.afterInit!(chart, {}, {});
    chartjsKeyboardPlugin.afterEvent!(
      chart,
      {
        event: { type: 'hover' } as unknown as ChartEvent,
        replay: false,
        cancelable: false,
        inChartArea: false,
      },
      {}
    );
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it('Should call refressh if event type is not click', () => {
    jest.spyOn(document, 'activeElement', 'get').mockReturnValue(chart.canvas);
    chartjsKeyboardPlugin.afterInit!(chart, {}, {});
    chartjsKeyboardPlugin.afterEvent!(
      chart,
      {
        event: { type: 'click' } as unknown as ChartEvent,
        replay: false,
        cancelable: false,
        inChartArea: false,
      },
      {}
    );
    expect(mockRefresh).toHaveBeenCalled();
  });
});
