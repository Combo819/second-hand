export default function detail(state='', action) {//state in this function means state.name
    switch (action.type) {
      case "Title":
        return action.postId;
      //you can add some 'case' to change state.name
      default:
        return state;
    }
  }