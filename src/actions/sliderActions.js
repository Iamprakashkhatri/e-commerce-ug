import axios from "axios";
import { API } from "../config";
import { GET_SLIDER_IMAGES_FAIL, GET_SLIDER_IMAGES_REQUEST, GET_SLIDER_IMAGES_SUCCESS } from "../constants/sliderConstants";

const getSliderImages = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SLIDER_IMAGES_REQUEST });
    const { data } = await axios.get(`${API}/misc/slider-images/`);
    dispatch({
      type: GET_SLIDER_IMAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_SLIDER_IMAGES_FAIL, payload: error.message });
  }
};

export {getSliderImages}