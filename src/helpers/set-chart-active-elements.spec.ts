import { ActiveDataPoint, Chart } from 'chart.js';
import { setChartActiveElements } from './set-chart-active-elements';

describe('setChartActiveElements', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should change active element', () => {
    const setActiveElementsSpy = jest.fn();
    const setTooltipActiveElementsSpy = jest.fn();

    const chart = {
      setActiveElements: setActiveElementsSpy,
      tooltip: {
        setActiveElements: setTooltipActiveElementsSpy,
      },
    } as unknown as Chart;
    const activeElements: ActiveDataPoint[] = [];
    setChartActiveElements(chart, activeElements);
    expect(setActiveElementsSpy).toHaveBeenCalledWith(activeElements);
    expect(setTooltipActiveElementsSpy).toHaveBeenCalledWith(
      activeElements,
      expect.anything()
    );
  });
});
