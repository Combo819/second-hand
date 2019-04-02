export default function edit(state='', action) {//state in this function means state.name
    switch (action.type) {
      case "edit":
        return action.postId;
      //you can add some 'case' to change state.name
      default:
        return state;
    }
  }