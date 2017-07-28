import React from 'react';
import * as _ from 'underscore';
import Masonry from 'react-masonry-component';

import { Grid } from 'react-bootstrap';
import Card from './Card';

export default class CaseGrid extends React.Component {
    render() {
        let cards = this.props.data.map(function(d) {
            return <Card key={_.uniqueId('card_')} {...d} />;
        });

        return (
            <Grid componentClass="Card">
                <Masonry options={this.props.masonryOpts}>{cards}</Masonry>
            </Grid>
        );
    }
}
