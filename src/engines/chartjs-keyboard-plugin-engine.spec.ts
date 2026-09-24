/**
 * @jest-environment jsdom
 */

import { Chart } from 'chart.js';
import { NavigationDirection } from '../constants';
import { ChartjsKeyboardPluginEngine } from './chartjs-keyboard-plugin-engine';
import { TNavigationStrategyHandlers } from '../types/navigation-strategy-handlers.types';

describe('ChartjsKeyboardPluginEngine', () => {
  const updateSpy = jest.fn();

  const chart = {
    update: updateSpy,
  } as unknown as Chart;

  const hideSpy = jest.fn();
  const displaySpy = jest.fn();
  const refreshMetaSpy = jest.fn();
  const goHomeSpy = jest.fn();
  const goEndSpy = jest.fn();
  const goNextSpy = jest.fn();
  const goNextDataSetSpy = jest.fn();
  const goPreviousSpy = jest.fn();
  const goPreviousDataSetSpy = jest.fn();

  const strategy = {
    hide: hideSpy,
    display: displaySpy,
    refreshMeta: refreshMetaSpy,
    goHome: goHomeSpy,
    goEnd: goEndSpy,
    goNext: goNextSpy,
    goNextDataSet: goNextDataSetSpy,
    goPrevious: goPreviousSpy,
    goPreviousDataSet: goPreviousDataSetSpy,
  } as unknown as TNavigationStrategyHandlers;

  beforeEach(() => {
    jest.clearAllMocks();
    //@ts-expect-error need to use mock clean canvas for each test case
    chart.canvas = document.createElement('canvas');
    chart.canvas.setAttribute('tabindex', '0');
    document.body.appendChild(chart.canvas);
  });

  it('Should add tabindex attribute if it not specify', () => {
    chart.canvas.removeAttribute('tabindex');
    expect(chart.canvas.hasAttribute('tabindex')).toBeFalsy();
    new ChartjsKeyboardPluginEngine(chart, strategy);
    expect(chart.canvas.hasAttribute('tabindex')).toBeTruthy();
  });

  it('Should refresh and go home to get focus', () => {
    new ChartjsKeyboardPluginEngine(chart, strategy);
    chart.canvas.focus();
    expect(refreshMetaSpy).toHaveBeenCalled();
    expect(goHomeSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
  });

  it('Should hide tooltip to lose focus', () => {
    new ChartjsKeyboardPluginEngine(chart, strategy);
    chart.canvas.focus();
    chart.canvas.blur();
    expect(hideSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
  });

  it.each`
    eventKey        | handler
    ${'ArrowLeft'}  | ${goPreviousSpy}
    ${'ArrowUp'}    | ${goPreviousDataSetSpy}
    ${'ArrowRight'} | ${goNextSpy}
    ${'ArrowDown'}  | ${goNextDataSetSpy}
    ${'Home'}       | ${goHomeSpy}
    ${'End'}        | ${goEndSpy}
    ${'Escape'}     | ${hideSpy}
    ${'Enter'}      | ${displaySpy}
    ${' '}          | ${displaySpy}
  `('Should trigger $event and call operation', ({ eventKey, handler }) => {
    new ChartjsKeyboardPluginEngine(chart, strategy);
    const event = new KeyboardEvent('keydown', {
      key: eventKey,
      code: eventKey,
      bubbles: true,
    });
    chart.canvas.dispatchEvent(event);
    expect(handler).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
  });

  it.each`
    eventKey        | handler
    ${'ArrowLeft'}  | ${goNextSpy}
    ${'ArrowRight'} | ${goPreviousSpy}
  `(
    'Should trigger $event and call operation in rtl',
    ({ eventKey, handler }) => {
      new ChartjsKeyboardPluginEngine(chart, strategy, {
        direction: NavigationDirection.RTL,
      });
      const event = new KeyboardEvent('keydown', {
        key: eventKey,
        code: eventKey,
        bubbles: true,
      });
      chart.canvas.dispatchEvent(event);
      expect(handler).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalled();
    }
  );

  it('Should not trigger action', () => {
    new ChartjsKeyboardPluginEngine(chart, strategy);
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      code: 'Tab',
      bubbles: true,
    });
    chart.canvas.dispatchEvent(event);
    expect(goPreviousSpy).not.toHaveBeenCalled();
    expect(goPreviousDataSetSpy).not.toHaveBeenCalled();
    expect(goNextSpy).not.toHaveBeenCalled();
    expect(goNextDataSetSpy).not.toHaveBeenCalled();
    expect(goHomeSpy).not.toHaveBeenCalled();
    expect(goEndSpy).not.toHaveBeenCalled();
    expect(hideSpy).not.toHaveBeenCalled();
    expect(displaySpy).not.toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
  });

  it('Should refresh', () => {
    const engine = new ChartjsKeyboardPluginEngine(chart, strategy);
    engine.refresh();
    expect(displaySpy).toHaveBeenCalled();
    expect(refreshMetaSpy).toHaveBeenCalled();
  });

  it('Should destroy', () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
    const engine = new ChartjsKeyboardPluginEngine(chart, strategy);
    engine.destroy();
    expect(abortSpy).toHaveBeenCalled();
  });
});
