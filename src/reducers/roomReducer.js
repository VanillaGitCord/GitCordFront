import { CREATE_ROOM } from "../constants/actionTypes";

const initialState = {
  roomId: ""
};

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return;
    default:
      return state;
  }
}

export default roomReducer;
