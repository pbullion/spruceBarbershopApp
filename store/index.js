import { createStore, combineReducers } from 'redux';
import currentUserReducer from '../reducers/currentUserReducer';
import waitListUserReducer from '../reducers/waitListUserReducer';
import waitListFlowReducer from '../reducers/waitListFlowReducer';
import refreshReducer from '../reducers/refreshReducer';

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    waitListUser: waitListUserReducer,
    waitListFlow: waitListFlowReducer,
    refresh: refreshReducer
});

const store = createStore(rootReducer);

export default store;
