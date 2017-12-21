import React from 'react';
import * as _ from 'underscore';
import ReactMarkdown from 'react-markdown';
import { createFilter } from 'react-search-input';

import CaseGrid from './components/CaseGrid';
import CityForm from './components/CityForm';

import './App.css';

const masonryOpts = {
    // stagger?
    transitionDuration: 0
};
const searchKeys = [ 'firstName', 'lastName', 'department', 'headline', 'pub', 'blurb', 'datestring' ];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            // cities: [],
            city: '',
            order: 'byNewest',
            searchText: '',
            tags: []
        };
    }

    componentWillMount() {
        // loadData(data => this.setState(data));
    }

    componentDidMount() {
        this.setState({
            data: this.props.initData
        });
    }

    componentDidUpdate() {
        console.log(this.state.data);
    }

    sortData(data, order) {
        let sorted;
        if (order === 'byNewest') {
            sorted = _.sortBy(data, 'date').reverse();
        } else if (order === 'byOldest') {
            sorted = _.sortBy(data, 'date');
        } else {
            sorted = _.sortBy(data, 'lastName');
        }
        return sorted;
    }

    filterByCity(data, city) {
        return city.length ? _.filter(data, (d) => d.department === city ) : data;
    }

    filterByTag(data, tags) {
        return tags.length ? _.filter(data, (d) => _.intersection(d.tags, tags).length === tags.length) : data;
    }

    sortnFilterCity(city, order) {
        let sorted = this.sortData(this.props.initData, order);
        let filtered = this.filterByCity(sorted, city);
        return filtered;
    }

    sortnFilterTag(tag, order) {
        let sorted = this.sortData(this.props.initData, order);
        let filtered = this.filterByTag(sorted, tag);
        return filtered;
    }

    sortnFilter(city, tag, order) {
        let sorted = this.sortData(this.props.initData, order);
        let byCity = this.filterByCity(sorted, city);
        let byTagAndCity = this.filterByTag(byCity, tag);
        return byTagAndCity;
    }

    handleOrder = (e) => {
        let order = e.target.value;
        let sorted = this.sortData(this.state.data, order);
        this.setState({
            order: order,
            data: sorted
        });
    }

    handleSearch = (query) => {
        // const query = e.target.value.toLowerCase();
        // let unfiltered = this.sortnFilterCity(this.state.city, this.state.order);
        //
        // let filtered = query.length ? _.filter(unfiltered, (d) => d.longstring.indexOf(query) !== -1) : unfiltered;
        //
        // this.setState({
        //     data: filtered
        // });
        console.log(query);
		let filtered = this.state.data.filter(createFilter(query, searchKeys));
		this.setState({
			data: filtered
		});
    }

    handleCity = (option) => {
        let city = option ? option.value : '';
        // let byCity = this.sortnFilterCity(city, this.state.order);
        let filtered = this.sortnFilter(city, this.state.tags, this.state.order);
        this.setState({
            city: city,
            data: filtered
        });
        // const name = e.target.name;
        // const value = e.target.value;
        // const city = name === 'city' ? value : this.state.city;
        // const order = name === 'order' ? value : this.state.order;
        //
        // let filtered = this.sortnFilterCity(city, order);
        //
        // this.setState({
        //     city: city,
        //     order: order,
        //     data: filtered
        // });
    }

    handleTags = (tag) => {
        // let tagArr = _.pluck(tags, 'label');
        let tags = _.pluck(tag, 'label');
        // let unfiltered = this.sortnFilterCity(this.state.city, this.state.order);

        // let filtered = this.filterByTag(unfiltered, _.pluck(tags, 'label'));
        let filtered = this.sortnFilter(this.state.city, tags, this.state.order);

        this.setState({
            tags: tags,
            data: filtered
        });
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="intro">
                        <ReactMarkdown source={this.props.intro} />
                    </div>
                </div>
                <CityForm cities={this.props.cities}
                    city={this.state.city}
                    order={this.state.order}
                    tags={this.state.tags}
                    handleCity={this.handleCity}
                    handleOrder={this.handleOrder}
                    handleSearch={this.handleSearch}
                    handleTags={this.handleTags}
					formChange={this.formChange}
                />
                <CaseGrid data={this.state.data} masonryOpts={masonryOpts} />
                <div className="container footer">
                    This is an <a href="https://github.com/camille-s/papb-wall">open source project</a>.
                </div>
            </div>
        );
    }
}
