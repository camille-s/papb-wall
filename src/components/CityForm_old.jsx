import React from 'react';
import * as _ from 'underscore';
import { Form, Grid } from 'react-bootstrap';

import CitySelect from './CitySelect';

export default class CityForm extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { city: 'Show all', cities: [] };
        this.state = { city: '', options: [] };
    }

    componentDidMount() {
        // let options = this.props.cities.map(function(d) {
        //     let key = _.uniqueId();
        //     return <option value={d} key={key}>{d}</option>;
        // });
        // this.setState({ options: options });
        console.log(this.props.cities);
    }

    componentWillReceiveProps(nextProps) {
        this.initSelect(nextProps);
        console.log(nextProps);
    }

    initSelect(nextProps) {
        // let data = nextProps.data;
        //
        // let cityArr = _.chain(data)
        //     .pluck('location')
        //     .map(function(d) { return d.trim(); })
        //     .uniq()
        //     .sort()
        //     .value();

        // cityArr.unshift('Show all');
        // this.setState({ cities: cityArr });

        let options = nextProps.cities.map(function(d) {
            let key = _.uniqueId();
            return <option value={d} key={key}>{d}</option>;
        });
        this.setState({ options: options });
    }



    render() {

        return (

            <Grid>
                <Form horizontal>
                    <CitySelect options={this.state.options} handleChange={this.props.handleChange}></CitySelect>
                </Form>
            </Grid>

        );
    }
}
