import {combineReducers} from 'redux';

// reducer data
import userData from './users';
import photoData from './photos';
import routes from './routes';

// combine
const reducers = combineReducers({ userData, photoData, routes });

// export
export default reducers
