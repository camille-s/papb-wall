import React from 'react';
import * as _ from 'underscore';
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';

export default class CitySelect extends React.Component {
    render() {
        // move this to CityForm so it can be props for CitySelect
        // let options = this.props.cities.map(function(d) {
        //     let key = _.uniqueId();
        //     let val = d === 'Show all' ? '' : d;
        //     return <option value={val} key={key}>{d}</option>;
        // });
        return (
            <FormGroup controlId="citySelect">
                <Col componentClass={ControlLabel} md={2}>Filter by city</Col>
                {/* <ControlLabel>Filter by city</ControlLabel> */}
                <Col md={6}>
                    <FormControl componentClass="select" onChange={this.props.handleChange.bind(this)}>{this.props.options}</FormControl>
                </Col>
            </FormGroup>
        );
    }
}
