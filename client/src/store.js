import  { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

//store takes a root reducer, initial state and middleware
const store = createStore(
    rootReducer,
    initialState,
    compose(
    applyMiddleware(...middleware),
    //dev tools extension set up
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;