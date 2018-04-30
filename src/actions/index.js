import { 
    GET_ALL_CAKES_REQUEST,
    GET_ALL_CAKES_SUCCESS,
    GET_ALL_CAKES_ERROR,
    GET_SINGLE_CAKE_REQUEST,
    GET_SINGLE_CAKE_SUCCESS,
    GET_SINGLE_CAKE_ERROR,
    ADD_CAKE_SUCCESS,
    ADD_CAKE_ERROR,
    CLEAR_NOTIFICATION,
} from './actionTypes';

import {
    getAllCakes as getAllCakesApi,
    getSingleCake as getSingleCakeApi,
    addCake as addCakeApi
} from '../api';


// GET ALL CAKES

export function getAllCakes(){
    return dispatch => {
        dispatch(getAllCakesRequest());

        return getAllCakesApi()
            .then(response =>
                dispatch(getAllCakesSuccess(response))
            )
            .catch(error => 
                dispatch(getAllCakesError(error))
            );
    }
}

export function getAllCakesRequest(){
    return {
        type: GET_ALL_CAKES_REQUEST,
    }
}

export function getAllCakesSuccess(response){
    return {
        type: GET_ALL_CAKES_SUCCESS,
        payload: {
            cakes: response,
        }
    }
}

export function getAllCakesError(error){
    return {
        type: GET_ALL_CAKES_ERROR,
        payload: {
            error: error.message,
        }
    }
}

// GET SINGLE CAKE

export function getSingleCake(id){
    return dispatch => {
        dispatch(getSingleCakeRequest());

        return getSingleCakeApi(id)
            .then(response =>
                dispatch(getSingleCakeSuccess(response))
            )
            .catch(error => 
                dispatch(getSingleCakeError(error))
            );
    }
}

export function getSingleCakeRequest(){
    return {
        type: GET_SINGLE_CAKE_REQUEST,
    }
}

export function getSingleCakeSuccess(response){
    return {
        type: GET_SINGLE_CAKE_SUCCESS,
        payload: {
            viewCake: response,
        }
    }
}

export function getSingleCakeError(error){
    return {
        type: GET_SINGLE_CAKE_ERROR,
        payload: {
            error: error.message,
        }
    }
}

// ADD CAKE

export function addCake(values){
    return dispatch => {
        return addCakeApi(values)
            .then(response => 
                dispatch(addCakeSuccess())
            )
            .catch(error => { 
                dispatch(getAllCakesError(error))
            });
    }
}

export function addCakeSuccess(values){
    return {
        type: ADD_CAKE_SUCCESS,
    }
}

export function addCakeError(error){
    return {
        type: ADD_CAKE_ERROR,
        payload: {
            error: error.message,
        }
    }
}

export function clearNotification(){
    return {
        type: CLEAR_NOTIFICATION,
    }
}