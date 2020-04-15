import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  
  constructor(props) {
	  super(props);
	  this.state = {
		  list:[]
	  }
  }
  
  getContactList = () => {
	  let request = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"}
	  }
	  fetch("/api/contact",request).then(response => {
		if(response.ok) {
			response.json().then(data => {
				this.setState({
					list:data
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
		  headers:{"Content-Type":"application/json"},
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
  
  render() {
	  return (
		<div className="App">

		</div>
	  );
  }
}

export default App;
