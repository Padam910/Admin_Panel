import {
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILED,
  VIEW_NOTE_REQUEST,
  VIEW_NOTE_SUCCESS,
  VIEW_NOTE_FAILED,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILED
} from "./Notes.state";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3434";

const createNoteRequest = (formData)=>{
  return async (dispatch)=>{
    try {
      dispatch({
        type: CREATE_NOTE_REQUEST
      });
      const response = await axios({
        method: "post",
        url: "/notes",
        data: formData
      });
      dispatch({
        type: CREATE_NOTE_SUCCESS,
        payload: response.data
      });
    }
    catch(err)
    {
      dispatch({
        type: CREATE_NOTE_FAILED
      });
    }
  }
}

const viewNoteRequest = ()=>{
  return async (dispatch)=>{
    try {
      const user = sessionStorage.getItem("user");
      let {userId} = JSON.parse(user);
      dispatch({
        type: VIEW_NOTE_REQUEST
      });
      const response = await axios({
        method: "get",
        url: "/notes/"+userId
      });
      dispatch({
        type: VIEW_NOTE_SUCCESS,
        payload: response.data.notes
      });
    }
    catch(err)
    {
      dispatch({
        type: VIEW_NOTE_FAILED
      });
    }
  }
}

const deleteRequest = (data)=>{
  return async (dispatch)=>{
    try {
      dispatch({
        type: DELETE_NOTE_REQUEST
      });
      await axios({
        method: "delete",
        url: "/notes/"+data._id
      });
      dispatch({
        type: DELETE_NOTE_SUCCESS,
        index: data.index
      })
    }
    catch(err)
    {
      dispatch({
        type: DELETE_NOTE_FAILED
      })
    }
  }
}

export {
  createNoteRequest,
  viewNoteRequest,
  deleteRequest
}
