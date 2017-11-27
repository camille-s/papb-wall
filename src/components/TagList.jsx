import React from 'react';
import { Label } from 'react-bootstrap';

const TagList = function(props) {
	// let tags = props.tags;
	// let taglist = [];
	// for (const key of Object.keys(tags)) {
	// 	if (tags[key]) {
	// 		taglist.push(<li><Label bsClass="label label-dark">{ tags[key] }</Label></li>);
	// 	}
	// }
	let tags = props.tags.map((tag, i) => {
		return (
			<li key={i}><Label bsClass="label label-dark">{ tag }</Label></li>
		);
	})
	return (
		<ul className="list-inline TagList">{ tags }</ul>
	);
};

export default TagList;
