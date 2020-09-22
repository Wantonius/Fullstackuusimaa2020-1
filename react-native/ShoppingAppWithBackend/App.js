import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';
import LoginPage from './LoginPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			id:100,
			isLogged:false,
			token:"",
			item:{},
			mode:"Add"
		}
	}
	
	addToList = (item) => {
		if(item.id === 0) {
			item.id = this.state.id;
			let tempList = this.state.list.concat(item);
			this.setState({
				id:item.id+1,
				list:tempList
			})	
		} else {
			let tempList = this.state.list;
			// FlatList ei näytä renderöivän itseään uudestaan, jos pituus ei muutu. Siksi hack!
			this.setState({
				list:[]
			}, () => {
				for(let i=0;i<tempList.length;i++) {
					if(item.id === tempList[i].id) {
						tempList.splice(i,1,item);
						this.setState({
							mode:"Add",
							item:{},
							list:tempList
						})
						return;
					}
				}				
			}) 
		}
	}
	
	removeFromList = (id) => {
		let tempId = parseInt(id,10);
		let tempList = this.state.list.filter(item => item.id !== tempId);
		this.setState({
			list:tempList
		})
	}
	
	editItem = (item) => {
		this.setState({
			item:item,
			mode:"Edit"
		})
	}
	
	register = (user) => {
		
	}
	
	login = (user) => {
		this.setState({
			isLogged:true
		})
	}
	
	logout = () => {
		this.setState({
			isLogged:false
		})
	}
	
	
  render() {
	  return (
		<NavigationContainer style={styles.container}>
			<Stack.Navigator>
			{this.state.isLogged ? (
					<>
						<Stack.Screen name="Shopping List">
						{props => <ShoppingList {...props} removeFromList={this.removeFromList} 
								list={this.state.list}
								editItem={this.editItem}/>}
						</Stack.Screen>
						<Stack.Screen name="Add Item">
						{props => <ShoppingForm {...props} addToList={this.addToList} mode={this.state.mode} item={this.state.item}/>}
						</Stack.Screen>
					</>
				)
				: (
					<>
						<Stack.Screen name="Login">
						{props => <LoginPage {...props} login={this.login} register={this.register}/>}
						</Stack.Screen>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
