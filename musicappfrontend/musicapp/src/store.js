import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import {
  userSigninReducer,
  userRegisterReducer,
  userBioReducer,
  userPicReducer
} from './reducers/userReducers';
import {
  createAddressReducer
} from './reducers/addressReducers';
import {
  allEventReducer,
  createEventReducer,
  singleEventReducer
} from './reducers/eventReducers';
import {
  allListReducer, createListReducer, singleListReducer
} from './reducers/listReducers';

import Cookie from 'js-cookie';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  userSignin: { userInfo }
};

const rootReducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  createAddress: createAddressReducer,
  createList: createListReducer,
  createEvent: createEventReducer,
  allList: allListReducer,
  allEvent: allEventReducer,
  singleList: singleListReducer,
  singleEvent: singleEventReducer,
  userBio: userBioReducer,
  userPic: userPicReducer
});

const storeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  initialState,
  storeEnhancers(applyMiddleware(thunk))
);

export default store;