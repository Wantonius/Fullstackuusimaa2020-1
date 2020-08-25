import {Component} from '@angular/core';

@Component({
	selector:"contactlist",
	templateUrl:'./contactlist.component.html'
})
export class ContactList {
	list = [
	{
		"firstname": "Simon",
		"lastname": "Hancock"
	},
	{
		"firstname": "Nathan",
		"lastname": "Andrews"
	},
	{
		"firstname": "Leilani",
		"lastname": "Briggs"
	},
	{
		"firstname": "Chester",
		"lastname": "Cochran"
	},
	{
		"firstname": "Aristotle",
		"lastname": "Richmond"
	},
	{
		"firstname": "Jonas",
		"lastname": "Olson"
	},
	{
		"firstname": "Kirsten",
		"lastname": "Estes"
	},
	{
		"firstname": "Maryam",
		"lastname": "Lopez"
	},
	{
		"firstname": "Gillian",
		"lastname": "Alexander"
	},
	{
		"firstname": "Dai",
		"lastname": "Vazquez"
	},
	{
		"firstname": "Marcia",
		"lastname": "Farrell"
	},
	{
		"firstname": "Dexter",
		"lastname": "Boyle"
	},
	{
		"firstname": "Hector",
		"lastname": "Douglas"
	},
	{
		"firstname": "Yasir",
		"lastname": "Cooley"
	},
	{
		"firstname": "Brandon",
		"lastname": "Malone"
	},
	{
		"firstname": "Athena",
		"lastname": "Blackburn"
	},
	{
		"firstname": "Noelani",
		"lastname": "Gamble"
	},
	{
		"firstname": "Graham",
		"lastname": "Willis"
	},
	{
		"firstname": "Amir",
		"lastname": "Fisher"
	},
	{
		"firstname": "Gavin",
		"lastname": "Dickson"
	},
	{
		"firstname": "Amy",
		"lastname": "Levine"
	},
	{
		"firstname": "Cora",
		"lastname": "Andrews"
	},
	{
		"firstname": "Brenda",
		"lastname": "Carey"
	},
	{
		"firstname": "Dominic",
		"lastname": "Wallace"
	},
	{
		"firstname": "Alfreda",
		"lastname": "Gay"
	},
	{
		"firstname": "Wylie",
		"lastname": "Logan"
	},
	{
		"firstname": "Heather",
		"lastname": "Phillips"
	},
	{
		"firstname": "Todd",
		"lastname": "French"
	},
	{
		"firstname": "Josephine",
		"lastname": "Wilkerson"
	},
	{
		"firstname": "Dante",
		"lastname": "Cross"
	},
	{
		"firstname": "Silas",
		"lastname": "Compton"
	},
	{
		"firstname": "Marshall",
		"lastname": "Santos"
	},
	{
		"firstname": "Maya",
		"lastname": "Anderson"
	},
	{
		"firstname": "Brenda",
		"lastname": "Vega"
	},
	{
		"firstname": "Quamar",
		"lastname": "Maxwell"
	},
	{
		"firstname": "Tashya",
		"lastname": "Mann"
	},
	{
		"firstname": "Chase",
		"lastname": "Banks"
	},
	{
		"firstname": "Jena",
		"lastname": "Riggs"
	},
	{
		"firstname": "Ishmael",
		"lastname": "Mccall"
	},
	{
		"firstname": "Emerson",
		"lastname": "Alexander"
	},
	{
		"firstname": "Isadora",
		"lastname": "Vargas"
	},
	{
		"firstname": "Harlan",
		"lastname": "Hernandez"
	},
	{
		"firstname": "Cullen",
		"lastname": "Brooks"
	},
	{
		"firstname": "Bernard",
		"lastname": "Oneil"
	},
	{
		"firstname": "Elmo",
		"lastname": "Chandler"
	},
	{
		"firstname": "Anne",
		"lastname": "Lang"
	},
	{
		"firstname": "Jesse",
		"lastname": "Kelly"
	},
	{
		"firstname": "Allistair",
		"lastname": "Diaz"
	},
	{
		"firstname": "Kato",
		"lastname": "Baird"
	},
	{
		"firstname": "Daniel",
		"lastname": "Stokes"
	},
	{
		"firstname": "Patricia",
		"lastname": "Vasquez"
	},
	{
		"firstname": "Tatum",
		"lastname": "Martinez"
	},
	{
		"firstname": "Danielle",
		"lastname": "Shannon"
	},
	{
		"firstname": "Rylee",
		"lastname": "Gamble"
	},
	{
		"firstname": "Duncan",
		"lastname": "Atkins"
	},
	{
		"firstname": "Edward",
		"lastname": "Mueller"
	},
	{
		"firstname": "Hammett",
		"lastname": "Deleon"
	},
	{
		"firstname": "Neville",
		"lastname": "Stephens"
	},
	{
		"firstname": "Duncan",
		"lastname": "Oneill"
	},
	{
		"firstname": "Todd",
		"lastname": "Castaneda"
	},
	{
		"firstname": "Fulton",
		"lastname": "Joseph"
	},
	{
		"firstname": "Maryam",
		"lastname": "Glover"
	},
	{
		"firstname": "Graham",
		"lastname": "Rowe"
	},
	{
		"firstname": "Lydia",
		"lastname": "Molina"
	},
	{
		"firstname": "Demetria",
		"lastname": "Curtis"
	},
	{
		"firstname": "Emma",
		"lastname": "Bradley"
	},
	{
		"firstname": "Martha",
		"lastname": "Newman"
	},
	{
		"firstname": "Dexter",
		"lastname": "Baker"
	},
	{
		"firstname": "Laurel",
		"lastname": "Conway"
	},
	{
		"firstname": "Tana",
		"lastname": "Peterson"
	},
	{
		"firstname": "Basil",
		"lastname": "Maldonado"
	},
	{
		"firstname": "Indira",
		"lastname": "Barr"
	},
	{
		"firstname": "Addison",
		"lastname": "Frost"
	},
	{
		"firstname": "Kaseem",
		"lastname": "Fuentes"
	},
	{
		"firstname": "Margaret",
		"lastname": "Hayes"
	},
	{
		"firstname": "Alexa",
		"lastname": "Beasley"
	},
	{
		"firstname": "Kimberley",
		"lastname": "Kelly"
	},
	{
		"firstname": "Ciaran",
		"lastname": "Bryant"
	},
	{
		"firstname": "Jerry",
		"lastname": "Mcfarland"
	},
	{
		"firstname": "Sloane",
		"lastname": "Francis"
	},
	{
		"firstname": "Linus",
		"lastname": "Waters"
	},
	{
		"firstname": "Darius",
		"lastname": "Hood"
	},
	{
		"firstname": "Astra",
		"lastname": "Walton"
	},
	{
		"firstname": "Graham",
		"lastname": "Michael"
	},
	{
		"firstname": "Beck",
		"lastname": "Velez"
	},
	{
		"firstname": "Reed",
		"lastname": "William"
	},
	{
		"firstname": "Fletcher",
		"lastname": "Johnston"
	},
	{
		"firstname": "Naida",
		"lastname": "Sloan"
	},
	{
		"firstname": "Maris",
		"lastname": "Fernandez"
	},
	{
		"firstname": "Dieter",
		"lastname": "Tyson"
	},
	{
		"firstname": "Lois",
		"lastname": "Gilliam"
	},
	{
		"firstname": "Oliver",
		"lastname": "Trevino"
	},
	{
		"firstname": "Austin",
		"lastname": "Bonner"
	},
	{
		"firstname": "Alma",
		"lastname": "Park"
	},
	{
		"firstname": "Eric",
		"lastname": "Richard"
	},
	{
		"firstname": "Yuri",
		"lastname": "Webb"
	},
	{
		"firstname": "Hilary",
		"lastname": "Newton"
	},
	{
		"firstname": "Caldwell",
		"lastname": "Norman"
	},
	{
		"firstname": "Nasim",
		"lastname": "Duncan"
	},
	{
		"firstname": "Rinah",
		"lastname": "Paul"
	}
]
}