import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import KMeansReducer from './reducer_kmeans'
const rootReducer = combineReducers({
  form:formReducer,
  kmeans:KMeansReducer
});

export default rootReducer;