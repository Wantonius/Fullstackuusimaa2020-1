import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


class App extends React.Component {
  


  
  addContact = (contact) => {
	  let request = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
					"token":this.props.token},
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
					"token":this.props.token}
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
			<NavBar />
			<hr/>
			<Switch>
				<Route exact path="/" render={ () => (
					this.props.isLogged ? 
					(<Redirect to="/list"/>) :
					(<LoginForm />)
				)}/>
				<Route path="/form" render={() => (
					this.props.isLogged ?
					(<ContactForm />) :
					(<Redirect to="/"/>)
				)}/>
				<Route path="/list" render={() => (
					this.props.isLogged ?
					(<ContactList removeContact={this.removeContact}/>):
					(<Redirect to="/"/>)
				)}/>			
				<Route render={() => (
					this.props.isLogged ?
					(<Redirect to="/list"/>):
					(<Redirect to="/"/>)
				)}/>
			</Switch>
		</div>
	  );
  }
}

const mapStateToProps = (state) => {
	return {
		isLogged:state.login.isLogged,
		token:state.login.token
	}
}

export default withRouter(connect(mapStateToProps)(App));
