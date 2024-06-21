import api from "@/config/api";
import * as actionTypes from "./ActionType";

// Action to create a comment
export const createComment = (commentData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.CREATE_COMMENT_REQUEST });

        try {
            const response = await api.post(`/api/comments`, commentData);
            console.log("Comment created", response.data);
            dispatch({ type: actionTypes.CREATE_COMMENT_SUCCESS, comment: response.data });
        } catch (error) {
            console.error("Error creating comment:", error);
            dispatch({ type: actionTypes.CREATE_COMMENT_FAILURE, error: error.message });
        }
    };
};

// Action to delete a comment
export const deleteComment = (commentId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_COMMENT_REQUEST });

        try {
            await api.delete(`/api/comments/${commentId}`);
            dispatch({ type: actionTypes.DELETE_COMMENT_SUCCESS, commentId });
        } catch (error) {
            console.error("Error deleting comment:", error);
            dispatch({ type: actionTypes.DELETE_COMMENT_FAILURE, error: error.message });
        }
    };
};

// Action to fetch comments for an issue
export const fetchComments = (issueId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_COMMENTS_REQUEST });

        try {
            const response = await api.get(`/api/comments/${issueId}`);
            console.log("Fetched comments", response.data);
            dispatch({ type: actionTypes.FETCH_COMMENTS_SUCCESS, comments: response.data });
        } catch (error) {
            console.error("Error fetching comments:", error);
            dispatch({ type: actionTypes.FETCH_COMMENTS_FAILURE, error: error.message });
        }
    };
};
