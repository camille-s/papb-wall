import React from 'react';
import { Form, Grid, FormGroup, ControlLabel, FormControl, Col, Radio, Checkbox } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

// const masterTags = ['survived', 'did not survive', 'video', 'car chase', 'shot by officer'];
const masterTags = [
    { value: 'survived', label: 'survived' },
    { value: 'didNotSurvive', label: 'did not survive' },
    { value: 'video', label: 'video' },
    { value: 'chase', label: 'car chase' },
    { value: 'shot', label: 'shot by officer' }
];

export default class CityForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleCity = this.props.handleCity.bind(this);
        this.handleOrder = this.props.handleOrder.bind(this);
        this.handleSearch = this.props.handleSearch.bind(this);
        this.handleTags = this.props.handleTags.bind(this);
    }

    render() {
        // let options = this.props.cities.map((d) => {
        //     return <option value={d} key={d}>{d}</option>;
        // });
        let cities = this.props.cities.map((d) => {
                return { value: d, label: d };
            });
        cities.unshift({ value: '', label: 'Show all' });

        return (
            <Grid>
                {/* <Form horizontal onChange={this.handleSearch}>
                    <FormGroup controlId="searchBox">
                        <Col componentClass={ControlLabel} md={2}>Search</Col>
                        <Col md={10}>
                    <FormControl type="text" value={this.props.searchText} placeholder="Search case info..." />
                        </Col>
                    </FormGroup>
                </Form> */}

                {/* <Form horizontal onChange={this.handleChange}> */}
                <Form horizontal>
                    <FormGroup controlId="citySelect">
                        <Col componentClass={ControlLabel} md={3}>Filter by department</Col>
                        <Col md={9}>
                            <Select
                                name="citySelect"
                                options={cities}
                                onChange={this.handleCity}
                                value={this.props.city}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="tagsSearch">
                        <Col componentClass={ControlLabel} md={3}>Filter by tag</Col>
                        <Col md={9}>
                            <Select
                                name="tagSelect"
                                options={masterTags}
                                onChange={this.handleTags}
                                multi={true}
                                removeSelected={true}
                                placeholder="Select tags..."
                                value={this.props.tags}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="sortRadio">
                        <Col componentClass={ControlLabel} md={2}>Sort</Col>
                        <Col md={10}>
                            <Radio name="order" value="byNewest" inline checked={this.props.order === "byNewest"} onChange={this.handleOrder}>By date: newest</Radio>
                            <Radio name="order" value="byOldest" inline checked={this.props.order === "byOldest"} onChange={this.handleOrder}>By date: oldest</Radio>
                            <Radio name="order" value="byName" inline checked={this.props.order === "byName"} onChange={this.handleOrder}>By name</Radio>
                        </Col>
                    </FormGroup>
                </Form>



            </Grid>

        )
    }
}