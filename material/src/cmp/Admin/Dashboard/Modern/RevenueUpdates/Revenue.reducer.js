import {
  REVENUE_REQUEST,
  REVENUE_SUCCESS,
  REVENUE_FAILED
} from "./Revenue.state";

const Model = {
  isLoading: null,
  success: false,
  failed: false,
  data: []
}
const RevenueReducer = (state=Model,action)=>{
  switch(action.type)
  {
    case REVENUE_REQUEST : return {
      ...state,
      isLoading: true,
      success: false,
      failed: false,
      data: []
    }

    case REVENUE_SUCCESS : return {
      ...state,
      isLoading: false,
      success: true,
      failed: false,
      data: action.payload
    }

    case REVENUE_FAILED : return {
      ...state,
      isLoading: false,
      success: false,
      failed: true,
      data: []
    }

    default : return state;
  }
}

export default RevenueReducer;
