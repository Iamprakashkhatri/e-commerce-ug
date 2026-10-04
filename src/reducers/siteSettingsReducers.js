import {
  GET_SITE_SETTINGS_FAIL,
  GET_SITE_SETTINGS_REQUEST,
  GET_SITE_SETTINGS_SUCCESS,
} from "../constants/siteSettingsConstants";

const stateSiteSettings = { siteSettings: {} };

function getSiteSettingsReducer(state = stateSiteSettings, action) {
  switch (action.type) {
    case GET_SITE_SETTINGS_REQUEST:
      return { ...state, loading: true };
    case GET_SITE_SETTINGS_SUCCESS:
      return { ...state, loading: false, siteSettings: action.payload };
    case GET_SITE_SETTINGS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export { getSiteSettingsReducer };
