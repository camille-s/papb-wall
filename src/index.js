import React from 'react';
import ReactDOM from 'react-dom';
import { csv, text } from 'd3-request';
import { queue } from 'd3-queue';
import * as _ from 'underscore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import openingUrl from './content/opening-text.md';

const dataUrl = 'data/dash.csv';

queue()
    .defer(csv, dataUrl)
    .defer(text, openingUrl)
    .await(function(error, datacsv, opening) {
        if (error) throw error;

        let cleaned = _.filter(datacsv, (d) => d.approved && d.approved.length);

        cleaned.forEach((d) => {
            d.datestring = `${d.month}/${d.day}/${d.year}`;
            d.date = new Date(d.datestring);
            d.linkset = _.zip(
                    d.headline.split(';'),
                    d.link.split(';'),
                    d.pub.split(';')
                ).map(function(l) {
                    return { headline: l[0], link: l[1], pub: l[2] };
                });
            d.location = d.location.trim();
            d.longstring = [ d.firstName, d.lastName, d.location, d.headline, d.pub, d.blurb, d.datestring ]
                .join(' ')
                .toLowerCase();
        });
        let sorted = _.sortBy(cleaned, 'date').reverse();

        let cities = _.chain(sorted)
            .pluck('location')
            .uniq()
            .sort()
            .value();

        ReactDOM.render(<App intro={opening} initData={sorted} cities={cities} />, document.getElementById('root'));
        registerServiceWorker();

    });
