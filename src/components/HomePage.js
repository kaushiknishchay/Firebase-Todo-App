/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNil } from 'lodash';
import PropTypes from 'prop-types';


import TodoHome from './TodoHome';

class HomePage extends Component {
  render() {
    const { userInfo } = this.props;
    if (!isNil(userInfo)) {
      return <TodoHome />;
    }
    return (
      <div>
        Homepage
      </div>
    );
  }
}

HomePage.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

function mapState(state) {
  return {
    userInfo: state.user.userInfo,
  };
}

export default connect(mapState)(HomePage);
