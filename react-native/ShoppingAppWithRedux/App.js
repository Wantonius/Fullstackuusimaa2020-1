import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import loginReducer from './reducers/LoginReducer';
import Container from './Container';

const store = createStore(loginReducer,applyMiddleware(thunk))

export default class App extends React.Component {

	render() {
		return (
		    <Provider store={store}>
				<Container/>
			</Provider>
		 );
	  }
}






