import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import React from 'react';

import * as GET from '../../../actions/get';

class photoList extends React.Component {
    componentWillMount() {
      // fetch data
      this.props.GET.photos();
      // then map it to functions (mapStateToProps, mapDispatchToProps)
    }

    render() { 
      return !this.props.listOfPhotos
        ? pug` 
          p Loading... 
        `
        : pug`
          div
            ${this.props.listOfPhotos.map((item, index) => {              
              return pug`p(key=${item.id}) ${item.title}`
            })}
        `
    }     
}

photoList.propTypes = {
  // store object
  GET: PropTypes.object,
  // property to be used by store
  listOfPhotos: PropTypes.array
};

function mapStateToProps(state) {
  return {
    listOfPhotos: state.photoData // needs to match what's on allReducers
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
)(photoList);
