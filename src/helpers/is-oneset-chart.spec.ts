import { isOnesetChart } from './is-oneset-chart';

describe('isOnesetChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    type           | result
    ${'doughnut'}  | ${true}
    ${'pie'}       | ${true}
    ${'polarArea'} | ${true}
    ${'unknown'}   | ${false}
  `(`Should validate type $type`, ({ type, result }) => {
    expect(isOnesetChart(type)).toBe(result);
  });
});
