import React from 'react';
import { Form, Dropdown, Input } from 'semantic-ui-react';

const masterTags = ['survived', 'did not survive', 'video', 'car chase', 'shot by officer'];

export default class Filters extends React.Component {
    render() {
		let cities = this.props.cities.map((d) => {
            return { key: d, value: d, text: d };
        });
        cities.unshift({ key: 'all', value: 'all', text: 'Show all' });

		let tags = masterTags.map((d) => {
			return { key: d, value: d, text: d };
		});

		let officers = this.props.officers.map((d) => {
			return { key: d, value: d, text: d };
		});
		officers.unshift({ key: 'all', value: 'all', text: 'Show all' });

        return (
			<div className="Filters">
				<Form>
					<Form.Field>
						<label htmlFor="search">Search cases</label>
						{/* <SearchInput className="" onChange={this.props.handleSearch} /> */}
						<Input name="query" onChange={this.props.handleSearch} placeholder="Search" label={{ icon: 'search'}} labelPosition="left" />
					</Form.Field>
					<Form.Field>
						<label htmlFor="city">Filter by department</label>
						<Dropdown name="city" className="icon" options={cities} value={this.props.city} onChange={this.props.handleChange} button floating labeled selection icon="marker" />
					</Form.Field>
					<Form.Field>
						<label htmlFor="tags">Filter by tag</label>
						<Dropdown name="tags" className="icon" options={tags} value={this.props.tags} onChange={this.props.handleChange} button floating labeled selection multiple placeholder=" " icon="tags" />
					</Form.Field>
					{/* <Form.Field>
						<label htmlFor="officer">Filter by officer</label>
						<Dropdown name="officer" className="icon" options={officers} value={this.props.officer} onChange={this.props.handleChange} button floating labeled selection icon="id badge" placeholder="Show all" />
					</Form.Field> */}

					<Form.Group inline>
						<label htmlFor="order">Sort by</label>
						<Form.Radio name="order" label="By date: newest" value="byNewest" checked={this.props.order === 'byNewest'} onChange={this.props.handleChange} />
						<Form.Radio name="order" label="By date: oldest" value="byOldest" checked={this.props.order === 'byOldest'} onChange={this.props.handleChange} />
						<Form.Radio name="order" label="By name" value="byName" checked={this.props.order === 'byName'} onChange={this.props.handleChange} />
					</Form.Group>
				</Form>
			</div>
		);
    }
}
