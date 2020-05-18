import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {removeContact,changeMode,getContacts} from '../actions/contactActions';
import Row from './Row'
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {withRouter} from 'react-router-dom';

class ContactList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			search:""
		}
	}
	
	onChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value;
		this.setState(state)
	}
	
	searchByLastname = (event) => {
		this.props.dispatch(getContacts(this.props.token,this.state.search));
		this.setState({
			search:""
		})
	}
	
	handleRemove = (id) => {
		for(let i=0;i<this.props.list.length;i++) {
			if(this.props.list[i]._id === id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				})
				return
			}
		}
	}
	
	handleEdit = (id) => {
		for(let i=0;i<this.props.list.length;i++) {
			if(this.props.list[i]._id === id) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				})
				return
			}
		}		
	}
	
	remove = (id) => {
		this.props.dispatch(removeContact(this.props.token,id));
	}
	
	edit = (contact) => {
		this.props.dispatch(changeMode("Edit",contact));
		this.props.history.push("/form");
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	render() {

		let contactitems = this.props.list.map((contact,index) => {
			if(this.state.editIndex === index) {
				return <EditRow key={contact._id} contact={contact}
						edit={this.edit}
						cancel={this.cancel}/>
			}
			if(this.state.removeIndex === index) {
				return <RemoveRow key={contact._id} contact={contact}
						remove={this.remove}
						cancel={this.cancel} />
			}
			return <Row key={contact._id} contact={contact} 
						handleRemove={this.handleRemove} 
						handleEdit={this.handleEdit} 
						details={this.details}/>
			}
		)
		return(
			<div>
				<label htmlFor="search">Search by lastname:</label>
				<input type="text"
						name="search"
						onChange={this.onChange}
						value={this.state.search}/>
				<Button style={{marginLeft:10}} onClick={this.searchByLastname}>Search</Button>
				<Table celled>
					<Table.Header>
						<Table.HeaderCell>Title</Table.HeaderCell>
						<Table.HeaderCell>Firstname</Table.HeaderCell>
						<Table.HeaderCell>Lastname</Table.HeaderCell>
						<Table.HeaderCell>Main Phone</Table.HeaderCell>
						<Table.HeaderCell>Main Mobile</Table.HeaderCell>
						<Table.HeaderCell>Main Email</Table.HeaderCell>
						<Table.HeaderCell>Remove</Table.HeaderCell>
						<Table.HeaderCell>Edit</Table.HeaderCell>
						<Table.HeaderCell>Details</Table.HeaderCell>
					</Table.Header>
					<Table.Body>
					{contactitems}
					</Table.Body>
				</Table>
			</div>
		)
		
	}
}


const mapStateToProps = (state) => {
	return {
		token:state.login.token,
		list:state.contact.list
	}
}

export default withRouter(connect(mapStateToProps)(ContactList))