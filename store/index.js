import { createStore, combineReducers } from 'redux';
import currentUserReducer from '../reducers/currentUserReducer';
import waitListFlowReducer from '../reducers/waitListFlowReducer';

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    waitListFlow: waitListFlowReducer
});

const store = createStore(rootReducer);

export default store;
