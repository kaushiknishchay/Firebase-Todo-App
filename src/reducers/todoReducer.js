const initialState = {
  todoList: [
    {
      title: 'frondator ',
      text: 'asdSainthood is the only dogma, the only guarantee of mineral.sd',
    },
    {
      title: 'antverpia  ',
      text: 'Marshmellow fritters has to have a gooey, bitter eggs component. ',
    },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_TODO_IN_STATE':
      return {
        ...state,
        todoList: state.todoList.concat(payload),
      };
    default:
      return state;
  }
};
