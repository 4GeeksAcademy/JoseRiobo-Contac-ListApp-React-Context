import React, { useState, useEffect, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SingleContact = () => {
   const{actions, store} = useContext(Context);
    const navigate = useNavigate()
    const [inputValues, setInputValues] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });
    console.log(store.ListOfContacts);
    
    const{id} = useParams();

    useEffect(() => {
        const contactToEdit = store.ListOfContacts.find(contact=> contact.id == id)
        setInputValues(contactToEdit)
    }, [id]);
    const validateInputs = (inputs)=> {
        if (Object.values(inputs).some(value=> !value || value.toString().trim() == "")){
            alert("All fields are required!")
            return false
        } return true
    }
    const editContact = async (e) => {
        console.log(e);
        
        e.preventDefault()
        if (!validateInputs(inputValues)) return ;
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/joseriobo/contacts/${id}`, {
                method: "PUT",
                body: JSON.stringify(inputValues),
                headers: { "Content-Type": "application/json" },
            });
            await actions.fetchContacts();
            navigate("/")
        } catch (error) {
            console.error("Error editing contact:", error);
        }
    };

    console.log(id)
    const handleChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };
    return (
           <>
                  <form className="contactEditing needs-validation" noValidate onSubmit={editContact}>
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
                              required
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
                              required
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
                              required
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
                              required
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