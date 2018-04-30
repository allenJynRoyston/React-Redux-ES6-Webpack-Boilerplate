import { url } from './config';

export const getAllCakes = () => {
    return fetch(url + '/cakes')
        .then(response => response.json())
        .catch(error => { throw error; });
}

export const getSingleCake = (id) => {
    return fetch(url + '/cakes/' + id)
        .then(response => response.json())
        .catch(error => { throw error; });
}

export const addCake = (values) => {
    return fetch(url + '/cakes', {
        method: 'post',
        body: JSON.stringify(values)
      })
        .then(response => response)
        .catch(error => { throw error; });
}