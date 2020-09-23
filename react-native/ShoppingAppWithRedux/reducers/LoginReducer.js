import {
	LOADING,
	LOADING_DONE,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED
} from '../actions/LoginActions';

const initialState = {
	isLogged:false,
	token:"",
	loading:false,
	error:""
}

const loginReducer = (state=initialState,action) => {
	switch(action.type) {
		case LOADING:
			return {
				...state,
				error:"",
				loading:true
			}
		case LOADING_DONE:
			return {
				...state,
				error:"",
				loading:false
			}
		case REGISTER_SUCCESS:
			return {
				...state,
				error:"",
				loading:false
			}
		case REGISTER_FAILED: {
			return {
				...state,
				error:action.error,
				loading:false
			}
		}
		case LOGIN_SUCCESS: {
			return {
				token:action.token,
				isLogged:true,
				error:"",
				loading:false
			}
		}
		case LOGIN_FAILED: 
			return {
				...state,
				error:action.error,
				loading:false
			}
		case LOGOUT_SUCCESS: 
			return {
				token:"",
				isLogged:false,
				error:"",
				loading:false
			}
		case LOGOUT_FAILED: 
			return {
				token:"",
				isLogged:false,
				error:action.error,
				loading:false
			}		
		default:
			return state;
	}
}

export default loginReducer;