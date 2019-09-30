import React from "react";

export const Store = React.createContext({
  companies: {
    byId: {},
    ids: [],
  },
});
