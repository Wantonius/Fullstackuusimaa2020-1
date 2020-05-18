import React from 'react';
import {Button,Table} from 'semantic-ui-react';

export default class RemoveRow extends React.Component {
	
	cancel = () => {
		this.props.cancel()
	}
	
	remove = (event) => {
		this.props.remove(event.target.name);
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
				<Table.Cell><Button 
							onClick={this.cancel}
							color="red">Cancel</Button></Table.Cell>
				<Table.Cell><Button name={this.props.contact._id} 
							onClick={this.remove}
							color="green">Confirm</Button></Table.Cell>
				<Table.Cell><Button name={this.props.contact._id} onClick={this.details}>Details</Button></Table.Cell>
			</Table.Row>
		)
	}

}