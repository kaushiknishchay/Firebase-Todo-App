/* eslint-disable jsx-a11y/label-has-for,react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from '../actions';
import firebaseObj from '../firebase/config';

const TitleWrap = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 1em auto 3em;
`;

const TextWrap = TitleWrap.extend`
`;
const ButtonWrap = TitleWrap.extend`
`;

const TitleInput = styled.input`
  width: 60%;
  padding: 1em 2em;
  display: block;
  text-align: left;
  margin: 1em auto;
  border: 2px solid #ccc;
  box-shadow: 3px 3px 0px 0px #ddd;
`;

const TextInput = styled.textarea`
  width: 60%;
  padding: 1em 2em;
  display: block;
  text-align: left;
  margin: 1em auto;
  border: 2px solid #ccc;
  box-shadow: 3px 3px 0px 0px #ddd;
`;

const SubmitButton = styled.button`
  padding: 1em 2em;
  background: #188bea;
  color: #fff;
  width: 300px;
  border: 1px solid #2471a3;
`;

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    };
  }

  componentDidMount() {

  }


  onChange = (e) => {
    if (e && e.target && e.target.value.length > 0) {
      const key = e.target.name;
      this.setState({
        [key]: e.target.value,
      });
    }
  };

  submitTodo = () => {
    // this.props.addTodo(this.state.title, this.state.text);
    this.dbRef.push({
      title: this.state.title,
      text: this.state.text,
      timestamp: new Date().getTime(),
    });
  };

  render() {
    const { userInfo } = this.props;
    if (!this.dbRef && userInfo && userInfo.uid) {
      const uId = this.props.userInfo.uid;
      this.dbRef = firebaseObj.database().ref(`items/${uId}`);
    }

    return (
      <div>
        <TitleWrap>
          <label htmlFor="title">
            Title
          </label>
          <TitleInput
            id="title"
            type="text"
            name="title"
            onChange={this.onChange}
          />
        </TitleWrap>
        <TextWrap>
          <label htmlFor="text">
            Text
          </label>
          <TextInput
            name="text"
            rows={4}
            onChange={this.onChange}
          />
        </TextWrap>
        <ButtonWrap>
          <SubmitButton
            type="submit"
            onClick={this.submitTodo}
          >
            Add
          </SubmitButton>
        </ButtonWrap>
      </div>
    );
  }
}

TodoInput.defaultProps = {
  userInfo: null,
};

TodoInput.propTypes = {
  // addTodo: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};

function dispatchState(dispatch) {
  return bindActionCreators({
    addTodo,
  }, dispatch);
}

function mapState(state) {
  return {
    userInfo: state.user.userInfo,
  };
}

export default connect(mapState)(TodoInput);
