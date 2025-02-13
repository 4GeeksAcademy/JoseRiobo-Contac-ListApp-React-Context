import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/NewContact.css";
import { Context } from "../store/appContext";
import { useContext } from "react";


export const NewContact = () => {

    const { store, actions } = useContext(Context);

   
    const [inputValues, setInputValues] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const myApi = "https://playground.4geeks.com/contact/agendas/joseriobo";
    const myContactApi = "https://playground.4geeks.com/contact/agendas/joseriobo/contacts/";    
  

    const addNewContact = async () => {

        try {
            const response = await fetch('https://playground.4geeks.com/contact/agendas/joseriobo/contacts', {
                method: "POST",
                body: JSON.stringify(inputValues),
                headers: { "Content-Type": "application/json" }
            });

            actions.fetchContacts();
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    
    const handleChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <form className="contactAdding" onSubmit={addNewContact}>
                <div className="mb-3 ms-5 me-5">
                    <label htmlFor="contactFullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactFullName"
                        name="name"
                        placeholder="Enter Full Name"
                        value={inputValues.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3 ms-5 me-5">
                    <label htmlFor="contactEmail" className="form-label">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="contactEmail"
                        name="email"
                        placeholder="Enter Email Address"
                        value={inputValues.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3 ms-5 me-5">
                    <label htmlFor="contactPhone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactPhone"
                        name="phone"
                        placeholder="Enter Phone"
                        value={inputValues.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3 ms-5 me-5">
                    <label htmlFor="contactAddress" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactAddress"
                        name="address"
                        placeholder="Enter Address"
                        value={inputValues.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="addOrBackContact d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-success ms-5 ps-5 pe-5">Submit</button>
                    <Link to="/">
                        <button type="button" className="btn btn-danger me-5">Back To Contact List</button>
                    </Link>
                </div>
            </form>

        
        </>
    );
};
