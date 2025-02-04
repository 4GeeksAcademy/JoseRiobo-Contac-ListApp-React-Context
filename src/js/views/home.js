import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
    const [contacts, setContacts] = useState([]);
    const myApi = "https://playground.4geeks.com/contact/agendas/joseriobo/contacts/";

    useEffect(() => {
        fetchContacts();
    }, []);

    
    const fetchContacts = async () => {
        try {
            const response = await fetch(myApi);
            if (response.ok) {
                const data = await response.json();
                setContacts(data.contacts || []);
            } else {
                console.error("Failed to fetch contacts");
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

  
    const deleteContact = async (id) => {
        try {
            const response = await fetch(`${myApi}${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                console.log("Contact deleted successfully");
                setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id)); // Update UI instantly
            } else {
                console.error("Failed to delete contact");
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <>
            {contacts.length > 0 ? (
                contacts.map((contact) => (
                    <div key={contact.id} className="anotherContact d-flex ms-5 me-5 mb-2 gap-5 align-items-center position-relative">
                        <div className="contactImage ms-5">
                            <img className="customImage" src="https://static.wikia.nocookie.net/padredefamilia/images/c/c2/Peter_Griffin.png/revision/latest?cb=20220920160419&path-prefix=es" alt="Profile" />
                        </div>

                        <div className="contactDetails d-row">
                            <h3 className="listContactName ms-3">{contact.name}</h3>
                            <p className="listContactAdress ms-2">📍 {contact.address}</p>
                            <p className="listContactPhone ms-2">📱 {contact.phone}</p>
                            <p className="listContactEmail ms-2"> 📨 {contact.email}</p>
                        </div>

                        <div className="contactChanges position-absolute top-0 end-0 me-5 mt-3">
                            <Link to={`/singlecontact/${contact.id}`}>
                                <button type="button" className="btn me-5">✏️</button>
                            </Link>
                           
                            <button type="button" className="deleteButton btn" onClick={() => deleteContact(contact.id)}>🗑️</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center mt-5">No contacts available</p>
            )}
        </>
    );
};
