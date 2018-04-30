import {
    GET_ALL_CAKES_REQUEST,
    GET_ALL_CAKES_SUCCESS,
    GET_ALL_CAKES_ERROR,
    GET_SINGLE_CAKE_REQUEST,
    GET_SINGLE_CAKE_SUCCESS,
    GET_SINGLE_CAKE_ERROR,
    ADD_CAKE_SUCCESS,
    ADD_CAKE_ERROR,
    CLEAR_NOTIFICATION
} from '../actions/actionTypes';

const initialState = {
    cakes: [],
    loading: false,
    loaded: false,
    error: null,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CAKES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_CAKES_SUCCESS:
            return {
                ...state,
                loading: false,
                cakes: action.payload.cakes,
                error: null,
            }
        case GET_ALL_CAKES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case GET_SINGLE_CAKE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_SINGLE_CAKE_SUCCESS:
            return {
                ...state,
                loading: false,
                viewCake: action.payload.viewCake,
                error: null,
            }
        case GET_SINGLE_CAKE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case ADD_CAKE_SUCCESS:
            return {
                ...state,
                notification: 'success',
                error: null,
            }
        case ADD_CAKE_ERROR:
            return {
                ...state,
                error: action.payload.error,
            }
        case CLEAR_NOTIFICATION:
            return {
                ...state,
                notification: null,
            }
        default: return state;
    }
}

export default reducer;
