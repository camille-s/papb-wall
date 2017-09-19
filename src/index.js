import React from 'react';
import ReactDOM from 'react-dom';
import { csv, text } from 'd3-request';
import { queue } from 'd3-queue';
import * as _ from 'underscore';
import App from './App';
import { loadData } from './components/DataLoader';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import textUrl from './content/opening-text.md';
const dataUrl = './data/dash.csv';

// call loadData here & send data as props to App?
loadData((data) => {
    ReactDOM.render(<App {...data} />, document.getElementById('root'));
});


registerServiceWorker();
