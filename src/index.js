import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { loadData } from './components/DataLoader';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// call loadData here & send data as props to App
loadData((data) => {
    ReactDOM.render(<App {...data} />, document.getElementById('root'));
});


registerServiceWorker();
