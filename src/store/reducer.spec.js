import { ActionTypes } from "./actions";
import { reducer } from "./reducer";

const initialState = reducer(undefined, {});

describe("Reducer", () => {
  describe("ADD_SYMBOL action", () => {
    it("adds a new symbol as the first element", () => {
      const action = { type: ActionTypes.ADD_SYMBOL, payload: "GOOG" };
      const state = reducer(initialState, action);
      const symbol = action.payload;

      expect(state.symbols).toHaveLength(1);
      expect(state.symbols[0]).toEqual(symbol);
    });
  });
});
