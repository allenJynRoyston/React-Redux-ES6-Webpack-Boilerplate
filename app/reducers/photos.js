import initialState from './_initialState';
import {GET_PHOTOS} from '../actions/_definitions';

export default function photos(state = initialState.userTestPhotos, action) {
  switch (action.type) {  
    case GET_PHOTOS:
      return action.data; 
    default:
      return state;
  }
}
