import {
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
  } from "../constants/userConstants";
  

  function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  function userSigninReducer(state = {}, action) {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loading: true };
      case USER_SIGNIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT_REQUEST:
          return { loading: true };
      case USER_LOGOUT_SUCCESS:
          return { };
      case USER_LOGOUT_FAIL:
          return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  export {
    userRegisterReducer,
    userSigninReducer
  }