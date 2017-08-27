import React, { Component } from 'react';
import { csv, text } from 'd3-request';
import { queue } from 'd3-queue';
import * as _ from 'underscore';
import ReactMarkdown from 'react-markdown';

// import Grid from './components/Grid';
import CaseGrid from './components/CaseGrid';
import CityForm from './components/CityForm';
// import Map from './components/Map';
import './App.css';

var masonryOpts = {
    // stagger: 50,
    transitionDuration: 0
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            initData: [],
            cities: [],
            city: '',
            order: 'byNewest',
            searchText: '',
            introTxt: ''
        };
    }

    componentDidMount() {
        let cmp = this;
        this.loadData(cmp);
        this.loadText(cmp);
    }

    loadText(component) {
        text(this.props.intro, function(txt) {
            component.setState({ introTxt: txt });
        });
    }

    setTextBlock(text) {
        console.log(text);
    }

    loadData(component) {
        queue()
            .defer(csv, this.props.dataUrl)
            // .defer(json, 'data/coordinates.geojson')
            // .await(function(error, datacsv, coordjson) {
            .await(function(error, datacsv) {
                if (error) { throw error; }
                console.log(datacsv);

                let cleaned = datacsv.filter(function(d) { return d.approved && d.approved.length; });
                cleaned.forEach(function(d) {
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
                        d.longstring = [ d.firstName, d.lastName, d.location, d.headline, d.pub, d.blurb, d.date ].join(' ').toLowerCase();
                });

                let sorted = _.sortBy(cleaned, 'date').reverse();

                let cities = _.chain(sorted)
                    .pluck('location')
                    .uniq()
                    .sort()
                    .value();

                component.setState({
                    initData: sorted,
                    data: sorted,
                    cities: cities
                });
            });
    }


    sortData(data, order) {
        let sorted;
        if (order === 'byNewest') {
            sorted = _.sortBy(data, 'date').reverse();
        } else if (order === 'byOldest') {
            sorted = _.sortBy(data, 'date');
        } else {
            sorted = _.sortBy(data, 'last_name');
        }
        return sorted;
    }

    filterData(data, city) {
        let filtered = city.length ? _.filter(data, function(d) { return d.location === city; }) : data;
        return filtered;
    }

    sortnFilter(city, order) {
        let sorted = this.sortData(this.state.initData, order);
        let filtered = this.filterData(sorted, city);
        return filtered;
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const city = name === 'city' ? value : this.state.city;
        const order = name === 'order' ? value : this.state.order;

        let filtered = this.sortnFilter(city, order);

        this.setState({
            city: city,
            order: order,
            data: filtered
        });
    }

    handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        console.log(query);
        let unfiltered = this.sortnFilter(this.state.city, this.state.order);

        let filtered = query.length ? _.filter(unfiltered, function(d) { return d.longstring.indexOf(query) !== -1; }) : unfiltered;
        this.setState({
            data: filtered
        });
    }

    render() {
        return (
            <div className="App">
                {/* <ReactMarkdown source={opening} /> */}
                <div className="container">
                    <div className="intro">
                        <ReactMarkdown source={this.state.introTxt} />
                    </div>
                </div>
                {/* <Map data={this.state.data}></Map> */}
                {/* <Select data={this.state.data} /> */}
                {/* <Grid data={this.state.data} /> */}
                <CityForm cities={this.state.cities}
                    city={this.state.city}
                    order={this.state.order}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                />
                {/* <Form2 data={this.state.data}></Form2> */}
                <CaseGrid data={this.state.data} masonryOpts={masonryOpts} />
            </div>
        );
    }

}

export default App;
