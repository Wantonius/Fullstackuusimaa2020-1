import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';

export default class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			id:100
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
			let tempList = [];
			for(let i=0;i<this.state.list.length;i++) {
				if(this.state.list[i].id === item.id) {
					tempList.push(item)
				} else {
					tempList.push(this.state.list[i]);
				}
			}
			this.setState({
				list:tempList
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
	
	
  render() {
	  return (
		<View style={styles.container}>
			<ShoppingForm addToList={this.addToList}/>
			<ShoppingList removeFromList={this.removeFromList} list={this.state.list} addToList={this.addToList}/>
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
});
