import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import NavBar from './components/NavBar';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
		<NavBar/>
		<hr/>
		<Switch>
			<Route exact path="/" render={() =>
				<ShoppingList/>
			}/>	
			<Route  path="/form" render={() =>
				<ShoppingForm/>
			}/>				
		<ShoppingForm/>
		</Switch>
	</div>
  );
}

export default App;
