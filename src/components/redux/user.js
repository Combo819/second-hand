export default function user(state={username:'',avatar:''}, action) {//state in this function means state.name
    switch (action.type) {
      case "SET_USER":
        return action.username;
      //you can add some 'case' to change state.name
      case "SET_AV":
        return action.avatar;
      default:
        return state;
    }
  }