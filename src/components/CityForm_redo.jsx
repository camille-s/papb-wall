import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default class CityForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.props.handleChange.bind(this);
        // this.changeCity = this.changeCity.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = { city: '' };
    }

    submitHandler(e) {
        e.preventDefault();
        console.log(this.state);

    }

    // changeCity(e) {
    //     this.setState({ city: e.target.value }, () => {
    //         console.log(this.state);
    //     });
    //
    // }

    render() {
        return (

            // <Form onChange={this.props.handleChange.bind(this)}>
            <div>
                <form onSubmit={this.submitHandler}>
                    <select className="select" name="city" onChange={this.handleChange} >
                        <option value="">blank</option>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                    </select>
                    <input type="submit" />
                </form>
            </div>
            // </Form>
        );
    }
}
