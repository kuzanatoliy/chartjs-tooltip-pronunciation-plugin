# chartjs-keyboard-plugin

[![npm version](https://img.shields.io/npm/v/@kuzanatoliorg/chartjs-keyboard-plugin)](https://www.npmjs.com/package/@kuzanatoliorg/chartjs-keyboard-plugin) [![npm downloads](https://img.shields.io/npm/dm/@kuzanatoliorg/chartjs-keyboard-plugin)](https://www.npmjs.com/package/@kuzanatoliorg/chartjs-keyboard-plugin) [![License](https://img.shields.io/github/license/kuzanatoliy/chartjs-keyboard-plugin)](https://github.com/kuzanatoliy/chartjs-keyboard-plugin/blob/main/LICENSE)

[![GitHub stars](https://img.shields.io/github/stars/kuzanatoliy/chartjs-keyboard-plugin)](https://github.com/kuzanatoliy/chartjs-keyboard-plugin/stargazers) [![GitHub issues](https://img.shields.io/github/issues/kuzanatoliy/chartjs-keyboard-plugin)](https://github.com/kuzanatoliy/chartjs-keyboard-plugin/issues)

An accessibility-focused **Chart.js plugin that implements seamless keyboard navigation** for interactive data charts. Perfect for improving web accessibility (a11y), satisfying compliance guidelines, and elevating dashboard user experiences.

🚀 **[Try the Interactive Demo](https://kuzanatoliy.github.io/chartjs-demo/)** | 📺 **[Watch the Video Walkthrough](https://www.youtube.com/watch?v=rJHDyqld9X8)**

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Vanilla Chart.js Execution](#vanilla-chartjs-execution)
  - [React Framework Integration](#react-framework-integration-react-chartjs-2)
  - [Canvas Focus & Accessibility](#canvas-focus--accessibility)
- [Keyboard Mappings](#keyboard-mappings)
- [Configuration Options](#configuration-options)
  - [Navigation Strategies Breakdown](#navigation-strategies-breakdown)
- [TypeScript Definitions](#typescript-definitions)

---

## Features

- ♿ **a11y Compliant:** Empowers keyboard-only users to navigate canvas data.
- 🗺️ **5 Navigation Strategies:** Tailor how focus states shift across data sets and items.
- 🌍 **RTL Support:** Native right-to-left layout configuration for internationalized applications.
- 📦 **Zero-Config Starter:** Registers instantly with vanilla projects or React wrapper frameworks.

---

## Installation

### npm

```bash
npm install @kuzanatoliorg/chartjs-keyboard-plugin
```

### yarn

```bash
yarn add @kuzanatoliorg/chartjs-keyboard-plugin
```

### pnpm

```bash
pnpm add @kuzanatoliorg/chartjs-keyboard-plugin
```

---

## Getting Started

To enable keyboard navigation, you need to register the plugin with [Chart.js](https://chartjs.org). Once registered, the plugin will automatically add comprehensive keyboard support to your charts.

### Vanilla Chart.js Execution

Register the plugin globally in your application:

```javascript
import Chart from 'chart.js/auto';
import { chartjsKeyboardPlugin } from '@kuzanatoliorg/chartjs-keyboard-plugin';

Chart.register(chartjsKeyboardPlugin);
```

Or you can register the plugin for a specific chart instance:

```javascript
import Chart from 'chart.js/auto';
import { chartjsKeyboardPlugin } from '@kuzanatoliorg/chartjs-keyboard-plugin';

const chart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    plugins: [chartjsKeyboardPlugin]
});
```

### React Framework Integration (`react-chartjs-2`)

For React applications using `react-chartjs-2`, register the plugin globally with `ChartJS`:

```javascript
import { Chart as ChartJS } from 'chart.js';
import { chartjsKeyboardPlugin } from '@kuzanatoliorg/chartjs-keyboard-plugin';

ChartJS.register(chartjsKeyboardPlugin);
```

Or you can register the plugin for a specific chart component:

```javascript
import { Bar } from 'react-chartjs-2';
import { chartjsKeyboardPlugin } from '@kuzanatoliorg/chartjs-keyboard-plugin';

function MyChart() {
  return (
    <Bar
      data={data}
      options={options}
      plugins={[chartjsKeyboardPlugin]}
    />
  );
}
```

### Canvas Focus & Accessibility

For keyboard navigation to work, the HTML5 `<canvas>` element must be focusable so it can capture keydown events.

- **Automated Setup:** If your `<canvas>` element lacks a `tabindex` attribute, **the plugin will automatically inject `tabindex="0"`** upon initialization. This allows users to instantly navigate to the chart container via the `Tab` key.

* **Custom Control:** If you prefer manual layout orchestration or want to exclude the chart from a specific tab order sequence, you can pre-define any valid `tabindex` (e.g., `<canvas tabindex="1">` or `tabindex="-1"`) directly in your HTML structure, and the plugin will respect your custom configuration without overriding it.

> **💡 Compatibility Note:** Fully tested and optimized for **Chart.js `3.x`** and **`4.x+`** frameworks.

---

## Keyboard Mappings

The plugin supports the following keys for navigating the chart UI (behavior may vary slightly depending on the active strategy):

| Input Command | Action & Behavioral Mapping |
| :-- | :-- |
| `Arrow Left` | Focus previous item _(Reversed in RTL mode)_ |
| `Arrow Right` | Focus next item _(Reversed in RTL mode)_ |
| `Arrow Up` | Focus previous item _(Moves to previous dataset in `balance` strategy)_ |
| `Arrow Down` | Focus next item _(Moves to next dataset in `balance` strategy)_ |
| `Home` | Instantly jump focus to the first available data node |
| `End` | Instantly jump focus to the final available data node |
| `Enter` / `Space` | Selects active node and triggers tooltip display |
| `Escape` | Dismisses focus state and hides active tooltip window |

---

## Configuration Options

Fine-tune keyboard targeting behaviors via the main `chartjsKeyboardPlugin` configuration envelope:

```javascript
const chart = new Chart(ctx, {
    options: {
        plugins: {
            chartjsKeyboardPlugin: {
                // Select navigation mechanic: 'balance' (default) | 'data-first' | 'dataset-first' | 'data' | 'dataset'
                strategy: 'balance',
                // Interface text layout flow: 'ltr' (default) | 'rtl'
                direction: 'ltr'
            },
        }
    }
});
```

### Navigation Strategies Breakdown

- **`balance` _(Default)_**: `Up`/`Down` transitions across distinct datasets; `Left`/`Right` navigates item nodes inside the active set.
- **`data-first`**: Step item-by-item through an individual dataset; automatically shifts to flanking datasets upon reaching endpoints.
- **`dataset-first`**: Step dataset-by-dataset vertically; increments to adjacent index data items on edge boundaries.
- **`data`**: Highlights matching indexes globally across all unified datasets simultaneously.
- **`dataset`**: Isolates navigation targeting strictly to items contained within the highlighted dataset.

---

## TypeScript Definitions

Extend your environment types smoothly. Place a `global.d.ts` file within your source directory structures:

```typescript
import { ChartType } from 'chart.js';
import { type TChartjsKeyboardPluginOptions } from '@kuzanatoliorg/chartjs-keyboard-plugin';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    chartjsKeyboardPlugin?: TChartjsKeyboardPluginOptions;
  }
}
```
