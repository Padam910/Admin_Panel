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

const Model = {
  isLoading: false,
  createSuccess: false,
  createFailed: false,
  viewSuccess: null,
  viewFailed: false,
  deleteSuccess: false,
  deleteFailed: false,
  data: []
}

const NotesReducer = (state=Model,action)=>{
  switch(action.type)
  {
    case CREATE_NOTE_REQUEST : return {
      ...state,
      isLoading: true,
      createSuccess: false,
      createFailed: false
    }

    case CREATE_NOTE_SUCCESS : return {
      ...state,
      isLoading: false,
      createSuccess: true,
      createFailed: false,
      data: [...state.data,action.payload]
    }

    case CREATE_NOTE_FAILED : return {
      ...state,
      isLoading: false,
      createSuccess: false,
      createFailed: true,
      data: []
    }

    case VIEW_NOTE_REQUEST : return {
      ...state,
      isLoading: true,
      createSuccess: false,
      createFailed: false,
      viewSuccess: false,
      viewFailed: false,
      data: []
    }

    case VIEW_NOTE_SUCCESS : return {
      ...state,
      isLoading: false,
      createSuccess: false,
      createFailed: false,
      viewSuccess: true,
      viewFailed: false,
      data: action.payload
    }

    case VIEW_NOTE_FAILED : return {
      ...state,
      isLoading: false,
      createSuccess: false,
      createFailed: false,
      viewSuccess: false,
      viewFailed: true,
      data: []
    }

    case DELETE_NOTE_REQUEST : return {
      ...state,
      isLoading: true,
      createSuccess: false,
      createFailed: false,
      viewSuccess: false,
      viewFailed: false,
      deleteSuccess: false,
      deleteFailed: false
    }

    case DELETE_NOTE_SUCCESS : {
        state.data.splice(action.index,1);
        return {
        ...state,
        isLoading: false,
        createSuccess: false,
        createFailed: false,
        viewSuccess: false,
        viewFailed: false,
        deleteSuccess: true,
        deleteFailed: false
      }
    }

    case DELETE_NOTE_FAILED : return {
      ...state,
      isLoading: false,
      createSuccess: false,
      createFailed: false,
      viewSuccess: false,
      viewFailed: false,
      deleteSuccess: false,
      deleteFailed: true
    }

    default : return state;
  }
}

export default NotesReducer;
