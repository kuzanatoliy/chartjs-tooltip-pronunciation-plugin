import type { Chart } from 'chart.js';
import {
  TNavigationDirection,
  type TChartjsKeyboardPluginEngineOptions,
  type TNavigationStrategyHandlers,
} from '../types';
import { NavigationDirection } from '../constants';

const NavigationKeys = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  SPACE: ' ',
};

const NavigationKeysSet = new Set([
  NavigationKeys.ARROW_LEFT,
  NavigationKeys.ARROW_UP,
  NavigationKeys.ARROW_RIGHT,
  NavigationKeys.ARROW_DOWN,
  NavigationKeys.HOME,
  NavigationKeys.END,
  NavigationKeys.ESCAPE,
  NavigationKeys.ENTER,
  NavigationKeys.SPACE,
]);

const DEFAULT_OPTIONS = {};

export class ChartjsKeyboardPluginEngine {
  private chart: Chart;
  private abortController = new AbortController();
  private strategy: TNavigationStrategyHandlers;
  private direction: TNavigationDirection;

  private initCanvas = () => {
    if (!this.chart.canvas.hasAttribute('tabIndex')) {
      this.chart.canvas.setAttribute('tabIndex', '0');
    }
  };

  private focusHandler = () => {
    this.strategy.refreshMeta();
    this.strategy.goHome();
    this.chart.update();
  };

  private blurHandler = () => {
    this.strategy.hide();
    this.chart.update();
  };

  private keydownHandler = (event: KeyboardEvent) => {
    if (NavigationKeysSet.has(event.key)) {
      event.stopPropagation();
      event.preventDefault();
    }
    switch (event.key) {
      case NavigationKeys.ARROW_LEFT:
        if (this.direction === NavigationDirection.LTR) {
          this.strategy.goPrevious();
        } else {
          this.strategy.goNext();
        }
        break;
      case NavigationKeys.ARROW_UP:
        this.strategy.goPreviousDataSet();
        break;
      case NavigationKeys.ARROW_RIGHT:
        if (this.direction === NavigationDirection.LTR) {
          this.strategy.goNext();
        } else {
          this.strategy.goPrevious();
        }
        break;
      case NavigationKeys.ARROW_DOWN:
        this.strategy.goNextDataSet();
        break;
      case NavigationKeys.HOME:
        this.strategy.goHome();
        break;
      case NavigationKeys.END:
        this.strategy.goEnd();
        break;
      case NavigationKeys.ESCAPE:
        this.strategy.hide();
        break;
      case NavigationKeys.ENTER:
      case NavigationKeys.SPACE:
        this.strategy.display();
        break;
    }
    this.chart.update();
  };

  constructor(
    chart: Chart,
    strategy: TNavigationStrategyHandlers,
    options: TChartjsKeyboardPluginEngineOptions = DEFAULT_OPTIONS
  ) {
    this.chart = chart;
    this.strategy = strategy;
    this.direction = options.direction || NavigationDirection.LTR;

    this.initCanvas();

    this.chart.canvas.addEventListener('focus', this.focusHandler, {
      signal: this.abortController.signal,
    });
    this.chart.canvas.addEventListener('blur', this.blurHandler, {
      signal: this.abortController.signal,
    });
    this.chart.canvas.addEventListener('keydown', this.keydownHandler, {
      signal: this.abortController.signal,
    });
  }

  public refresh() {
    this.strategy.refreshMeta();
    this.strategy.display();
  }

  public destroy() {
    this.abortController.abort();
  }
}
