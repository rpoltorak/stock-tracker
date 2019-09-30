import omitBy from "lodash.omitby";
import { ActionTypes } from "./actions";

const initialState = {
  companies: {
    byId: {},
    ids: [],
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMPANY:
      return addCompany(state, action.payload);
    case ActionTypes.REMOVE_COMPANY:
      return removeCompany(state, action.payload);
    default:
      return state;
  }
}

function addCompany(state, company) {
  const { symbol } = company;

  if (!symbol || state.companies.ids.includes(symbol)) {
    return state;
  }

  return {
    ...state,
    companies: {
      byId: {
        ...state.companies.byId,
        [symbol]: company,
      },
      ids: [...state.companies.ids, symbol],
    },
  };
}

function removeCompany(state, symbol) {
  return {
    companies: {
      byId: omitBy(state.companies.byId, item => item.symbol === symbol),
      ids: state.companies.ids.filter(item => item !== symbol),
    },
  };
}
