import { createRoot } from 'react-dom/client';
import './global.less';
import { App } from './App';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
Sentry.init({
  dsn: 'https://796ebe79c256406985f271db79899ee7@o4503963265728512.ingest.sentry.io/4503963269988353',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
window.addEventListener('unhandledrejection', (e) => {
  console.log(e);
});
window.onerror = function (message, source, lineno, colno, error) {
  console.log(222, message, source, lineno, colno, error);
};
window.addEventListener(
  'error',
  function (e) {
    const target = e.target;
    if (target instanceof HTMLLinkElement) {
      console.log(`资源加载失败${target.href}`);
    } else if (target instanceof HTMLImageElement) {
      console.log(`图片资源加载失败${target.src}`);
    } else if (target instanceof HTMLScriptElement) {
      console.log(`资源加载失败${target.src}`);
    }
  },
  true,
);
const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(<App />);
