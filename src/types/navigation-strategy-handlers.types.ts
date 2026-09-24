export type TNavigationStrategyHandlers = {
  refreshMeta: () => void;
  goEnd: () => void;
  goNext: () => void;
  goNextDataSet: () => void;
  goPrevious: () => void;
  goPreviousDataSet: () => void;
  goHome: () => void;
  hide: () => void;
  display: () => void;
};
