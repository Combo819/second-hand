export default function profile(state='', action) {//state in this function means state.name
    switch (action.type) {
      case "profile":
        return action.owner;
      //you can add some 'case' to change state.name
      default:
        return state;
    }
  }