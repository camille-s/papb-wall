import React from 'react';
// import Masonry from 'react-masonry-component';
import { Card } from 'semantic-ui-react';
import Entry from './Entry';

import '../styles/CaseGrid.css';

const CaseGrid = (props) => (
    <div className="CaseGrid">
        <Card.Group>
            {props.data.map((d, i) => (
                <Entry key={d.lastName + ' ' + d.firstName} {...d} />
            ))}
        </Card.Group>
    </div>
);

export default CaseGrid;
