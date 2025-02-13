import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const ContactCard = ({contactInfo}) =>{
    
    const{store, actions} = useContext(Context);

    const deleteContact = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/joseriobo/contacts/${contactInfo.id}`, {
                method: "DELETE"
            });
            actions.fetchContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };


    return(

        <>
        
        <div className="anotherContact d-flex ms-5 me-5 mb-2 gap-5 align-items-center position-relative">
            <div className="contactImage ms-5">
                <img className="customImage" src="https://static.wikia.nocookie.net/padredefamilia/images/c/c2/Peter_Griffin.png/revision/latest?cb=20220920160419&path-prefix=es" alt="Profile" />
            </div>

            <div className="contactDetails d-row">
                <h3 className="listContactName ms-3">{contactInfo.name}</h3>
                <p className="listContactAdress ms-2">📍{contactInfo.address}</p>
                <p className="listContactPhone ms-2">📱 {contactInfo.phone}</p>
                <p className="listContactEmail ms-2"> 📨{contactInfo.email}</p>
            </div>

            <div className="contactChanges position-absolute top-0 end-0 me-5 mt-3">
                <Link to={`/singlecontact/${contactInfo.id}`}>
                    <button type="button" className="btn me-5">✏️</button>
               </Link>
                <button type="button" className="deleteButton btn"onClick={deleteContact} >🗑️</button>
            </div>
        </div>
        
        </>

    )
}

