import produce from "immer";

import { RECEIVE_CHAT } from "../constants/actionTypes";

const initialState = {
  chatLogs: []
};

function socketReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CHAT:
      return produce(state, draft => {
        draft.chatLogs.push(action.payload);
      });

    default:
      return state;
  }
}

export default socketReducer;
