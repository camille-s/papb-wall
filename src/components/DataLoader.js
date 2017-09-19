// data handler -- from react d3 book
import { csv, text } from 'd3-request';
import { queue } from 'd3-queue';
import * as _ from 'underscore';

import textUrl from '../content/opening-text.md';

const dataUrl = '../data/dash.csv';

// export
// export const loadData = (dataUrl, textUrl, callback = _.noop) => {
export const loadData = (callback = _.noop) => {
    queue()
        .defer(csv, dataUrl)
        .defer(text, textUrl)
        .await(function(error, datacsv, intro) {
            if (error) throw error;

            let data = cleanData(datacsv);
            let cities = makeCities(data);

            callback({
                initData: data,
                cities: cities,
                intro: intro
            });
        });
};






const splitLinks = (d) => {
    let linkset = _.zip(
            d.headline.split(';'),
            d.link.split(';'),
            d.pub.split(';')
        ).map(function(l) {
            return { headline: l[0], link: l[1], pub: l[2] };
        });
    return linkset;
};

const cleanData = (data) => {
    return _.chain(data)
        .filter((d) => d.approved && d.approved.length)
        .map((d) => {
            let datestring = `${d.month}/${d.day}/${d.year}`;
            let date = new Date(datestring);
            let longstring = concatString([ d.firstName, d.lastName, d.department, d.headline, d.pub, d.blurb, d.datestring, d.officer, d.outcome ]);

            return {
                firstName: d.firstName,
                lastName: d.lastName,
                age: d.age,
                datestring: datestring,
                date: date,
                linkset: splitLinks(d),
                department: d.department.trim(),
                officer: d.officer,
                photo: d.photo,
                outcome: d.outcome,
                longstring: longstring,
                blurb: d.blurb
            };
        }).sortBy('date')
        .reverse()
        .value();
};

const concatString = (arr) => arr.join(' ').toLowerCase();

const makeCities = (data) => {
    return _.chain(data)
        .pluck('department')
        .uniq()
        .sort()
        .value();
};
