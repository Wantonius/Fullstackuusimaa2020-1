import {loading,endLoading, logoutSuccess} from './loginActions';

export const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS"
export const FETCH_CONTACTS_FAILED = "FETCH_CONTACTS_FAILED"
export const ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS"
export const ADD_CONTACT_FAILED = "ADD_CONTACT_FAILED"
export const REMOVE_CONTACT_SUCCESS = "REMOVE_CONTACT_SUCCESS"
export const REMOVE_CONTACT_FAILED = "REMOVE_CONTACT_FAILED"
export const EDIT_CONTACT_SUCCESS = "EDIT_CONTACT_SUCCESS"
export const EDIT_CONTACT_FAILED = "EDIT_CONTACT_FAILED"
export const CLEAR_CONTACTREDUCER_STATE = "CLEAR_CONTACTREDUCER_STATE"
export const CHANGE_MODE = "CHANGE_MODE"

//Contact actions

export const getContacts = (token, search) => {
	return dispatch => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
			token:token}
		}
		let url = "/api/contact";
		if(search) {
			url = url + "?lastname="+search
		}
		dispatch(loading());
		fetch(url,request).then(response => {
			dispatch(endLoading());
			if(response.ok) {
				response.json().then(data => {
					dispatch(fetchContactsSuccess(data))
				}).catch(error => {
					dispatch(fetchContactsFailed("Failed to parse information. Try again"));
				})
			} else {
				if(response.status === 403) {
					dispatch(fetchContactsFailed("Server responded with session failure. Logging out!"));
					dispatch(logoutSuccess());
					dispatch(clearContactReducerState());
				} else {
					dispatch(fetchContactsFailed("Server responded with status:"+response.statusText));
				}
			}
		}).catch(error => {
			dispatch(endLoading());
			dispatch(fetchContactsFailed("Server responded with an error:"+error));
		})
	}
}

export const addContact = (token,contact) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
			token:token},
			body:JSON.stringify(contact)
		}
		dispatch(loading());
		fetch("/api/contact",request).then(response => {
			dispatch(endLoading())
			if(response.ok) {
				dispatch(addContactSuccess());
				dispatch(getContacts(token))
			}else {
				if(response.status === 403) {
					dispatch(addContactFailed("Server responded with session failure. Logging out!"));
					dispatch(logoutSuccess());
					dispatch(clearContactReducerState());
				} else {
					dispatch(addContactFailed("Server responded with status:"+response.statusText));
				}
			}
		}).catch(error => {
			dispatch(endLoading());
			dispatch(addContactFailed("Server responded with an error:"+error))
		})
	}
}

export const removeContact = (token,id) => {
	return dispatch => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
			token:token}
		}
		dispatch(loading());
		let url = "/api/contact/"+id
		fetch(url,request).then(response => {
			dispatch(endLoading())
			if(response.ok) {
				dispatch(removeContactSuccess());
				dispatch(getContacts(token))
			} else{
				if(response.status === 403) {
					dispatch(removeContactFailed("Server responded with session failure. Logging out!"));
					dispatch(logoutSuccess());
					dispatch(clearContactReducerState());
				} else {
					dispatch(removeContactFailed("Server responded with status:"+response.statusText));
				}
			}
		}).catch(error => {
			dispatch(endLoading());
			dispatch(removeContactFailed("Server responded with an error:"+error))
		})
	}
}


export const editContact = (token,contact) => {
	return dispatch => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json",
			token:token},
			body:JSON.stringify(contact)
		}
		let url = "/api/contact/"+contact._id
		dispatch(loading());
		fetch(url,request).then(response => {
			dispatch(endLoading())
			if(response.ok) {
				dispatch(editContactSuccess());
				dispatch(getContacts(token))
			} else{
				if(response.status === 403) {
					dispatch(editContactFailed("Server responded with session failure. Logging out!"));
					dispatch(logoutSuccess());
					dispatch(clearContactReducerState());
				} else {
					dispatch(editContactFailed("Server responded with status:"+response.statusText));
				}
			}
		}).catch(error => {
			dispatch(endLoading());
			dispatch(editContactFailed("Server responded with an error:"+error))
		});
	}
	
}

//Action creators

export const fetchContactsSuccess = (list) => {
	return {
		type:FETCH_CONTACTS_SUCCESS,
		list:list
	}
}

export const fetchContactsFailed = (error) => {
	return {
		type:FETCH_CONTACTS_FAILED,
		error:error
	}
}

export const addContactSuccess = () => {
	return {
		type:ADD_CONTACT_SUCCESS
	}
}

export const addContactFailed = (error) => {
	return {
		type:ADD_CONTACT_FAILED,
		error:error
	}
}

export const removeContactSuccess = () => {
	return {
		type:REMOVE_CONTACT_SUCCESS
	}
}

export const removeContactFailed = (error) => {
	return {
		type:REMOVE_CONTACT_FAILED,
		error:error
	}
}

export const editContactSuccess = () => {
	return {
		type:EDIT_CONTACT_SUCCESS
	}
}

export const editContactFailed = (error) => {
	return {
		type:EDIT_CONTACT_FAILED,
		error:error
	}
}

export const clearContactReducerState = () => {
	return {
		type:CLEAR_CONTACTREDUCER_STATE
	}
}

export const changeMode = (mode,contact) => {
	return {
		type:CHANGE_MODE,
		mode:mode,
		contact:contact
	}
}
