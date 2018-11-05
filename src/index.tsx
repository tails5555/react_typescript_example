import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ApplicationRoot from './ApplicationRoot';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ApplicationRoot />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
