import type { TooltipItem, ChartType } from 'chart.js';

import { defaultPronunciationFormatter } from './default-pronunciation-formatter';

describe('defaultPronunciationFormatter', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should buld formatted string', () => {
    const consoleSpy = jest.spyOn(console, 'warn');
    expect(defaultPronunciationFormatter(data)).toBe('');
    expect(consoleSpy).toHaveBeenCalled();
  });
});
