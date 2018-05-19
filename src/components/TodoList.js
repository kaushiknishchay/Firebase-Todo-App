/* eslint-disable react/forbid-prop-types,react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

import firebaseObj from '../firebase/config';


const TodoItems = styled.ul`
  background: #fff;
  padding: 1em;
  list-style: none;
`;

const TodoItem = styled.li`
  border-bottom: 1px solid #eee;
  margin: 1em 0;
  padding: 0em 2em;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  position: relative;
`;

const Time = styled.span`
  position: absolute;
  right: 0;
`;

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.dbRef = null;
    this.state = {
      todoList: [],
    };
  }

  handleDelete = (key) => {
    const uId = this.props.userInfo.uid;
    this.dbRef = firebaseObj.database().ref(`items/${uId}/${key}`).remove();
  };

  renderItems = (todoList) => {
    if (todoList.length > 0) {
      return (
        <TodoItems>
          {
          todoList.length > 0 &&
          todoList
            .map(obj => (
              <TodoItem key={obj.key}>
                <Title>
                  <span
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}
                  >{obj.title}
                  </span>
                  <Time>{moment(obj.timestamp).fromNow()}</Time>
                </Title>
                <div
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      flex: '1 1 90%',
                      width: '90%',
                      display: 'inline-block',
                    }}
                  >{obj.text}
                  </div>
                  <IconButton
                    style={{
                      flex: '1 1 10%',
                    }}
                    aria-label="Delete"
                    onClick={e => this.handleDelete(obj.key, e)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </TodoItem>))
        }
        </TodoItems>);
    }
    return (<div>Loading...</div>);
  };

  render() {
    const { userInfo } = this.props;
    if (!this.dbRef && userInfo && userInfo.uid) {
      const uId = this.props.userInfo.uid;
      this.dbRef = firebaseObj.database().ref(`items/${uId}`);
      this.dbRef.on('value', (snap) => {
        const todos = snap.val();
        const todoList = _.keys(todos).map(key => ({ ...todos[key], ...{ key } }));
        this.setState({
          todoList,
        });
      });
    }
    const { todoList } = this.state;

    return (
      <div>
        {this.renderItems(todoList)}
      </div>
    );
  }
}

TodoList.defaultProps = {
  userInfo: null,
};

TodoList.propTypes = {
  userInfo: PropTypes.object,
};

function mapState(state) {
  return {
    userInfo: state.user.userInfo,
  };
}

export default connect(mapState)(TodoList);
// export default TodoList;
