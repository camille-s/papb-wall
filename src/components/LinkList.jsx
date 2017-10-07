import React from 'react';
// import { Collapse, Button } from 'react-bootstrap';

export const LinkList = function(props) {
    let links = props.links.map(function(d, i) {
        let key = i;
        return <li key={key} className="link-li"><a href={d.link} target="_blank">{d.headline} - {d.pub}</a></li>;
    });
    return (
        <ul>{links}</ul>
    );
};
