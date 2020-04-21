import { combineReducers } from 'redux';
import profileReducer from './profileReducer.js';

export default combineReducers({
    getProfile: profileReducer
});