import React from 'react';
import Masonry from 'react-masonry-component';

import { Grid } from 'react-bootstrap';
import Card from './Card';

export default class CaseGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cards: [] };
    }

    makeCards(data) {
        let cards = data.map(function(d) {
            // return <Card key={_.uniqueId('card_')} {...d} />;
            return <Card key={d.lastName + ' ' + d.firstName} {...d} />
        });
        this.setState({ cards: cards });
    }

    componentWillReceiveProps(nextProps) {
        this.makeCards(nextProps.data);
    }

    render() {
        return (
            <Grid>
                <Masonry options={this.props.masonryOpts} className={"case-grid"}>{this.state.cards}</Masonry>
            </Grid>
        );
    }
}
