import React from 'react';
import Masonry from 'react-masonry-component';
import Entry from './Entry';

import '../styles/CaseGrid.css';

const CaseGrid = (props) => (
    <div className="CaseGrid">
		<Masonry elementType={'div'} className="ui stackable doubling three column grid">
			{props.data.map((d, i) => (
				<Entry key={d.lastName + ' ' + d.firstName} {...d} />
			))}
		</Masonry>
	</div>
);

export default CaseGrid;
