import initialState from './_initialState';
import {GET_USERS} from '../actions/_definitions';

export default function users(state = initialState.userTestUsers, action) {
  switch (action.type) {  
    case GET_USERS:
      return action.data; 
    default:
      return state;
  }
}
