import {clearShoppingState,getList} from './ShoppingActions';

export const LOADING = "LOADING";
export const LOADING_DONE = "LOADING_DONE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED"

//Actions

export const register = (user) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		fetch("http://pm-harkka-backend.herokuapp.com/register",request).then(response => {
			if(response.ok) {
				alert("Register success");
				dispatch(registerSuccess());
			} else {
				console.log("Server responded with status:",response.status)
				dispatch(registerFailed("Server responded with "+response.statusText));
			}
		}).catch(error => {
			console.log(error);
			dispatch(registerFailed(error));
		})
	}
}

export const login = (user) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		fetch("http://pm-harkka-backend.herokuapp.com/login",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					dispatch(loginSuccess(data.token));
					dispatch(getList(data.token));
				}).catch(error => {
					dispatch(loginFailed("Failed to parse user info:"+error))
				})
			} else {
				dispatch(loginFailed("Login failed responded with status:"+response.statusText))
			}
		}).catch(error => {
			dispatch(loginFailed(error));
		})
	}
}


export const logout = (token) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":token}
		}
		dispatch(loading())
		dispatch(clearShoppingState());
		fetch("http://pm-harkka-backend.herokuapp.com/logout",request).then(response => {
			if(response.ok) {
				dispatch(logoutSuccess())
			} else {
				dispatch(logoutFailed("Server responded with status:"+response.statusText))
			}
		}).catch(error => {
			dispatch(logoutFailed(error));
		})
	}
}	
//Action creators

export const loading = () => {
	return {
		type:LOADING
	}
}

export const loadingDone = () => {
	return {
		type:LOADING_DONE
	}
}

export const registerSuccess = () => {
	return {
		type:REGISTER_SUCCESS
	}
}
	
export const registerFailed = (error) => {
	return {
		type:REGISTER_FAILED,
		error:error
	}
}

export const loginSuccess = (token) => {
	return {
		type:LOGIN_SUCCESS,
		token:token
	}
}

export const loginFailed = (error) => {
	return {
		type:LOGIN_FAILED,
		error:error
	}
}

export const logoutSuccess = () => {
	return {
		type:LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error) => {
	return {
		type:LOGOUT_FAILED,
		error:error
	}
}