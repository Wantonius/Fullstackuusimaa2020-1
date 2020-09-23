import {logoutSuccess,loading,loadingDone} from './LoginActions'

export const GET_LIST_SUCCESS = "GET_LIST_SUCCESS"
export const GET_LIST_FAILED="GET_LIST_FAILED"
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS"
export const ADD_ITEM_FAILED = "ADD_ITEM_FAILED"
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS"
export const REMOVE_ITEM_FAILED = "REMOVE_ITEM_FAILED"
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS"
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED"
export const CLEAR_SHOPPING_STATE = "CLEAR_SHOPPING_STATE"


//Actions
export const getList = (token) => {
	return dispatch => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					  "token":token}
		}
		dispatch(loading());
		fetch("http://pm-harkka-backend.herokuapp.com/api/shopping",request).then(response => {
			dispatch(loadingDone())
			if(response.ok) {
				response.json().then(data => {
					dispatch(getListSuccess(data))
				}).catch(error => {
					dispatch(getListFailed("Parsing of user input failed:"+error));
				})
			} else {
				if(response.status === 403) {
					dispatch(getListFailed("Server responded with a session mismatch. Logging out!"));
					dispatch(logoutSuccess())
				} else {
					dispatch(getListFailed("Server responded with status:"+response.status))
				}
			}
		}).catch(error => {
			dispatch(loadingDone())
			dispatch(getListFailed("Server responded with an error:"+error))
		})
	}
}

export const addToList = (item,token) => {
	return dispatch => {
	    if(item.id === 0) {
			let request = {
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						  "token":token},
				body:JSON.stringify(item)
			}
			dispatch(loading())
			fetch("http://pm-harkka-backend.herokuapp.com/api/shopping",request).then(response => {
				dispatch(loadingDone())
				if(response.ok) {
					dispatch(getList(token));
					dispatch(addItemSuccess())
				} else {
					if(response.status === 403) {
						dispatch(addItemFailed("Server responded with a session mismatch. Logging out!"));
						dispatch(logoutSuccess())
					} else {
						dispatch(addItemFailed("Server responded with status:"+response.status))
					}
				}
			}).catch(error => {
				dispatch(loadingDone())
				dispatch(addItemFailed("Server responded with an error:"+error))
			})
		} else {
			let request = {
				method:"PUT",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":token},
				body:JSON.stringify(item)
			}
			dispatch(loading());
			fetch("http://pm-harkka-backend.herokuapp.com/api/shopping/"+item.id,request).then(response => {
				dispatch(loadingDone())
				if(response.ok) {
					dispatch(getList(token));
					dispatch(editItemSuccess())
				} else {
					if(response.status === 403) {
						dispatch(editItemFailed("Server responded with a session mismatch. Logging out!"));
						dispatch(logoutSuccess())
					} else {
						dispatch(editItemFailed("Server responded with status:"+response.status))
					}
				}
			}).catch(error => {
				dispatch(loadingDone())
				dispatch(editItemFailed("Server responded with an error:"+error))
			})
		}
	}
}

export const removeFromList = (id,token) => {
	return dispatch => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
					  "token":token}
		}
		dispatch(loading())
		fetch("http://pm-harkka-backend.herokuapp.com/api/shopping/"+id,request).then(response => {
			dispatch(loadingDone())
			if(response.ok) {
				dispatch(getList(token));
				dispatch(removeItemSuccess())
			} else {
				if(response.status === 403) {
					dispatch(removeItemFailed("Server responded with a session mismatch. Logging out!"));
					dispatch(logoutSuccess())
				} else {
					dispatch(removeItemFailed("Server responded with status:"+response.status))
				}
			}
			}).catch(error => {
				dispatch(loadingDone())
				dispatch(removeItemFailed("Server responded with an error:"+error))
			})
		}
}

//Action creators

export const getListSuccess = (list) => {
	return {
		type:GET_LIST_SUCCESS,
		list:list
	}
}

export const getListFailed = (error) => {
	return {
		type:GET_LIST_FAILED,
		error:error
	}
}

export const addItemSuccess = () => {
	return {
		type:ADD_ITEM_SUCCESS
	}
}

export const addItemFailed = (error) => {
	return {
		type:ADD_ITEM_FAILED,
		error:error
	}
}

export const removeItemSuccess = () => {
	return {
		type:REMOVE_ITEM_SUCCESS
	}
}

export const removeItemFailed = (error) => {
	return {
		type:REMOVE_ITEM_FAILED,
		error:error
	}
}

export const editItemSuccess = () => {
	return {
		type:EDIT_ITEM_SUCCESS
	}
}

export const editItemFailed = (error) => {
	return {
		type:EDIT_ITEM_FAILED,
		error:error
	}
}

export const clearShoppingState = () => {
	return {
		type:CLEAR_SHOPPING_STATE
	}
}