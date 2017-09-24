import React from 'react';
import { Col } from 'react-bootstrap';
import LinkList from './LinkList';

import '../styles/Card.css';

export default class Card extends React.Component {
    // might add state if we want to expand cards
    render() {
        let name = <span>{this.props.firstName} {this.props.lastName}</span>;
        let age = this.props.age.length ? `, ${this.props.age}` : '';
        let officer = this.props.officer.length ? `Officer: ${this.props.officer}` : '';
        let outcome = this.props.outcome.length ? this.props.outcome : '';

        return (
            <Col md={4} sm={6} className="Card">
                <h2 className="text-uppercase">{name}{age}</h2>
                <h4 className="where">{this.props.department} | {this.props.datestring}</h4>
                {/* will have element for photo */}
                <h5 className="officer">{officer}</h5>
                <p className="blurb">{this.props.blurb}</p>

                <p className="outcome">{outcome}</p>

                <LinkList links={this.props.linkset} />
            </Col>
        );
    }
}
