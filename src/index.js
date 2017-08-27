import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import url from './content/opening-text.md';


ReactDOM.render(<App dataUrl="data/dash.csv" intro={url} />, document.getElementById('root'));
registerServiceWorker();
