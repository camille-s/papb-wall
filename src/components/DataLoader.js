// data handler -- from react d3 book
import { csv, text } from 'd3-request';
import { queue } from 'd3-queue';
import { format } from 'd3-format';
import * as _ from 'underscore';

import textUrl from '../content/opening-text.md';

const dataUrl = '../data/dash.csv';

export const loadData = (callback = _.noop) => {
    queue()
        .defer(csv, dataUrl)
        .defer(text, textUrl)
        .await(function(error, datacsv, intro) {
            if (error) throw error;

            let data = cleanData(datacsv);
            let cities = makeCities(data);
			let officers = makeOfficers(data);

            callback({
                initData: data,
                cities: cities,
                officers: officers,
                intro: intro
            });
        });
};



const pad = (s) => format('02')(s);

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

const splitnSort = (d) => {
    return d.split(',')
        .map((d) => d.trim())
        .filter((d) => d.length)
        .sort();
};

const cleanData = (data) => {
    return _.chain(data)
        .filter((d) => d.approved && d.approved.length)
        .map((d) => {
            let datestring = `${pad(d.month)}/${pad(d.day)}/${d.year}`;
            let date = new Date(datestring);

            let survived = d.survived ? d.survived.replace('y', 'survived').replace('n', 'did not survive') : null;
            let video = d.video ? 'video' : null;
            let chase = d.carChase ? 'car chase' : null;
            let shot = d.shot ? 'shot by officer' : null;
            let tags = _.filter([ survived, chase, shot, video ], (tag) => tag );

			let officers = _.chain(splitnSort(d.officer))
                .map((d) => {
                    let names = d.split(' ', 2);
                    return { name: d, last: names[1] };
                })
                .sortBy('last')
                .pluck('name')
                .value();

			let longstring = concatString([ d.firstName, d.lastName, d.department, d.headline, d.pub, d.blurb, d.datestring, officers.join(' '), d.outcome, tags.join(' ') ]);

            return {
                firstName: d.firstName.trim(),
                lastName: d.lastName.trim(),
                age: d.age,
                datestring: datestring,
                date: date,
                linkset: splitLinks(d),
                department: d.department.trim(),
                officers: officers,
                photo: d.photo,
                outcome: d.outcome,
                longstring: longstring,
                blurb: d.blurb,
                tags: tags
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

const makeOfficers = (data) => {
    return _.chain(data)
        .pluck('officers')
        .flatten()
        .uniq()
        .map((d) => {
            let names = d.split(' ', 2);
            return { name: d, last: names[1] };
        })
        .sortBy('last')
        .pluck('name')
        .value();
}
