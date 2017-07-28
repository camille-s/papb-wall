import React from 'react';
import * as _ from 'underscore';

export default class Form2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cities: [] };
    }

    componentDidMount() {
        console.log(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props.data);
        console.log(nextProps);
    }

    render() {
        return (<div></div>);
    }
}
