import React from 'react';
import {View,Button,Text,TextInput,StyleSheet} from 'react-native';

export default class ShoppingForm extends React.Component {
	
	constructor(props) {
		super(props);
		if(props.mode === "Add") {
			this.state = {
				type:"",
				price:0,
				count:0
			}
		} else {
			this.state = {
				type:props.item.type,
				price:props.item.price,
				count:props.item.count
			}			
		}
	}
	
	addToList = () => {
		let item = {}
		console.log(this.state);
		console.log(this.props);
		if(this.props.mode === "Add") {
			item = {
				id:0,
				type:this.state.type,
				price:this.state.price,
				count:this.state.count
			}
		} else {
			item = {
				id:this.props.item.id,
				type:this.state.type,
				price:this.state.price,
				count:this.state.count				
			}
			this.props.navigation.navigate("Shopping List");
		}
		this.props.addToList(item);
		this.setState({
			type:"",
			count:0,
			price:0
		})
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
					<Text>Type:</Text>
					<TextInput onChangeText={
								(text) => this.setState({
											type:text
											})
								}
								value={this.state.type}
								placeholder="Item type"/>
				</View>
				<View style={styles.formGroupStyle}>
					<Text>Count:</Text>
					<TextInput onChangeText={
								(text) => this.setState({
											count:text
											})
								}
								value={this.state.count}
								placeholder="No of Items"
								keyboardType="numeric"/>
				</View>
				<View style={styles.formGroupStyle}>
					<Text>Price:</Text>
					<TextInput onChangeText={
								(text) => this.setState({
											price:text
											})
								}
								value={this.state.price}
								placeholder="Price of items"
								keyboardType="numeric"/>
				</View>
				<Button onPress={this.addToList} title={this.props.mode}/>
			</View>
		)	
	}
}