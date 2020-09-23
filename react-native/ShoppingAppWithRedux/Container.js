import React from 'react';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';
import LoginPage from './LoginPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

class Container extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			item:{},
			mode:"Add"
		}
	}
	
	componentDidMount() {
		if(this.props.isLogged) {
			this.getList();
		}
	}
	
	getList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					  "token":this.props.token}
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
						  "token":this.props.token},
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
			let request = {
				method:"PUT",
				mode:"cors",
				headers:{"Content-type":"application/json",
						"token":this.state.token},
				body:JSON.stringify(item)
			}
			fetch("http://pm-harkka-backend.herokuapp.com/api/shopping/"+item.id,request).then(response => {
				if(response.ok) {
					this.setState({
						list:[]
					},() => {
						this.getList()
					})
				} else {
					console.log("Server responded with status:",response.status)
				}
			}).catch(error => {
				console.log(error);
			})
		}
	}
	
	removeFromList = (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
					  "token":this.props.token}
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

	render() {
		let title = "Shopping App"
		if(this.props.loading) {
			title = "Loading ..."
		}
		if(this.props.error.length > 0) {
			title = this.props.error
		}
		return(
		<NavigationContainer>
			<Stack.Navigator screenOptions={{
				title:title,
				headerStyle:{
					backgroundColor:"#00CCCC"
				}
			}}>
			{this.props.isLogged ? (
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
						{props => <LoginPage {...props} />}
						</Stack.Screen>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
		)
	}

}
const mapStateToProps = (state) => {
	return {
		isLogged:state.isLogged,
		token:state.token,
		error:state.error,
		loading:state.loading
	}
}

export default connect(mapStateToProps)(Container);