import React from 'react';
import {FlatList,View,TouchableHighlight,Button,Text,StyleSheet} from 'react-native';

export default class ShoppingList extends React.Component {


	removeFromList = (id) => {
		this.props.removeFromList(id);
	}
	
	editItem = (index) => {
		this.props.editItem(this.props.list[index]);
		this.props.navigation.navigate("Add Item");
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
		<View>
			<Button onPress={() => this.props.navigation.navigate('Add Item')} title="Add Item"/>
				<FlatList data={this.props.list}
					renderItem={
						({item,index}) => {
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
					}}
					keyExtractor={item => ""+item.id}/>
		</View>			
		)	
	}

}