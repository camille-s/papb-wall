import React from 'react';
import { Collapse, Button } from 'react-bootstrap';

// const LinkList = function(props) {
//     let links = props.links.map(function(d, i) {
//         let key = i;
//         return <li key={key} className="link-li"><a href={d.link} target="_blank">{d.headline} - {d.pub}</a></li>;
//     });
//     return (
//         <ul>{links}</ul>
//     );
// };
//
// export default LinkList;

export default class LinkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: true };
        this.toggleList = this.toggleList.bind(this);
    }

    toggleList() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        let links = this.props.links.map(function(d, i) {
            let key = i;
            return <li key={key} className="link-li"><a href={d.link} target="_blank">{d.headline} - {d.pub}</a></li>;
        });
        let toggleClass = this.state.open ? 'linklist-open' : 'linklist-closed';

        return (
            <div className="link-slider">
                {/* <Button onClick={ this.toggleList }>
                    Read more
                </Button> */}
                <Collapse in={this.state.open}>
                    <ul className={toggleClass}>{ links }</ul>
                </Collapse>
            </div>
        );
    }
}
