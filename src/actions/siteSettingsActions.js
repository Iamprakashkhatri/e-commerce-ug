import {
  GET_SITE_SETTINGS_FAIL,
  GET_SITE_SETTINGS_REQUEST,
  GET_SITE_SETTINGS_SUCCESS,
} from "../constants/siteSettingsConstants";
import axios from "axios";
import { API } from "../config";

const getSiteSettingsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SITE_SETTINGS_REQUEST });
    const { data } = await axios.get(`${API}/account/site-settings/`);
    dispatch({
      type: GET_SITE_SETTINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_SITE_SETTINGS_FAIL, payload: error.message });
  }
};

export { getSiteSettingsAction };
