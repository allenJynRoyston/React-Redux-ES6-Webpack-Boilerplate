import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import React from 'react';

import * as GET from '../../../actions/get';

class userList extends React.Component {
    componentWillMount() {
      // fetch data
      this.props.GET.users();
      // then map it to functions (mapStateToProps, mapDispatchToProps)
    }

    render() { 
      return !this.props.listOfNames
        ? pug` 
          p Loading... 
        `
        : pug`
          div
            ${this.props.listOfNames.map((item, index) => {
              return pug`div(key=${item.id}) ${item.name}`
            })}
        `
    }     
}

userList.propTypes = {
  // store object
  GET: PropTypes.object,
  // property to be used by store
  listOfNames: PropTypes.array
};

function mapStateToProps(state) {
  return {
    listOfNames: state.userData // needs to match what's on allReducers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GET: bindActionCreators(GET, dispatch)
  };
}

export default connect( 
  mapStateToProps, 
  mapDispatchToProps 
)(userList);
