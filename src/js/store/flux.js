const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			ListOfContacts:[],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const NewContact = store.NewContact.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

			
				setStore({ NewContact: NewContact });
			}, 
		
			
			fetchContacts: async() =>{
				const response = await fetch("https://playground.4geeks.com/contact/agendas/joseriobo/contacts/")
				if (!response.ok){getActions().addMyAgenda()}
				const data = await response.json();
				setStore({ListOfContacts: data.contacts})
				console.log(data.contacts);	
			},
				addMyAgenda: async() => {
				const response = await fetch( "https://playground.4geeks.com/contact/agendas/joseriobo", { method: "POST" })
				
			},
				

		}
	};
};

export default getState;
