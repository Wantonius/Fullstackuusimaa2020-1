import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import {Switch,Route,Redirect} from 'react-router-dom';

class App extends React.Component {
  
  constructor(props) {
	  super(props);
	  this.state = {
		  list:[],
		  isLogged:false,
		  token:""
	  }
  }
  
  //Helpers
  
  loadFromStorage = () => {
	  if(sessionStorage.getItem("state")) {
		let state = JSON.parse(sessionStorage.getItem("state"));
		this.setState(state)
	  }
  }
  
  saveToStorage = () => {
	  sessionStorage.setItem("state",JSON.stringify(this.state));
  }
  
  componentDidMount() {
	  this.loadFromStorage();
  }
  
  //Login API
  
  onRegister = (user) => {
	  let request = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"},
		  body:JSON.stringify(user)
	  }
	  fetch("/register",request).then(response => {
		if(response.ok) {
			alert("Register success");
		} else {
			alert("Register failed. Is username already in use?");
		}
	  }).catch(error => {
		  console.log(error);
	  })
  }
  
  onLogin = (user) => {
	  let request = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"},
		  body:JSON.stringify(user)
	  }
	  fetch("/login",request).then(response => {
		if(response.ok) {
			response.json().then(data => {
				this.setState({
					token:data.token,
					isLogged:true
				}, () => {
					this.getContactList();
					this.saveToStorage();
				})
			}).catch(error => {
				console.log(error);
			})
		} else {
			console.log("Login, server responded with status:",response.status);
		}
	  }).catch(error => {
		  console.log(error);
	  })
  }
  
  onLogout = () => {
	  let request = {
		  method:"POST",
		  mode:"cors",
		  headers: {"Content-Type":"application/json",
					"token":this.state.token}
	  }
	  fetch("/logout",request).then(response => {
		  this.setState({
			  token:"",
			  isLogged:false,
			  list:[]
		  },() => {
			  this.saveToStorage();
		  })
	  }).catch(error => {
		  console.log(error);
		  this.setState({
			  token:"",
			  isLogged:false,
			  list:[]
		  },() => {
			  this.saveToStorage();
		  })		  
	  })
  }
  
  //Contact API
  
  getContactList = () => {
	  let request = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
					"token":this.state.token}
	  }
	  fetch("/api/contact",request).then(response => {
		if(response.ok) {
			response.json().then(data => {
				this.setState({
					list:data
				}, () => {
					this.saveToStorage();
				})
			}).catch(error => {
				console.log("Server responded with status:",response.status);
			})
		}
	  }).catch(error => {
		  console.log(error);
	  })
  }
  
  addContact = (contact) => {
	  let request = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
					"token":this.state.token},
		  body:JSON.stringify(contact)
	  }
	  fetch("/api/contact",request).then(response => {
		  if(response.ok) {
			  this.getContactList();
		  } else {
			  console.log("Server responded with status:",response.status);
		  }
	  }).catch(error => {
		  console.log(error);
	  })
  }
  
  removeContact = (id) => {
	  let request = {
		  method:"DELETE",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
					"token":this.state.token}
	  }
	  fetch("/api/contact/"+id,request).then(response => {
		  if(response.ok) {
			  this.getContactList();
		  } else {
			  console.log("Server responded with status:",response.status);
		  }
	  }).catch(error => {
		  console.log(error);
	  })
  }
  
  render() {
	  return (
		<div className="App">
			<NavBar isLogged={this.state.isLogged} onLogout={this.onLogout}/>
			<hr/>
			<Switch>
				<Route exact path="/" render={ () => (
					this.state.isLogged ? 
					(<Redirect to="/list"/>) :
					(<LoginForm onLogin={this.onLogin}
						onRegister={this.onRegister}/>)
				)}/>
				<Route path="/form" render={() => (
					this.state.isLogged ?
					(<ContactForm addContact={this.addContact}/>) :
					(<Redirect to="/"/>)
				)}/>
				<Route path="/list" render={() => (
					this.state.isLogged ?
					(<ContactList list={this.state.list} removeContact={this.removeContact}/>):
					(<Redirect to="/"/>)
				)}/>			
				<Route render={() => (
					this.state.isLogged ?
					(<Redirect to="/list"/>):
					(<Redirect to="/"/>)
				)}/>
			</Switch>
		</div>
	  );
  }
}

export default App;
