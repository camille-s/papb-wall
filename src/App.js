import React from 'react';
import * as _ from 'underscore';
import ReactMarkdown from 'react-markdown';
import { Container, Segment, Message, Button } from 'semantic-ui-react';
import { createFilter } from 'react-search-input';
import ScrollToTop from 'react-scroll-up';

import CaseGrid from './components/CaseGrid';
import Filters from './components/Filters';

import './App.css';

// add outcome
const searchKeys = [ 'firstName', 'lastName', 'department', 'headline', 'pub', 'blurb', 'datestring' ];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            city: 'all',
            order: 'byNewest',
            searchText: '',
            tags: []
        };
    }

    componentDidMount() {
        this.setState({
            data: this.props.initData
        });
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
        return city !== 'all' ? _.filter(data, (d) => d.department === city ) : data;
    }

    filterByTag(data, tags) {
        return tags.length ? _.filter(data, (d) => _.intersection(d.tags, tags).length === tags.length) : data;
    }

    sortnFilter({ city, tags, order }) {
        let sorted = this.sortData(this.props.initData, order);
        let byCity = this.filterByCity(sorted, city);
        let byTagAndCity = this.filterByTag(byCity, tags);
        return byTagAndCity;
    }

    handleSearch = (e) => {
        let query = e.target.value;
        let { city, tags, order } = this.state;
        let opts = { city, tags, order };
        let data = this.sortnFilter({ ...opts });
		let filtered = data.filter(createFilter(query, searchKeys));
		this.setState({
			data: filtered
		});
    }

    formChange = (e, { name, value }) => {
        // this.setState({ [name]: value });
        let { city, tags, order } = this.state;
        let opts = { city, tags, order };
        let data = this.sortnFilter({ ...opts, [name]: value });

        this.setState({
            data: data,
            [name]: value
        });
    };

    render() {
        console.log(this.state.data);
        return (
            <div className="App">
				<Container>
					<div className="intro">
                        <ReactMarkdown source={this.props.intro} />
                    </div>
                </Container>
                <Container>
                    <Segment padded id="formContainer">
                        <Filters
                            handleChange={this.formChange}
                            handleSearch={this.handleSearch}
                            cities={this.props.cities}
                            city={this.state.city}
                            order={this.state.order}
                            tags={this.state.tags}
                        />
                        <Message color="teal" compact>Currently viewing <span className="count">{this.state.data.length}</span> cases</Message>
                    </Segment>
                </Container>
                <Container>
                    <CaseGrid data={this.state.data} />
                </Container>
                <Container>
                    <div className="footer">
                        This is an <a href="https://github.com/camille-s/papb-wall">open source project</a>.
                    </div>
                </Container>
                <ScrollToTop showUnder={160}>
                    <Button circular icon="arrow up" color="teal" size="huge" />
                </ScrollToTop>
            </div>
        );
    }
}
