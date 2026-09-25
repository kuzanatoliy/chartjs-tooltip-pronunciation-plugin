# chartjs-tooltip-pronunciation-plugin

[![npm version](https://img.shields.io/npm/v/@kuzanatoliorg/chartjs-tooltip-pronunciation-plugin)](https://www.npmjs.com/package/@kuzanatoliorg/chartjs-tooltip-pronunciation-plugin) [![npm downloads](https://img.shields.io/npm/dm/@kuzanatoliorg/chartjs-tooltip-pronunciation-plugin)](https://www.npmjs.com/package/@kuzanatoliorg/chartjs-tooltip-pronunciation-plugin) [![License](https://img.shields.io/github/license/kuzanatoliy/chartjs-tooltip-pronunciation-plugin)](https://github.com/kuzanatoliy/chartjs-tooltip-pronunciation-plugin/blob/main/LICENSE)

[![GitHub stars](https://img.shields.io/github/stars/kuzanatoliy/chartjs-tooltip-pronunciation-plugin)](https://github.com/kuzanatoliy/chartjs-tooltip-pronunciation-plugin/stargazers) [![GitHub issues](https://img.shields.io/github/issues/kuzanatoliy/chartjs-tooltip-pronunciation-plugin)](https://github.com/kuzanatoliy/chartjs-tooltip-pronunciation-plugin/issues)

An accessibility-focused **Chart.js plugin that bridges the gap for screen reader users** by automatically pronouncing tooltip content. Since native Chart.js tooltips are drawn purely visually on the `<canvas>` element, they are completely invisible to screen readers (like NVDA, VoiceOver, JAWS). This plugin fixes that by dynamically injecting the active tooltip's data into a visually hidden ARIA live region (`role="status"`), ensuring the data is seamlessly read aloud to assistive technology users and helping your dashboards achieve **WCAG compliance**.

🚀 **[Try the Interactive Demo](https://kuzanatoliy.github.io/chartjs-demo/)** | 📺 **[Watch the Video Walkthrough](https://youtu.be/oreFQl_IjDM)**

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Vanilla Chart.js Execution](#vanilla-chartjs-execution)
  - [React Framework Integration](#react-framework-integration-react-chartjs-2)
- [Configuration Options](#configuration-options)
- [TypeScript Definitions](#typescript-definitions)

---

## Features

- ♿ **a11y Compliant:** Empowers screen reader users to understand interactive chart data and aids in WCAG 2.1 / ADA compliance.
- 🗣️ **Seamless Pronunciation:** Automatically updates an ARIA live region when the active tooltip changes.
- ⚙️ **Fully Customizable:** Exposes a simple `pronunciationFormatter` function to precisely format the spoken string, ensuring perfect localization and semantic meaning.
- 📦 **Framework Agnostic:** Works smoothly with Vanilla JS or React wrapper frameworks.

---

## Installation

### npm

```bash
npm install @kuzanatoliorg/chartjs-tooltip-pronunciation-plugin
```

### yarn

```bash
yarn add @kuzanatoliorg/chartjs-tooltip-pronunciation-plugin
```

### pnpm

```bash
pnpm add @kuzanatoliorg/chartjs-tooltip-pronunciation-plugin
```

---

## Getting Started

To enable screen reader support for tooltips, you need to register the plugin with [Chart.js](https://chartjs.org) and provide a `pronunciationFormatter` configuration option.

### Vanilla Chart.js Execution

Register the plugin globally or per chart instance:

```javascript
import Chart from 'chart.js/auto';
import { chartjsTooltipPronunciationPlugin } from '@kuzanatoliorg/chartjs-tooltip-pronunciation-plugin';

const chart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
        plugins: {
            chartjsTooltipPronunciationPlugin: {
                // REQUIRED: Construct the text to be announced by the screen reader.
                // (`tooltipItems` is an array of standard Chart.js TooltipItem objects)
                pronunciationFormatter: (tooltipItems) => {
                    return tooltipItems
                        .map(item => `${item.dataset.label}: ${item.formattedValue}`)
                        .join(', ');
                }
            }
        }
    },
    plugins: [chartjsTooltipPronunciationPlugin]
});
```

### React Framework Integration (`react-chartjs-2`)

For React applications using `react-chartjs-2`, you can pass the plugin in the `plugins` array and provide the formatter in `options`:

```javascript
import { Bar } from 'react-chartjs-2';
import { chartjsTooltipPronunciationPlugin } from '@kuzanatoliorg/chartjs-tooltip-pronunciation-plugin';

function MyChart() {
  const options = {
    plugins: {
      chartjsTooltipPronunciationPlugin: {
        pronunciationFormatter: (tooltipItems) => {
          return tooltipItems
            .map(item => `${item.dataset.label}: ${item.formattedValue}`)
            .join(', ');
        }
      }
    }
  };

  return (
    <Bar
      data={data}
      options={options}
      plugins={[chartjsTooltipPronunciationPlugin]}
    />
  );
}
```

---

## Configuration Options

Fine-tune how the tooltip is pronounced via the main `chartjsTooltipPronunciationPlugin` configuration envelope:

```javascript
const chart = new Chart(ctx, {
    options: {
        plugins: {
            chartjsTooltipPronunciationPlugin: {
                /**
                 * (Required) Function that takes the active Chart.js TooltipItems and
                 * returns a string to be pronounced by the screen reader.
                 * (`tooltipItems` is an array of standard Chart.js TooltipItem objects)
                 *
                 * By default, a console warning is emitted if this is not provided.
                 */
                pronunciationFormatter: (tooltipItems) => {
                    // Example formatting: "Sales: $500, Expenses: $300"
                    return tooltipItems
                        .map(item => `${item.dataset.label}: ${item.formattedValue}`)
                        .join(', ');
                }
            },
        }
    }
});
```

---

## TypeScript Definitions

Extend your environment types smoothly if you're using TypeScript. Place a `global.d.ts` file within your source directory structure:

```typescript
import { ChartType } from 'chart.js';
import { type TChartjsTooltipPronunciationPluginOptions } from '@kuzanatoliorg/chartjs-tooltip-pronunciation-plugin';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    chartjsTooltipPronunciationPlugin?: TChartjsTooltipPronunciationPluginOptions;
  }
}
```
