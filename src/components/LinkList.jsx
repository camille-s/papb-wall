import React from 'react';
import { List } from 'semantic-ui-react';

const LinkList = (props) => (
	<List className="LinkList" bulleted>
		{props.links.map((d, i) => (
			<List.Item key={i}>
				<a href={d.link} target="_blank">{d.headline} - {d.pub}</a>
			</List.Item>
		))}
	</List>
);

export default LinkList;
