import { combineReducers } from 'redux';
import auth from './auth';
import wardrobe from './wardrobe';

export default combineReducers({
    auth,
    wardrobe
});
