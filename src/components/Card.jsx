import React from 'react';
import { Col } from 'react-bootstrap';
import LinkList from './LinkList';

import '../styles/Card.css';

export default class Card extends React.Component {
    // might add state if we want to expand cards
    render() {
        let name = <span>{this.props.firstName} {this.props.lastName}</span>;
        let age = this.props.age.length ? `, ${this.props.age}` : '';

        return (
            <Col md={4} sm={6} className="Card">
                <h2 className="text-uppercase">{name}{age}</h2>
                <h4 className="where">{this.props.department} | {this.props.datestring}</h4>
                {/* will have element for photo */}
                <p className="blurb">{this.props.blurb}</p>

                <LinkList links={this.props.linkset} />
            </Col>
        );
    }
}
