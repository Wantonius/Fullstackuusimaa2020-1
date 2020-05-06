import React from 'react';
import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {onLogout} from '../actions/loginActions';

class NavBar extends React.Component {

	logout = () => {
		this.props.dispatch(onLogout(this.props.token));
	}

	render() {
		let header = "Contact App";
		if(this.props.loading) {
			header = "Loading..."
		}
		if(this.props.error) {
			header = "Error:"+this.props.error
		}
		let style = {
			height:100,
			backgroundColor:"lightblue"
		}
		if(this.props.isLogged) {
			return( <div style={style}>
						<Header>{header}</Header>
						<List>
							<List.Item><Link to="/list">Contacts</Link></List.Item>
							<List.Item><Link to="/form">Add new contact</Link></List.Item>
							<List.Item><Link to="/" 
							onClick={this.logout}>Logout</Link></List.Item>
						</List>
					</div>
			)
		} else {
			return (<div style={style}>
						<Header>{header}</Header>
					</div>)
		}
		}

}

const mapStateToProps = (state) => {
	return {
		error:state.login.error,
		loading:state.login.loading,
		isLogged:state.login.isLogged,
		token:state.login.token
	}	
}

export default connect(mapStateToProps)(NavBar);