import React from 'react';
import * as _ from 'underscore';
import ReactMarkdown from 'react-markdown';

import CaseGrid from './components/CaseGrid';
import CityForm from './components/CityForm';

import './App.css';

const masonryOpts = {
    // stagger?
    transitionDuration: 0
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            // cities: [],
            city: '',
            order: 'byNewest',
            searchText: '',
            // intro: ''
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

    filterData(data, city) {
        return city.length ? _.filter(data, (d) => d.department === city ) : data;
    }

    sortnFilter(city, order) {
        let sorted = this.sortData(this.props.initData, order);
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
        let unfiltered = this.sortnFilter(this.state.city, this.state.order);
        let filtered = query.length ? _.filter(unfiltered, (d) => d.longstring.indexOf(query) !== -1) : unfiltered;
        this.setState({
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
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                />
                <CaseGrid data={this.state.data} masonryOpts={masonryOpts} />
                <div className="container footer">
                    This is an <a href="https://github.com/camille-s/papb-wall">open source project</a>.
                </div>
            </div>
        );
    }
}
