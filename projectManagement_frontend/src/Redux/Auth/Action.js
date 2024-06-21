import { API_BASE_URL } from "@/config/api";
import { GET_USER_REQUEST, 
    LOGIN_REQUEST, LOGOUT, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    LOGIN_SUCCESS, 
    GET_USER_SUCCESS } from "./ActionType";
import axios from "axios";

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: REGISTER_SUCCESS, payload: data });
        }
        console.log("Register success", data); // Optionally log success
    } catch (error) {
        console.log("Register error", error); // Log the error
        dispatch({ type: REGISTER_FAILURE, error: error.message }); // Dispatch failure action
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signing`, userData); //signing
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
            dispatch({ type: LOGIN_SUCCESS, payload: data });
        }
        console.log("user success", data);
    } catch (error) {
        console.log("error", error);
    }
};

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        });
      
            dispatch({ type: GET_USER_SUCCESS, payload: data });
       
        
        console.log("Get user success", data);
    } catch (error) {
        console.log("error", error);
    }
};

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
};
