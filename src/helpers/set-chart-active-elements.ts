import type { ActiveDataPoint, Chart } from 'chart.js';

export const setChartActiveElements = (
  chart: Chart,
  activeElements: ActiveDataPoint[]
) => {
  chart.setActiveElements(activeElements);
  chart.tooltip?.setActiveElements(activeElements, { x: 0, y: 0 });
};
