import  { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };

  const persistedState = loadState();

  

//store takes a root reducer, initial state and middleware
const store = createStore(
    rootReducer,
    persistedState,
    compose(
    applyMiddleware(...middleware),
    //dev tools extension set up
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.subscribe(() => {
    saveState(store.getState());
  });

export default store;