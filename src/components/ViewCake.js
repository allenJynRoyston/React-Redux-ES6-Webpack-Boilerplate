import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSingleCake } from './../actions';

export class ViewCake extends React.Component {
    componentWillMount() {
        const { match, viewCake, getSingleCake } = this.props;

        const cakeId = match.params.cakeId;

        !viewCake && getSingleCake(cakeId);
    }
    render() {
        const cake = this.props.viewCake;
        return (
            <Fragment>
                {this.props.loading ?
                    <p className="mt-5">Loading cake...</p>
                    : cake ?
                        <Fragment>
                            <div className="header">
                                <h1>{cake.name}</h1>
                            </div>
                            <div className="view-content">
                                <img src={cake.imageUrl} alt={cake.name} />
                                <p className="mt-3">{cake.comment}</p>
                                <p><b>Yum factor:</b> {cake.yumFactor}</p>
                            </div>
                        </Fragment>
                        : <p>Error loading your cake :(</p>
                }
                <Link to="/" className="btn btn-primary mt-3">Back to list</Link>
            </Fragment >
        )
    }
}

export default connect(
    (state) => state,
    {
        getSingleCake,
    }
)(ViewCake);
