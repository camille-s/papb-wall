import React from 'react';
import Masonry from 'react-masonry-component';
import * as _ from 'underscore';

import { Grid } from 'react-bootstrap';
import Card from './Card';

export default class CaseGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            cards: []
        };
    }

    makeCards(data) {
        let cards = _.map(data, (d) => <Card key={d.lastName + ' ' + d.firstName} {...d} />);
        this.setState({ cards: cards });
    }

    componentWillReceiveProps(nextProps) {
        this.makeCards(nextProps.data);
    }

    render() {
        return (
            <Grid>
                <Masonry options={this.props.masonryOpts} className="case-grid">{this.state.cards}</Masonry>
            </Grid>
        );
    }
}
