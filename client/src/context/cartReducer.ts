// An Interface For The Action
enum ActionType {}

interface Action {
  type: ActionType;
  payload: any;
}

// An interface For The State
interface State {}

const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default cartReducer;
