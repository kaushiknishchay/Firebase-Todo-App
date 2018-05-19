/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { isNil } from 'lodash';


class PrivateRoute extends React.Component {
  render() {
    console.log('aaa', this.props);
    const {
      component: Component, userInfo, loggingIn, ...rest
    } = this.props;

    const renderRoute = (props) => {
      if (loggingIn && !isNil(userInfo) && !isNil(userInfo.uid)) {
        return (<Component {...props} />);
      }
      return (<Redirect to={{
        pathname: `/?${Math.random()}`,
        state: { from: props.location },
      }}
      />);
    };

    return (
      <Route {...rest} render={renderRoute} />
    );
  }
}

PrivateRoute.propTypes = {
  userInfo: PropTypes.object.isRequired,
  component: PropTypes.any.isRequired,
  loggingIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { userInfo, loggingIn } = state.user;
  return {
    loggingIn,
    userInfo,
  };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
