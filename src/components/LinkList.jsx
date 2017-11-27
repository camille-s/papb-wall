import React from 'react';

const LinkList = function(props) {
    let links = props.links.map(function(d, i) {
        let key = i;
        return <li key={key} className="link-li"><a href={d.link} target="_blank">{d.headline} - {d.pub}</a></li>;
    });
    return (
        <ul className="LinkList">{links}</ul>
    );
};

export default LinkList;
