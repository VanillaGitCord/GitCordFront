import produce from "immer";

const initialState = {
  user: "",
  counter: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
