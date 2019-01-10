import { createStore, combineReducers } from 'redux';
import currentUserReducer from '../reducers/currentUserReducer';
import waitListFlowReducer from '../reducers/waitListFlowReducer';
import refreshReducer from '../reducers/refreshReducer';

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    waitListFlow: waitListFlowReducer,
    refresh: refreshReducer
});

const store = createStore(rootReducer);

export default store;
