import api from "@/config/api";
import * as actionTypes from "./ActionType";

// Action to send a message
export const sendMessage = (messageData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.SEND_MESSAGE_REQUEST });

        try {
            const response = await api.post("/api/message/send", messageData);
            dispatch({
                type: actionTypes.SEND_MESSAGE_SUCCESS,
                message: response.data,
            });
            console.log("Message sent", response.data);
        } catch (error) {
            console.error("Send message error:", error);
            dispatch({
                type: actionTypes.SEND_MESSAGE_FAILURE,
                error: error.message,
            });
        }
    };
};

// Action to fetch chat by project ID
export const fetchChatByProject = (projectId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_CHAT_BY_PROJECT_REQUEST });

        try {
            const response = await api.get(`/api/projects/${projectId}/chat`);
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_PROJECT_SUCCESS,
                chat: response.data,
            });
            console.log("Fetched chat", response.data);
        } catch (error) {
            console.error("Fetch chat by project error:", error);
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_PROJECT_FAILURE,
                error: error.message,
            });
        }
    };
};

// Action to fetch chat messages by chat ID
export const fetchChatMessage = (chatId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_CHAT_MESSAGES_REQUEST });

        try {
            const response = await api.get(`/api/message/chat/${chatId}`);
            dispatch({
                type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS,
                chatId,
                messages: response.data,
            });
            console.log("Fetched messages", response.data);
        } catch (error) {
            console.error("Fetch chat messages error:", error);
            dispatch({
                type: actionTypes.FETCH_CHAT_MESSAGES_FAILURE,
                error: error.message,
            });
        }
    };
};
