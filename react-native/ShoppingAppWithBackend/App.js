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
			isLogged:false,
			token:"",
			item:{},
			mode:"Add"
		}
	}
	
	componentDidMount() {
		if(this.state.isLogged) {
			this.getList();
		}
	}
	
	getList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					  "token":this.state.token}
		}
		fetch("http://pm-harkka-backend.herokuapp.com/api/shopping",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					})
				}).catch(error => {
					console.log(error)
				})
			} else {
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			console.log(error);
		})
	}
	
	addToList = (item) => {
		if(item.id === 0) {
			let request = {
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json",
						  "token":this.state.token},
				body:JSON.stringify(item)
			}
			fetch("http://pm-harkka-backend.herokuapp.com/api/shopping",request).then(response => {
				if(response.ok) {
					this.getList();
				} else {
					console.log("Server responded with status:",response.status)
				}
			}).catch(error => {
				console.log(error);
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
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
					  "token":this.state.token}
		}
		fetch("http://pm-harkka-backend.herokuapp.com/api/shopping/"+id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			console.log(error);
		})
	}
	
	editItem = (item) => {
		this.setState({
			item:item,
			mode:"Edit"
		})
	}
	
	register = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("http://pm-harkka-backend.herokuapp.com/register",request).then(response => {
			if(response.ok) {
				alert("Register success")
			} else {
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			console.log(error);
		})
	}
	
	login = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("http://pm-harkka-backend.herokuapp.com/login",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						token:data.token,
						isLogged:true
					}, () => {
						this.getList();
					})
				}).catch(error => {
					console.log(error)
				})
			} else {
				console.log("Server responded with status:",response.status)
			}
		}).catch(error => {
			console.log(error);
		})
	}
	
	logout = () => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token}
		}
		fetch("http://pm-harkka-backend.herokuapp.com/logout",request).then(response => {
			this.setState({
				token:"",
				isLogged:false,
				list:[]
			})
		}).catch(error => {
			console.log(error);
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
								editItem={this.editItem}
								logout={this.logout}/>}
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
