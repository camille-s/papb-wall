import React from 'react';
import { Label } from 'semantic-ui-react';

const TagList = (props) => (
	<Label.Group>
		{props.tags.map((tag, i) => (
			<Label key={i}>{tag}</Label>
		))}
	</Label.Group>
);

export default TagList;
