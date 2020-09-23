import React from 'react';
import {View,TouchableHighlight,Text,TextInput,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {login} from './actions/LoginActions';
import {register} from './actions/LoginActions';

class LoginPage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:""
		}
	}
	
	register = () => {
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		this.props.dispatch(register(user));
	}
	
	login = () => {
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		this.props.dispatch(login(user));
	}

	render() {
		const styles = StyleSheet.create({
			formGroupStyle: {
				flexDirection:"row"
			}
		}) 		
		return(
			<View>
				<View style={styles.formGroupStyle}>
					<Text>Username:</Text>
					<TextInput onChangeText={(text) => this.setState({username:text})} 
					value={this.state.username} 
					placeholder="username"/>
				</View>
				<View style={styles.formGroupStyle}>
					<Text>Password:</Text>
					<TextInput onChangeText={(text) => this.setState({password:text})} 
					value={this.state.password} 
					secureTextEntry={true} 
					placeholder="password"/>
				</View>
				<View style={styles.formGroupStyle}>
				<TouchableHighlight onPress={this.register} style={{backgroundColor:"green",width:70,height:50,marginRight:10}}>
					<Text>Register</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={this.login} title="Login" style={{backgroundColor:"lightblue",width:70,height:50}}>
					<Text>Login</Text>
				</TouchableHighlight>
				</View>
			</View>	
		)	
	}
}

export default connect()(LoginPage);