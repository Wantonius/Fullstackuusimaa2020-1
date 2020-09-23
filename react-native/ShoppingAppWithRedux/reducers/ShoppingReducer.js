import {
GET_LIST_SUCCESS,
GET_LIST_FAILED,
ADD_ITEM_SUCCESS,
ADD_ITEM_FAILED,
REMOVE_ITEM_SUCCESS,
REMOVE_ITEM_FAILED,
EDIT_ITEM_SUCCESS,
EDIT_ITEM_FAILED,
CLEAR_SHOPPING_STATE
} from '../actions/ShoppingActions';

const initialState = {
	list:[],
	error:""
}

const shoppingReducer = (state = initialState, action) => {
	switch(action.type) {
		case GET_LIST_SUCCESS:
			return {
				list:action.list,
				error:""
			}
		case EDIT_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case ADD_ITEM_SUCCESS:
			return {
				...state,
				error:""
			}
		case ADD_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case REMOVE_ITEM_SUCCESS:
			return {
				...state,
				error:""
			}
		case REMOVE_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case EDIT_ITEM_SUCCESS:
			return {
				list:[],
				error:""
			}
		case EDIT_ITEM_FAILED:
			return {
				...state,
				error:action.error
			}
		case CLEAR_SHOPPING_STATE:
			return {
				list:[],
				error:""
			}
		default:
			return state;
	}
	
} 

export default shoppingReducer;