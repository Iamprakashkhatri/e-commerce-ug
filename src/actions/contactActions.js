import {
    GET_FAQ_LIST_REQUEST,
    GET_FAQ_LIST_SUCCESS,
    GET_FAQ_LIST_FAIL,
    POST_CONTACT_REQUEST,
    POST_CONTACT_SUCCESS,
    POST_CONTACT_FAIL,
  } from "../constants/contactConstants";
  
  import axios from "axios";
  import { API } from "../config";
  
  const getFAQ = () => async (dispatch) => {
    try {
      dispatch({ type: GET_FAQ_LIST_REQUEST });
      const { data } = await axios.get(`${API}/misc/faq/`);
      dispatch({
        type: GET_FAQ_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: GET_FAQ_LIST_FAIL, payload: error.message });
    }
  };

  const postContactFormData=(contactformData)=>async(dispatch)=>{
      try{
          dispatch({type:POST_CONTACT_REQUEST});

          const {data} = await axios.post(`${API}/misc/contact-us/`,contactformData)
          
          dispatch({type:POST_CONTACT_SUCCESS,payload: data});
          
      }
      catch(error){
        dispatch({type:POST_CONTACT_FAIL,payload:error.message});
      }
  }

  export { getFAQ,postContactFormData};