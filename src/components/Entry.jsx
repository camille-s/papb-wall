import React from 'react';
import { Divider, Segment, Grid, Header } from 'semantic-ui-react';

import LinkList from './LinkList';
import TagList from './TagList';

import '../styles/Entry.css';

export default class Entry extends React.Component {
    constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (e, titleProps) => {
		let { index } = titleProps;
		let active = this.state.active;
		let newIdx = active === index ? -1 : index;
		this.setState({
			active: newIdx
		});
	};

    render() {
        let name = <span>{this.props.firstName} {this.props.lastName}</span>;
        let age = this.props.age.length ? `, ${this.props.age}` : '';

        return (

			// <Card className="Entry" centered>
			// 	<Card.Content>
			// 		<Card.Header className="name-header">{name}<span>{age}</span></Card.Header>
			// 		<Card.Meta className="dept-header" >{this.props.department.toUpperCase()} | {this.props.datestring}</Card.Meta>
            //
			// 		<Divider />
			// 		<Card.Description>{this.props.blurb}</Card.Description>
            //
			// 		<LinkList links={this.props.linkset} />
            //
			// 	</Card.Content>
			// 	<Card.Content extra>
			// 		<TagList tags={this.props.tags} />
			// 	</Card.Content>
			// </Card>
			<Grid.Column>
				<Segment className="Entry">
					<Header size="large" className="name-header">{name}<span>{age}</span></Header>
					<Header size="medium" color="grey" className="dept-header">
						{this.props.department.toUpperCase()} | {this.props.datestring}
					</Header>

					<Divider />
					<div>{this.props.blurb}</div>

					<LinkList links={this.props.linkset} />

					<Divider />
					<TagList tags={this.props.tags} />
				</Segment>
			</Grid.Column>

		);
    }
}
