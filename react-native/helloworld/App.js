import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name:"World"
		}
	}
	
    render() {
	  return (
		<View style={styles.container}>
		  <Text>Enter name:</Text>
		  <TextInput onChangeText={text => this.setState({name:text})}
			style={styles.textInput}
			value={this.state.text}/>
		  <Text>Hello, {this.state.name}</Text>
		  <StatusBar style="auto" />
		</View>
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
  textInput: {
	  backgroundColor:"red"
  }
});
