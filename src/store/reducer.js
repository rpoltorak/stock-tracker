import { ActionTypes } from "./actions";

const initialState = {
  symbols: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_SYMBOL:
      return addSymbol(state, action.payload);
    case ActionTypes.REMOVE_SYMBOL:
      return removeSymbol(state, action.payload);
    default:
      return state;
  }
}

function addSymbol(state, symbol) {
  if (!symbol) {
    return state;
  }

  if (state.symbols.includes(symbol)) {
    return state;
  }

  return {
    ...state,
    symbols: [...state.symbols, symbol],
  };
}

function removeSymbol(state, symbol) {
  return {
    ...state,
    symbols: state.symbols.filter(item => item !== symbol),
  };
}
