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
			item:{},
			mode:"Add"
		}
	}
	
	editItem = (item) => {
		this.setState({
			item:item,
			mode:"Edit"
		})
	}
	
	cancel = () => {
		this.setState({
			item:{},
			mode:"Add"
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
						{props => <ShoppingList {...props}						
								editItem={this.editItem}/>}
						</Stack.Screen>
						<Stack.Screen name="Add Item">
						{props => <ShoppingForm {...props}  mode={this.state.mode} item={this.state.item} cancel={this.cancel}/>}
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
	let error = "";
	if(state.shopping.error) {
		error = state.shopping.error;
	}
	if(state.login.error) {
		error = state.login.error
	}
	return {
		isLogged:state.login.isLogged,
		token:state.login.token,
		error:error,
		loading:state.login.loading
	}
}

export default connect(mapStateToProps)(Container);