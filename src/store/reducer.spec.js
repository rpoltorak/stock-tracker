import { ActionTypes } from "./actions";
import { reducer } from "./reducer";

const initialState = reducer(undefined, {});

describe("Reducer", () => {
  describe("ADD_COMPANY action", () => {
    it("adds a new company as the first element", () => {
      const action = {
        type: ActionTypes.ADD_COMPANY,
        payload: { name: "Alphabet", symbol: "GOOG" },
      };
      const state = reducer(initialState, action);

      expect(state.companies).toHaveLength(1);
      expect(state.companies).toEqual([{ name: "Alphabet", symbol: "GOOG" }]);
    });
  });
});
