import {
    GET_FAQ_LIST_REQUEST,
    GET_FAQ_LIST_SUCCESS,
    GET_FAQ_LIST_FAIL,
    POST_CONTACT_REQUEST,
    POST_CONTACT_SUCCESS,
    POST_CONTACT_FAIL,
  } from "../constants/contactConstants";
  
  const stateFAQ = { faq: [] };
  const stateContact = { contact: {} };
  
  function faqReducer(state = stateFAQ, action) {
    switch (action.type) {
      case GET_FAQ_LIST_REQUEST:
        return { ...state, loading: true };
      case GET_FAQ_LIST_SUCCESS:
        return { ...state, loading: false, faq: action.payload };
      case GET_FAQ_LIST_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function contactReducer(state = stateContact, action) {
    switch (action.type) {
      case POST_CONTACT_REQUEST:
        return { ...state, loading: true };
      case POST_CONTACT_SUCCESS:
        return { ...state, loading: false, contact: action.payload };
      case POST_CONTACT_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  
  export { faqReducer, contactReducer };
  