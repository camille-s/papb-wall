import React from 'react';
import Masonry from 'react-masonry-component';
import * as _ from 'underscore';

import { Card } from './Card';
import '../styles/CaseGrid.css';

export const CaseGrid = (props) => {
    let cards = _.map(props.data, (d) => <Card key={`${d.lastName}_${d.firstName}`} {...d} />);

    return (
        <div className="CaseGrid">
            <Masonry options={props.masonryOpts}>
                {cards}
            </Masonry>
        </div>
    );
};
