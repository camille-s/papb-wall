import React from 'react';
import { Col } from 'react-bootstrap';
import LinkList from './LinkList';

export default class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false
        };
    }
    render() {
        return (
            <Col md={4} sm={6} className="card">
                <h2 className="text-uppercase">{this.props.first_name} {this.props.last_name}, {this.props.age}</h2>
                <h4 className="where">{this.props.location} | {this.props.datestring}</h4>
                {/* will have element for photo */}
                <p className="blurb">{this.props.what}</p>

                <LinkList links={this.props.linkset} />
            </Col>
        );
    }
}
