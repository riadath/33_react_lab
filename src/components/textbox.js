import React, { useReducer } from 'react';

const initialState = {
  textboxes: [],
  errors: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TEXTBOX':
      return {
        ...state,
        textboxes: [...state.textboxes, { id: Math.random(), value: '' }],
      };
    case 'DELETE_TEXTBOX':
      return {
        ...state,
        textboxes: state.textboxes.filter((textbox) => textbox.id !== action.payload),
      };
    case 'CHANGE_TEXTBOX':
      return {
        ...state,
        textboxes: state.textboxes.map((textbox) =>
          textbox.id === action.payload.id ? { ...textbox, value: action.payload.value } : textbox
        ),
        errors: state.textboxes.filter(
          (textbox) => !isNaN(textbox.value) && textbox.value.trim() !== ''
        ).length === 0 ? [] : state.textboxes.filter(({ value }) => !isNaN(value) && value.trim() !== '').map(({ id }) => id),
      };
    default:
      return state;
  }
};

const Textbox = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTextbox = () => {
    dispatch({ type: 'ADD_TEXTBOX' });
  };

  const handleDeleteTextbox = (id) => {
    dispatch({ type: 'DELETE_TEXTBOX', payload: id });
  };

  const handleChange = (id, value) => {
    dispatch({ type: 'CHANGE_TEXTBOX', payload: { id, value } });
  };

  const sum = state.textboxes.reduce((acc, { value }) => (isNaN(value) ? acc : acc + parseFloat(value)), 0);

  const renderTextbox = ({ id, value }) => (
    <div key={id}>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(id, e.target.value)}
        style={{ margin: '5px', borderColor: state.errors.includes(id) ? 'red' : '' }}
      />
      <button onClick={() => handleDeleteTextbox(id)} style={{ margin: '10px' }}>
        Delete
      </button>
    </div>
  );

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Dynamic Textboxes</h2>
      <button onClick={handleAddTextbox} style={{ margin: '10px' }}>
        Add Textbox
      </button>
      {state.textboxes.map(renderTextbox)}
      <div>Sum: {sum}</div>
    </div>
  );
};

export default Textbox;
