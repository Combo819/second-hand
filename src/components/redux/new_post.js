export default function newPost(state=false, action) {//state in this function means state.name
    switch (action.type) {
      case "newPost":
        return action.newPost;
      //you can add some 'case' to change state.name
      default:
        return state;
    }
  }