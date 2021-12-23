import React, { useState, useEffect } from "react";
import { uuid } from 'uuidv4';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Header from "./Header.js"
import AddContact from "./addContact.js"
import ContactList from "./ContactList.js"
import ContactDetail from "./ContactDetail";
import EditContact from "./editContact.js";
import api from "../api/contact.js";

function App() {
	const LOCAL_STORAGE_KEY = "contacts"
	const [contacts, setContacs] = useState([]);

	const addContactHandeler = async (contact) => {
		const req = {
			id: uuid(),
			...contact
		};
		await api.post("/contacts", req).then((res)=>{
			setContacs([...contacts, res.data]);
		});
		// setContacs([...contacts, response.data]); //his method
	}

	const updateContactHandeler = async (contact) => {
		const response  = await api.put(`/contacts/${contact.id}`, contact);
		const {id, name, email} = contact;
		setContacs(contacts.map((contact) => {
			return contact.id === id ? {...response.data} : contact;
			})
		);
	}
	//retriveContact
	const retrieveContact = async() => {
		const	response = await api.get("/contacts")
		return	response.data;
	}

	const removeContactHandler = async (id) => {
		await api.delete("/contacts/" + id);
		const newContactList = contacts.filter((contact) => {
			return contact.id !== id;
		});
		setContacs(newContactList);
	}

	useEffect(() => {
		//JSON LocalStorage
		// const retrivContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		// if (retrivContacts)
		// 	setContacs(retrivContacts);
		
		const getAllContacts = async () =>{
			const	allContacts = await retrieveContact();
			if (allContacts) setContacs(allContacts);
		};
		getAllContacts();
	}, []);

	useEffect(() => {
		//JSON LocalStorage
		// localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
		// console.log(contacts);
	}, [contacts]);

	return (
		<div className="ui container">
			<Router>
				<Header />
				{/* <Routes> */}
				<Switch>
					<Route path="/" exact
						render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler}/>)}/>
					<Route path="/add"
						render={(props) => (<AddContact {...props} addContactHandeler={addContactHandeler}/>)}/>
					<Route path="/edit"
						render={(props) => (<EditContact {...props} updateContactHandeler={updateContactHandeler}/>)}/>
					<Route path="/contact/:id"
						component={ContactDetail}/>
				</Switch>
				{/* </Routes> */}
			</Router>

		</div>
	);
}

export default App;
