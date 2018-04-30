import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCake } from './../actions';

export class NewCake extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                name: '',
                comment: '',
                imageUrl: '',
                yumFactor: '',
            },
            errors: {},
        }

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate() {
        const name = this.state.formValues.name;
        let errors = {};

        if (name === '') {
            errors.nameRequiredError = 'You need to provide a name';
        } else if (name.length > 20) {
            errors.nameMaxLength = 'Name can only be up to 20 characters';
        }

        this.setState({ errors });

        return errors;
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.type === 'radio' ? target.name : target.id;
        const formValues = { ...this.state.formValues, [name]: value }

        this.setState({ formValues });
    }

    handleSubmit(e) {
        e.preventDefault();
        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            this.props.addCake(this.state.formValues)
                .then(() => this.props.history.push("/"));
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <Fragment>
                <div className="header">
                    <h1>New Cake</h1>
                </div>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter name"
                            onChange={this.handleChange}
                            onBlur={this.validate}
                        />
                        <span className="form-error">{errors.nameRequiredError}</span>
                        <span className="form-error">{errors.nameMaxLength}</span>
                    </div>
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea
                            className="form-control"
                            id="comment"
                            rows="3"
                            onChange={this.handleChange}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="text"
                            className="form-control"
                            id="imageUrl"
                            placeholder="Enter url"
                            onChange={this.handleChange}
                        />
                    </div>
                    <fieldset className="form-group">
                        <label>Yum factor</label>
                        <select id="yumFactor" className="form-control" onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </fieldset>
                    <Link to="/" className="btn btn-secondary mr-3">Cancel</Link>
                    <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                </form >
            </Fragment>
        )
    }
}

export default connect(
    state => state,
    {
        addCake,
    }
)(NewCake);