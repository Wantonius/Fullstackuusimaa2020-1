import React from 'react';
import {FlatList,View,TouchableHighlight,Text,StyleSheet,TextInput} from 'react-native';

export default class ShoppingList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id:0,
			type:"",
			price:0,
			count:0,
			editIndex:-1
		}
	}

	removeFromList = (id) => {
		this.props.removeFromList(id);
	}
	
	editItem = (index) => {
		this.setState({
			id:this.props.list[index].id,
			type:this.props.list[index].type,
			price:this.props.list[index].price,
			count:this.props.list[index].count,
			editIndex:index
		})
	}
	
	save = () => {
		let item = {
			id:this.state.id,
			type:this.state.type,
			price:this.state.price,
			count:this.state.count
		}
		this.props.addToList(item);
		this.cancel();
	}
	
	cancel = () => {
		this.setState({
			id:0,
			type:"",
			price:0,
			count:0,
			editIndex:-1			
		})		
	}

	render() {
		let styles = StyleSheet.create({
			textStyle:{
				fontSize:18,
				paddingRight:10,
				color:"green"
			},
			removeButtonStyle: {
				width:80,
				height:50,
				backgroundColor:"lightblue",
				justifyContent:"center",
				alignItems:"center"
			},
			editButtonStyle: {
				width:80,
				height:50,
				backgroundColor:"green",
				justifyContent:"center",
				alignItems:"center"
			},
			rowStyle:{
				flexDirection:"row",
				height:80
			},
			inputStyle:{
				backgroundColor:"lightblue",
				marginRight:10
			}
		})
		return(
				<FlatList data={this.props.list}
					renderItem={
						({item,index}) => {
							if(index != this.state.editIndex) {
								return (
									<View style={styles.rowStyle}>
										<Text style={styles.textStyle}>
											{item.count}
										</Text>
										<Text style={styles.textStyle}>
											{item.type}
										</Text>
										<Text style={styles.textStyle}>
											at {item.price}€
										</Text>
										<TouchableHighlight style={styles.removeButtonStyle}
											onPress={() => this.removeFromList(item.id)}>
											<Text>Remove</Text>
										</TouchableHighlight>
										<TouchableHighlight style={styles.editButtonStyle}
											onPress={() => this.editItem(index)}>
											<Text>Edit</Text>
										</TouchableHighlight>
									</View>
								)
							} else {
								return (
									<View style={styles.rowStyle}>
										<TextInput style={styles.inputStyle} onChangeText={
											(text) => this.setState({
												type:text
												})
											}
											value={this.state.type}/>
										<TextInput style={styles.inputStyle} onChangeText={
											(text) => this.setState({
												count:text
												})
											}
											value={this.state.count} keyboardType="numeric"/>
										<TextInput style={styles.inputStyle} onChangeText={
											(text) => this.setState({
												price:text
												})
											}
											value={this.state.price} keyboardType="numeric"/>
										<TouchableHighlight style={styles.editButtonStyle}
											onPress={() => this.save()}>
											<Text>Save</Text>
										</TouchableHighlight>
										<TouchableHighlight style={styles.removeButtonStyle}
											onPress={() => this.cancel()}>
											<Text>Cancel</Text>
										</TouchableHighlight>
									</View>
								)								
							}
						} 	
					}
					keyExtractor={item => ""+item.id}/>
		)	
	}

}