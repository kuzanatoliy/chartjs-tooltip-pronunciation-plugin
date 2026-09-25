/**
 * @jest-environment jsdom
 */

import type { TooltipItem, ChartType, Chart, ActiveElement } from 'chart.js';

import { ChartjsTooltipPronunciationPluginEngine } from './chartjs-tooltip-pronunciation-plugin-engine';

describe('defaultPronunciationFormatter', () => {
  const pronunciationFormatterSpy = jest.fn(() => 'test');
  const getActiveElementsSpy = jest.fn(() => [] as ActiveElement[]);

  const data = [
    {
      label: 'Jan',
      dataset: {
        label: 'Dataset 1',
      },
      formattedValue: '1,130',
    },
    {
      label: 'Jan',
      dataset: {
        label: 'Dataset 2',
      },
      formattedValue: '240',
    },
  ] as TooltipItem<ChartType>[];

  const chart = {
    tooltip: {
      getActiveElements: getActiveElementsSpy,
      dataPoints: [],
    },
  } as unknown as Chart;

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    //@ts-expect-error need to use mock clean canvas for each test case
    chart.canvas = document.createElement('canvas');
    chart.canvas.setAttribute('tabindex', '0');
    document.body.appendChild(chart.canvas);
  });

  it('Should buld formatted string', () => {
    expect(document.querySelectorAll('[role=status]').length).toBe(0);
    new ChartjsTooltipPronunciationPluginEngine(chart);
    expect(document.querySelectorAll('[role=status]').length).toBe(1);
  });

  it('Should destroy artifacts', () => {
    expect(document.querySelectorAll('[role=status]').length).toBe(0);
    const engine = new ChartjsTooltipPronunciationPluginEngine(chart);
    expect(document.querySelectorAll('[role=status]').length).toBe(1);
    engine.destroy();
    expect(document.querySelectorAll('[role=status]').length).toBe(0);
  });

  it('Should not call formatter', () => {
    expect(document.querySelectorAll('[role=status]').length).toBe(0);
    const engine = new ChartjsTooltipPronunciationPluginEngine(chart, {
      pronunciationFormatter: pronunciationFormatterSpy,
    });
    engine.pronunce();
    expect(document.querySelector('[role=status]')?.textContent).toBe('');
    expect(pronunciationFormatterSpy).not.toHaveBeenCalled();
    expect(getActiveElementsSpy).toHaveBeenCalled();
  });

  it('Should not be broken if tooltip not set up', () => {
    expect(document.querySelectorAll('[role=status]').length).toBe(0);
    const engine = new ChartjsTooltipPronunciationPluginEngine(
      { ...chart, tooltip: undefined } as unknown as Chart,
      {
        pronunciationFormatter: pronunciationFormatterSpy,
      }
    );
    engine.pronunce();
    expect(document.querySelector('[role=status]')?.textContent).toBe('');
    expect(pronunciationFormatterSpy).not.toHaveBeenCalled();
  });

  it('Should call formatter', () => {
    jest.useFakeTimers();
    expect(document.querySelectorAll('[role=status]').length).toBe(0);
    getActiveElementsSpy.mockImplementationOnce(
      () => [{ index: 0, datasetIndex: 0 } as ActiveElement] as ActiveElement[]
    );
    const engine = new ChartjsTooltipPronunciationPluginEngine(
      {
        ...chart,
        tooltip: {
          ...chart.tooltip,
          dataPoints: data,
        },
      } as unknown as Chart,
      {
        pronunciationFormatter: pronunciationFormatterSpy,
      }
    );
    engine.pronunce();
    jest.runAllTimers();
    expect(document.querySelector('[role=status]')?.textContent).not.toBe('');
    expect(pronunciationFormatterSpy).toHaveBeenCalledWith(data);
    jest.useRealTimers();
  });

  it('Should call formatter once', () => {
    jest.useFakeTimers();
    expect(document.querySelectorAll('[role=status]').length).toBe(0);
    getActiveElementsSpy.mockImplementation(
      () => [{ index: 0, datasetIndex: 0 } as ActiveElement] as ActiveElement[]
    );
    const engine = new ChartjsTooltipPronunciationPluginEngine(
      {
        ...chart,
        tooltip: {
          ...chart.tooltip,
          dataPoints: data,
        },
      } as unknown as Chart,
      {
        pronunciationFormatter: pronunciationFormatterSpy,
      }
    );
    engine.pronunce();
    jest.runAllTimers();
    engine.pronunce();
    jest.runAllTimers();
    expect(document.querySelector('[role=status]')?.textContent).not.toBe('');
    expect(pronunciationFormatterSpy).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
