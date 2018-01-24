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
		let officers = this.props.officers;
		let officerStr = officers.length === 1 ? 'Officer:' : 'Officers:';
		let officerHeader = officers.length ? <Header size="small" color="grey" className="dept-header officer-header">{officerStr} {officers.join(', ')}</Header> : <span></span>;

        return (
			<Grid.Column>
				<Segment className="Entry">
					<Header size="large" className="name-header">{name}<span>{age}</span></Header>
					<Header size="medium" color="grey" className="dept-header">
						{this.props.department.toUpperCase()} | {this.props.datestring}
					</Header>
					{officerHeader}

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
