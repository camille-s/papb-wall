import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Col, Radio } from 'react-bootstrap';

export default class CityForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.props.handleChange.bind(this);
        this.handleSearch = this.props.handleSearch.bind(this);
    }

    render() {
        let options = this.props.cities.map((d) => {
            return <option value={d} key={d}>{d}</option>;
        });

        return (
            <div>
                <Form horizontal onChange={this.handleSearch}>
                    <FormGroup controlId="searchBox">
                        <Col componentClass={ControlLabel} sm={4} md={3}>Search</Col>
                        <Col sm={8} md={9}>
                            <FormControl type="text" value={this.props.searchText} placeholder="Search case info..." />
                        </Col>
                    </FormGroup>
                </Form>
                <Form horizontal onChange={this.handleChange}>
                    <FormGroup controlId="citySelect">
                        <Col componentClass={ControlLabel} sm={4} md={3}>Filter by department</Col>
                        <Col sm={8} md={9}>
                            <FormControl componentClass="select" name="city" value={this.props.city}>
                                <option value="">Show all</option>
                                {options}
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="sortRadio">
                        <Col componentClass={ControlLabel} sm={4} md={3}>Sort</Col>
                        <Col sm={8} md={9}>
                            <Radio name="order" value="byNewest" inline checked={this.props.order === "byNewest"} onChange={this.handleChange}>By date: newest</Radio>
                            <Radio name="order" value="byOldest" inline checked={this.props.order === "byOldest"} onChange={this.handleChange}>By date: oldest</Radio>
                            <Radio name="order" value="byName" inline checked={this.props.order === "byName"} onChange={this.handleChange}>By name</Radio>
                        </Col>
                    </FormGroup>
                </Form>

            </div>
        );
    }
}
