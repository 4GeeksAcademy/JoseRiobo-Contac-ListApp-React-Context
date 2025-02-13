import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { MyContactList } from "./MyContactList.jsx";
import { ContactCard } from "../component/ContactCard.jsx";


export const Home = () => {
    const{store, actions}= useContext(Context)
   

    return (
        <>
          {store.ListOfContacts.map((contact)=> {
            return(
                  <ContactCard contactInfo={contact}/>
                 )})}
    

        </>
    );
};
