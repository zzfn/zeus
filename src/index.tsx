import { createRoot } from 'react-dom/client';
import './global.less';
import { App } from './App';
import * as monitor from '@oc/monitor';

monitor.init();

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(<App />);
