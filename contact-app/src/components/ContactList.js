import react from "react";
import ContactCard from "./ContactCard";
import { Link } from 'react-router-dom'


const ContactList = (props) => {
	const deleteContactHandler = (id) => {
		props.getContactId(id);
	};
	const renderContactList = props.contacts.map((contact) => {
		return (
			<ContactCard
				contact={contact}
				getContactId={deleteContactHandler}
				key={contact.id}
			/>
		);
	});

	return (
		<div className="ui main">
			<h2>Contact List
			<Link to="/add" >
                <button className="ui button blue right floated"> Add Contact</button>
			</Link>

			</h2>
			<div className="ui celled list">{renderContactList}</div>
		</div>
		); 
};

export default ContactList;
