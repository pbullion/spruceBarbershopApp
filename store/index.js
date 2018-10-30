import { createStore, combineReducers } from 'redux';
import currentUserReducer from '../reducers/currentUserReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    currentUser: currentUserReducer
});

const store = createStore(rootReducer);

export default store;
