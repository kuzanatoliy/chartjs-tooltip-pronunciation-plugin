/**
 * @jest-environment jsdom
 */

import { Chart } from 'chart.js';
import { chartjsTooltipPronunciationPlugin } from './chartjs-tooltip-pronunciation-plugin';
import { ChartjsTooltipPronunciationPluginEngine } from './engines';

const mockDestroy = jest.fn();
const mockPronunce = jest.fn();

jest.mock('./engines', () => {
  const original = jest.requireActual('./engines');

  return {
    ...original,
    ChartjsTooltipPronunciationPluginEngine: jest
      .fn()
      .mockImplementation(function () {
        //@ts-expect-error mock destroy function
        this.pronunce = mockPronunce;
        //@ts-expect-error mock destroy function
        this.destroy = mockDestroy;
      }),
  };
});

describe('chartjsTooltipPronunciationPlugin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const chart = {
    canvas: {},
  } as unknown as Chart;

  it('Should init plugin', () => {
    chartjsTooltipPronunciationPlugin.afterInit!(chart, {}, {});
    expect(ChartjsTooltipPronunciationPluginEngine).toHaveBeenCalledWith(
      chart,
      expect.any(Object)
    );
  });

  it('Should destroy chart', () => {
    chartjsTooltipPronunciationPlugin.afterInit!(chart, {}, {});
    chartjsTooltipPronunciationPlugin.beforeDestroy!(chart, {}, {});
    chartjsTooltipPronunciationPlugin.afterDestroy!(chart, {}, {});
    expect(mockDestroy).toHaveBeenCalled();
  });

  it('Should call pronunce', () => {
    chartjsTooltipPronunciationPlugin.afterInit!(chart, {}, {});
    //@ts-expect-error the hook uses only chart property
    chartjsTooltipPronunciationPlugin.afterTooltipDraw!(chart, {}, {});
    expect(mockPronunce).toHaveBeenCalled();
  });
});
