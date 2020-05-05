
const getInitialStateFromStorage = () => {
	if(sessionStorage.getItem("state")) {
		let state = JSON.parse(sessionStorage.getItem("state"))
		return state
	} else {
		return {
			list:[],
			id:100
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("state",JSON.stringify(state));
}

const initialState = getInitialStateFromStorage();

const shoppingReducer = (state=initialState, action) => {
	console.log(action);
	let tempState = {}
	switch(action.type) {
		case "ADD_TO_LIST":
			console.log("ShoppingReducer - ADD_TO_LIST");
			let tempItem = {
				id:state.id,
				type:action.item.type,
				count:action.item.count,
				price:action.item.price
			}
			let tempList = state.list.concat(tempItem);
			tempState = {
				list:tempList,
				id:state.id+1
			}
			saveToStorage(tempState);
			return tempState;
		case "REMOVE_FROM_LIST":
			console.log("ShoppingReducer - REMOVE_FROM_LIST");
			let tempId = parseInt(action.id,10);
			let tempList2 = [];
			for(let i=0;i<state.list.length;i++) {
				if(tempId !== state.list[i].id) {
					tempList2.push(state.list[i]);
				}
			}
			tempState = {
				...state,
				list:tempList2
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default shoppingReducer;