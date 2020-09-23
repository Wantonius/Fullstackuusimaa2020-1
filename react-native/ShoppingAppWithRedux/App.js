import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import loginReducer from './reducers/LoginReducer';
import Container from './Container';
import shoppingReducer from './reducers/ShoppingReducer';

let rootReducer = combineReducers({
	login:loginReducer,
	shopping:shoppingReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default class App extends React.Component {

	render() {
		return (
		    <Provider store={store}>
				<Container/>
			</Provider>
		 );
	  }
}






