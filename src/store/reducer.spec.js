import { ActionTypes } from "./actions";
import { reducer } from "./reducer";

const initialState = reducer(undefined, {});

describe("Reducer", () => {
  describe("ADD_COMPANY action", () => {
    it("adds a new company as the first element", () => {
      const company = {
        symbol: "GOOGL.ARG",
        name: "Alphabet Inc.",
        type: "Equity",
        region: "Argentina",
        marketOpen: "11:00",
        marketClose: "17:00",
        timezone: "UTC-03",
        currency: "ARS",
        matchScore: "0.7273",
      };

      const action = {
        type: ActionTypes.ADD_COMPANY,
        payload: company,
      };
      const state = reducer(initialState, action);

      expect(state.companies.ids).toHaveLength(1);
      expect(state.companies.byId).toEqual({
        "GOOGL.ARG": company,
      });
    });

    it("removes company of specified symbol", () => {
      const currentState = {
        companies: {
          byId: {
            "GOOGL.ARG": {
              symbol: "GOOGL.ARG",
              name: "Alphabet Inc.",
              type: "Equity",
              region: "Argentina",
              marketOpen: "11:00",
              marketClose: "17:00",
              timezone: "UTC-03",
              currency: "ARS",
              matchScore: "0.7273",
            },
          },
          ids: ["GOOGL.ARG"],
        },
      };

      const action = {
        type: ActionTypes.REMOVE_COMPANY,
        payload: "GOOGL.ARG",
      };

      const state = reducer(currentState, action);

      expect(state.companies.ids).toHaveLength(0);
      expect(state.companies.byId).toEqual({});
    });
  });
});
