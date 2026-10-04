import { GET_SLIDER_IMAGES_FAIL, GET_SLIDER_IMAGES_REQUEST, GET_SLIDER_IMAGES_SUCCESS } from "../constants/sliderConstants";

const stateSliderImages = { sliderImages: [] };

function sliderImagesReducer(state = stateSliderImages, action) {
  switch (action.type) {
    case GET_SLIDER_IMAGES_REQUEST:
      return { ...state, loading: true };
    case GET_SLIDER_IMAGES_SUCCESS:
      return { ...state, loading: false, sliderImages: action.payload };
    case GET_SLIDER_IMAGES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export {sliderImagesReducer}