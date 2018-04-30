import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllCakes, getSingleCake, clearNotification } from './../actions/index';

export class Home extends React.Component {
    componentWillMount() {
        !this.props.loading && this.props.getAllCakes();
    }

    viewCake(id) {
        this.props.getSingleCake(id)
            .then(() =>
                this.props.history.push(`/view-cake/${id}`)
            )
    }

    closeNotification(){
        this.props.clearNotification();
    }

    renderList(items) {
        return items.map(item => {
            if (!item.name && !item.imageUrl) {
                return null;
            }
            return (
                <li key={`${item.id}-${item.name}`} onClick={() => this.viewCake(item.id)} >
                    <img src={item.imageUrl} alt={item.name} />
                    <span className="cake-name">{item.name}</span>
                </li>)
        })
    }

    render() {
        const { cakes, loading, error, notification } = this.props;

        return (
            <Fragment>
                <div className="header text-center">
                    <h1>Hello World!</h1>
                    <br></br>
                    <Link to="/new-cake" className="btn btn-primary mt-2">Add new cake</Link>
                    {notification === 'success' &&
                        <div className="notification">Cake added successfully!<span onClick={this.closeNotification.bind(this)}>x</span></div>
                    }
                </div>
                {!loading && error && <p>Error loading cakes :(</p>}

                {loading ?
                    <p>Loading cakes...</p>
                    : cakes && cakes.length > 0 ?
                        <ul className="home-list">
                            {this.renderList(cakes)}
                        </ul>
                        : <p>No cakes to show!</p>
                }
            </Fragment>
        );
    }
}

export default connect(
    (state) => state,
    {
        getAllCakes,
        getSingleCake,
        clearNotification,
    }
)(Home);
