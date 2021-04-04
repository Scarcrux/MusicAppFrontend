import Axios from "axios";
import {
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAIL,
} from "../constants/addressConstants";

const  createAddress = (streetName, city, state, zip) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ADDRESS_REQUEST, payload: {streetName, city, state, zip} });
    const { data } = await Axios.post("http://127.0.0.1:5000/createaddress", { streetName, city, state, zip},{
    });
    dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ADDRESS_FAIL, payload: error.message });
  }
}
export {
  createAddress
};

