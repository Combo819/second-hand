import { createStore,combineReducers } from "redux";

import user from './user.js'
import postId from './detail'
import profile from './profile'
import edit from './edit'
function setUser(username) {
    return {
      type: 'SET_USER',
      username:{
          ...store.getState().user,
          username
      }
    };
  }
function setUserAv(url){
    return{
        type:'SET_AV',
        avatar:{
            ...store.getState().user,
            avatar:url
        }
    }
}
function detailTitle(postId){
    return {
        type: 'Title',
       postId
      };
}
function setProfile(owner){
    return {
        type: 'profile',
       owner
      };
}
function setEdit(postId){
    return {
        type: 'edit',
       postId
      };
}

  const reducer = combineReducers({
    user,
    postId,
    profile,
    edit
  })

const store = createStore(reducer);
//store.subscribe(() => console.log(store.getState()));
export { store, setUser,detailTitle,setUserAv,setProfile,setEdit };
