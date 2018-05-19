/* eslint-disable react/no-unused-prop-types,
react/forbid-prop-types,react/jsx-no-undef,no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';


import { requestLogin, saveUser, signOutUser } from '../actions';
import firebaseObj from '../firebase/config';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const UserName = styled.span`
  margin: 0 2em;
`;

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: null,
    };
  }

  componentDidMount() {
    this.props.requestLogin();
    firebaseObj.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('User signed in: ', JSON.stringify(user));
        this.props.saveUser(user);
      }
    });
  }

  onLogin = () => {
    firebaseObj.auth().signInWithRedirect(firebaseObj.googleProvider)
      .catch((err) => {
        // console.log('err', err);
      });
  };

  handleMenu = (event) => {
    this.setState({ menuOpen: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ menuOpen: null });
  };

  handleSignOut = () => {
    firebaseObj.auth().signOut()
      .then(() => {
        // Sign-out successful.
        this.props.signOutUser();
      })
      .catch((error) => {
        // An error happened
      });
  };

  renderAvatar = () => {
    const { menuOpen } = this.state;
    const open = Boolean(menuOpen);
    const { userInfo } = this.props;
    if (userInfo) {
      return (
        <div>
          <UserName>Welcome {userInfo.displayName} !</UserName>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <Avatar alt={userInfo.displayName} src={userInfo.photoURL} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={menuOpen}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleSignOut}>Logout</MenuItem>
          </Menu>
        </div>);
    }
    return null;
  };

  render() {
    const { classes, userInfo } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Title
            </Typography>
            {
              !userInfo &&
              <Button
                color="inherit"
                onClick={this.onLogin}
              >Login
              </Button>
            }
            {
              this.renderAvatar()
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.defaultProps = {
  userInfo: null,
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  requestLogin: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  signOutUser: PropTypes.func.isRequired,
};

function mapState(state) {
  return {
    userInfo: state.user.userInfo,
  };
}

function mapDispatch(dispatch) {
  return bindActionCreators({
    requestLogin,
    saveUser,
    signOutUser,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Header));
