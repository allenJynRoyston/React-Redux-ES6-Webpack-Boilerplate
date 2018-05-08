import * as definitions from './_definitions';

export function photos() {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response =>
        response.json().then(data => ({
          data,
          status: response.status
        })))
      .then((response) => {
        if (response.status === 200) {
          dispatch({success: true, type: definitions.GET_PHOTOS, data: response.data})
        } else {
          let data = {
              type: 'error',
              title: 'Error getting task list',
              content: 'There was an error getting the task list. Please try again.'
          } 
          dispatch({success: false, type: 'DISPLAY_FLASH', data})
        }
      });
  };
}


export function users() {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response =>
        response.json().then(data => ({
          data,
          status: response.status
        })))
      .then((response) => {
        if (response.status === 200) {
          dispatch({success: true, type: definitions.GET_USERS, data: response.data})
        } else {
          let data = {
              type: 'error',
              title: 'Error getting task list',
              content: 'There was an error getting the task list. Please try again.'
          } 
          dispatch({success: false, type: 'DISPLAY_FLASH', data})
        }
      });
  };
}
