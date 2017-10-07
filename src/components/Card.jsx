import React from 'react';
import { Col } from 'react-bootstrap';
import { LinkList } from './LinkList';

import '../styles/Card.css';

export const Card = (props) => {
    // might add state if we want to expand cards
    let name = <span>{props.firstName} {props.lastName}</span>;
    let age = props.age.length ? `, ${props.age}` : '';
    let officer = props.officer.length ? `Officer: ${props.officer}` : '';
    let outcome = props.outcome.length ? props.outcome : '';

    return (
        <Col md={4} sm={6} className="Card">
            <h2 className="text-uppercase">{name}{age}</h2>
            <h4 className="where">{props.department} | {props.datestring}</h4>
            {/* will have element for photo */}
            {/* <h5 className="officer">{officer}</h5> */}
            <p className="blurb">{props.blurb}</p>

            {/* <p className="outcome">{outcome}</p> */}
            {/* <Tabs defaultActiveKey={1}>
                <Tab title="Links" eventKey={1}>
                    <LinkList links={props.linkset} />
                </Tab>
                <Tab title="Outcome" eventKey={2}>
                    <p className="outcome">{outcome}</p>
                </Tab>
            </Tabs> */}
            <LinkList links={props.linkset} />


        </Col>
    );
};
