import React, { Component } from 'react';
import { csv } from 'd3-request';
import * as _ from 'underscore';

// import Grid from './components/Grid';
import CaseGrid from './components/CaseGrid';
import CityForm from './components/CityForm';
// import Form2 from './components/Form2';
// import Select from './components/Select';
import './App.css';
// var initData;
var masonryOpts = {
    stagger: 50,
    transitionDuration: 200
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
            searchText: ''
        };
    }

    componentDidMount() {
        this.loadRawData();
        // this.sortData();
        // let cityOpts = this.state.cities;
        // cityOpts.unshift('Show all');
        // console.log(cityOpts);
    }

    loadRawData() {
        csv(this.props.url)
            .get((error, csv) => {
                if (error) throw error;
                // let filtered = _.filter(csv, function(d) { return d.approved.length; });
                let cleaned = csv.filter(function(d) { return d.approved.length; });
                cleaned.forEach(function(d) {
                        // d.datestring = `${d.year}-${d.month}-${d.day}`;
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
                        d.longstring = [ d.first_name, d.last_name, d.location, d.headline, d.pub ].join(' ');
                });

                let sorted = _.sortBy(cleaned, 'date').reverse();

                let cities = _.chain(sorted)
                    .pluck('location')
                    .uniq()
                    .sort()
                    .value();



                this.setState({
                    initData: sorted,
                    data: sorted,
                    cities: cities
                });
                // initData = cleaned;
                // this.sortData();
            });
    }

    sortData(data, order) {
        // let data = this.state.data;
        // let order = this.state.order;

        let sorted;
        if (order === 'byNewest') {
            sorted = _.sortBy(data, 'date').reverse();
        } else if (order === 'byOldest') {
            sorted = _.sortBy(data, 'date');
        } else {
            sorted = _.sortBy(data, 'last_name');
        }
        console.log(sorted);
        return sorted;
    }

    filterData(data, city) {
        // let data = this.state.data;
        // let city = this.state.city;
        let filtered = city.length ? _.filter(data, function(d) { return d.location === city; }) : data;
        return filtered;
    }

    sortnFilter(city, order) {
        // let city = this.state.city;
        // let order = this.state.order;
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
        const query = e.target.value;
        console.log(query);
        let data = this.state.initData;

        let filtered = query.length ? _.filter(data, function(d) { return d.longstring.indexOf(query) !== -1; }) : data;
        this.setState({
            data: filtered
        });
    }

    render() {

        return (
            <div className="App">
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
