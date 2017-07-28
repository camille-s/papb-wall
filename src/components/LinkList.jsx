import React from 'react';
import * as _ from 'underscore';

export default class LinkList extends React.Component {
    render() {
        // map over list of link data
        // make Link for each
        let links = this.props.links.map(function(d) {
            let key = _.uniqueId('link_');
            return <li key={key} className="link-li"><a href={d.link} target="_blank">{d.headline} - {d.pub}</a></li>;
        });
        return (
            <ul>{links}</ul>
        );
    }
}
