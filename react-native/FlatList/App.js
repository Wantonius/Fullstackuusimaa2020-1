import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
	{
		"firstname": "Samuel",
		"lastname": "Dean",
		"id": 1
	},
	{
		"firstname": "Salvador",
		"lastname": "Wade",
		"id": 2
	},
	{
		"firstname": "Ivana",
		"lastname": "Dotson",
		"id": 3
	},
	{
		"firstname": "Darius",
		"lastname": "Roman",
		"id": 4
	},
	{
		"firstname": "Abigail",
		"lastname": "Chan",
		"id": 5
	},
	{
		"firstname": "Brett",
		"lastname": "Freeman",
		"id": 6
	},
	{
		"firstname": "Jason",
		"lastname": "Molina",
		"id": 7
	},
	{
		"firstname": "Whilemina",
		"lastname": "Vazquez",
		"id": 8
	},
	{
		"firstname": "Nathaniel",
		"lastname": "Clark",
		"id": 9
	},
	{
		"firstname": "Mercedes",
		"lastname": "Morin",
		"id": 10
	},
	{
		"firstname": "Ira",
		"lastname": "Forbes",
		"id": 11
	},
	{
		"firstname": "Athena",
		"lastname": "Thompson",
		"id": 12
	},
	{
		"firstname": "Quentin",
		"lastname": "Day",
		"id": 13
	},
	{
		"firstname": "Cameran",
		"lastname": "Morin",
		"id": 14
	},
	{
		"firstname": "Minerva",
		"lastname": "Ortega",
		"id": 15
	},
	{
		"firstname": "Yen",
		"lastname": "Blackburn",
		"id": 16
	},
	{
		"firstname": "Adrienne",
		"lastname": "Reyes",
		"id": 17
	},
	{
		"firstname": "Mechelle",
		"lastname": "Downs",
		"id": 18
	},
	{
		"firstname": "Silas",
		"lastname": "Benjamin",
		"id": 19
	},
	{
		"firstname": "Shellie",
		"lastname": "Simpson",
		"id": 20
	},
	{
		"firstname": "Lester",
		"lastname": "Wright",
		"id": 21
	},
	{
		"firstname": "Wallace",
		"lastname": "Strong",
		"id": 22
	},
	{
		"firstname": "Wing",
		"lastname": "Drake",
		"id": 23
	},
	{
		"firstname": "Kareem",
		"lastname": "Wyatt",
		"id": 24
	},
	{
		"firstname": "Cruz",
		"lastname": "Benton",
		"id": 25
	},
	{
		"firstname": "Madison",
		"lastname": "Cabrera",
		"id": 26
	},
	{
		"firstname": "Indira",
		"lastname": "Wilcox",
		"id": 27
	},
	{
		"firstname": "Blair",
		"lastname": "Mcpherson",
		"id": 28
	},
	{
		"firstname": "Brittany",
		"lastname": "Elliott",
		"id": 29
	},
	{
		"firstname": "Noelani",
		"lastname": "Turner",
		"id": 30
	},
	{
		"firstname": "Thomas",
		"lastname": "Hartman",
		"id": 31
	},
	{
		"firstname": "Karly",
		"lastname": "Merrill",
		"id": 32
	},
	{
		"firstname": "Felix",
		"lastname": "Morris",
		"id": 33
	},
	{
		"firstname": "Hedda",
		"lastname": "Hughes",
		"id": 34
	},
	{
		"firstname": "Nicole",
		"lastname": "Miller",
		"id": 35
	},
	{
		"firstname": "Yvette",
		"lastname": "Pierce",
		"id": 36
	},
	{
		"firstname": "Rinah",
		"lastname": "Gutierrez",
		"id": 37
	},
	{
		"firstname": "Laura",
		"lastname": "Bowers",
		"id": 38
	},
	{
		"firstname": "Keaton",
		"lastname": "Mejia",
		"id": 39
	},
	{
		"firstname": "Duncan",
		"lastname": "Trujillo",
		"id": 40
	},
	{
		"firstname": "Raphael",
		"lastname": "Lyons",
		"id": 41
	},
	{
		"firstname": "Kermit",
		"lastname": "Rodgers",
		"id": 42
	},
	{
		"firstname": "Neil",
		"lastname": "Buck",
		"id": 43
	},
	{
		"firstname": "Jade",
		"lastname": "Vincent",
		"id": 44
	},
	{
		"firstname": "Quemby",
		"lastname": "Salinas",
		"id": 45
	},
	{
		"firstname": "Ivory",
		"lastname": "Shannon",
		"id": 46
	},
	{
		"firstname": "Cadman",
		"lastname": "Pace",
		"id": 47
	},
	{
		"firstname": "Randall",
		"lastname": "William",
		"id": 48
	},
	{
		"firstname": "Henry",
		"lastname": "Vazquez",
		"id": 49
	},
	{
		"firstname": "Mariko",
		"lastname": "Phelps",
		"id": 50
	},
	{
		"firstname": "Chaney",
		"lastname": "Ray",
		"id": 51
	},
	{
		"firstname": "Ayanna",
		"lastname": "Francis",
		"id": 52
	},
	{
		"firstname": "Bernard",
		"lastname": "Butler",
		"id": 53
	},
	{
		"firstname": "Jolene",
		"lastname": "Bowman",
		"id": 54
	},
	{
		"firstname": "Maggie",
		"lastname": "Knowles",
		"id": 55
	},
	{
		"firstname": "Shad",
		"lastname": "Trujillo",
		"id": 56
	},
	{
		"firstname": "Urielle",
		"lastname": "Goodman",
		"id": 57
	},
	{
		"firstname": "Fallon",
		"lastname": "Dejesus",
		"id": 58
	},
	{
		"firstname": "Dorian",
		"lastname": "Carson",
		"id": 59
	},
	{
		"firstname": "Lenore",
		"lastname": "Forbes",
		"id": 60
	},
	{
		"firstname": "Jesse",
		"lastname": "Hernandez",
		"id": 61
	},
	{
		"firstname": "Merrill",
		"lastname": "Ortiz",
		"id": 62
	},
	{
		"firstname": "Ciaran",
		"lastname": "Collins",
		"id": 63
	},
	{
		"firstname": "Lev",
		"lastname": "Tran",
		"id": 64
	},
	{
		"firstname": "Hannah",
		"lastname": "Marsh",
		"id": 65
	},
	{
		"firstname": "Maggie",
		"lastname": "Ramsey",
		"id": 66
	},
	{
		"firstname": "Keely",
		"lastname": "Mcguire",
		"id": 67
	},
	{
		"firstname": "Demetrius",
		"lastname": "Morrison",
		"id": 68
	},
	{
		"firstname": "Lewis",
		"lastname": "Harding",
		"id": 69
	},
	{
		"firstname": "Raymond",
		"lastname": "Frye",
		"id": 70
	},
	{
		"firstname": "Ivana",
		"lastname": "Williamson",
		"id": 71
	},
	{
		"firstname": "Leslie",
		"lastname": "Whitley",
		"id": 72
	},
	{
		"firstname": "Wayne",
		"lastname": "Bruce",
		"id": 73
	},
	{
		"firstname": "Randall",
		"lastname": "Gill",
		"id": 74
	},
	{
		"firstname": "Alfonso",
		"lastname": "Duke",
		"id": 75
	},
	{
		"firstname": "Seth",
		"lastname": "Robbins",
		"id": 76
	},
	{
		"firstname": "Perry",
		"lastname": "Berger",
		"id": 77
	},
	{
		"firstname": "Clarke",
		"lastname": "Owens",
		"id": 78
	},
	{
		"firstname": "Chancellor",
		"lastname": "Lloyd",
		"id": 79
	},
	{
		"firstname": "Jade",
		"lastname": "Conway",
		"id": 80
	},
	{
		"firstname": "Keegan",
		"lastname": "Melendez",
		"id": 81
	},
	{
		"firstname": "Alyssa",
		"lastname": "Colon",
		"id": 82
	},
	{
		"firstname": "Gemma",
		"lastname": "Rhodes",
		"id": 83
	},
	{
		"firstname": "Brandon",
		"lastname": "Page",
		"id": 84
	},
	{
		"firstname": "Doris",
		"lastname": "Petersen",
		"id": 85
	},
	{
		"firstname": "Robert",
		"lastname": "Knox",
		"id": 86
	},
	{
		"firstname": "Lev",
		"lastname": "Curtis",
		"id": 87
	},
	{
		"firstname": "Abigail",
		"lastname": "Hensley",
		"id": 88
	},
	{
		"firstname": "Hayden",
		"lastname": "Colon",
		"id": 89
	},
	{
		"firstname": "Dexter",
		"lastname": "Justice",
		"id": 90
	},
	{
		"firstname": "Karina",
		"lastname": "Quinn",
		"id": 91
	},
	{
		"firstname": "Dominic",
		"lastname": "Brown",
		"id": 92
	},
	{
		"firstname": "Germane",
		"lastname": "Sandoval",
		"id": 93
	},
	{
		"firstname": "Illana",
		"lastname": "Stuart",
		"id": 94
	},
	{
		"firstname": "Shelley",
		"lastname": "Allen",
		"id": 95
	},
	{
		"firstname": "Cairo",
		"lastname": "Ward",
		"id": 96
	},
	{
		"firstname": "Asher",
		"lastname": "Keller",
		"id": 97
	},
	{
		"firstname": "Olympia",
		"lastname": "Ochoa",
		"id": 98
	},
	{
		"firstname": "Cole",
		"lastname": "Parker",
		"id": 99
	},
	{
		"firstname": "Hadley",
		"lastname": "Franks",
		"id": 100
	}
	]
	}
}

	removeFromList = (id) => {
		let tempList = this.state.data.filter(item => item.id !== id)
		this.setState({
			data:tempList
		})
	}
  
  render() {
	  const styles = StyleSheet.create({
		  rowStyle: {
			  flexDirection:"row",
			  height:60
		  },
		  textStyle:{
			  fontSize:18,
			  color:"red"
		  },
		  buttonStyle:{
			  width:80,
			  height:50,
			  backgroundColor:"lightblue",
			  justifyContent:"center",
			  alignItems:"center",
			  marginLeft:10
		  }
	  })
	  return (
		<View style={styles.container}>
				<FlatList data={this.state.data}
							renderItem={
								({item}) => {
									return (
										<View style={styles.rowStyle}>
											<Text style={styles.textStyle}>
												Firstname:{item.firstname} Lastname:{item.lastname}
											</Text>
											<TouchableHighlight style={styles.buttonStyle}
												onPress={() => this.removeFromList(item.id)}>
												<Text>Remove</Text>
											</TouchableHighlight>
										</View>
									)
								}
							}
							keyExtractor={item => ""+item.id}
				/>
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
