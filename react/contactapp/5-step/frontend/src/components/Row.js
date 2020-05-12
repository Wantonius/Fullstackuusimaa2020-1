import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class Row extends React.Component {

	remove = (event) => {
		this.props.handleRemove(event.target.name);
	}
	
	edit = (event) => {
		this.props.handleEdit(event.target.name);	
	}
	
	details = (event) => {
		this.props.details(event.target.name);
	}

	render() {
		return(
			<Table.Row>
				<Table.Cell>{this.props.contact.title}</Table.Cell>
				<Table.Cell>{this.props.contact.firstname}</Table.Cell>
				<Table.Cell>{this.props.contact.lastname}</Table.Cell>
				<Table.Cell>{this.props.contact.phone[0]}</Table.Cell>
				<Table.Cell>{this.props.contact.mobile[0]}</Table.Cell>
				<Table.Cell>{this.props.contact.email[0]}</Table.Cell>
				<Table.Cell><Button name={this.props.contact._id} onClick={this.remove}>Remove</Button></Table.Cell>
				<Table.Cell><Button name={this.props.contact._id} onClick={this.edit}>Edit</Button></Table.Cell>
				<Table.Cell><Button name={this.props.contact._id} onClick={this.details}>Details</Button></Table.Cell>
			</Table.Row>
		)
	}
}