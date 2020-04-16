import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class ContactList extends React.Component {
	
	remove = (event) => {
		this.props.removeContact(event.target.name);
	}
	
	render() {

		let contactitems = this.props.list.map(contact => 
			<Table.Row key={contact.id}>
				<Table.Cell>{contact.title}</Table.Cell>
				<Table.Cell>{contact.firstname}</Table.Cell>
				<Table.Cell>{contact.lastname}</Table.Cell>
				<Table.Cell>{contact.phone[0]}</Table.Cell>
				<Table.Cell>{contact.mobile[0]}</Table.Cell>
				<Table.Cell>{contact.email[0]}</Table.Cell>
				<Table.Cell><Button name={contact.id} onClick={this.remove}>Remove</Button></Table.Cell>
				<Table.Cell><Button name={contact.id} onClick={this.details}>Details</Button></Table.Cell>
			</Table.Row>
		)
		return(
			<Table celled>
				<Table.Header>
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.HeaderCell>Firstname</Table.HeaderCell>
					<Table.HeaderCell>Lastname</Table.HeaderCell>
					<Table.HeaderCell>Main Phone</Table.HeaderCell>
					<Table.HeaderCell>Main Mobile</Table.HeaderCell>
					<Table.HeaderCell>Main Email</Table.HeaderCell>
					<Table.HeaderCell>Remove</Table.HeaderCell>
					<Table.HeaderCell>Details</Table.HeaderCell>
				</Table.Header>
				<Table.Body>
				{contactitems}
				</Table.Body>
			</Table>
		)
		
	}
}