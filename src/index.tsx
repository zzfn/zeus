import { createRoot } from 'react-dom/client';
import './global.css';
import { App } from './App';
import 'dayjs/locale/zh-cn';
import * as monitor from '@oc/monitor';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

monitor.init();

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(<App />);
