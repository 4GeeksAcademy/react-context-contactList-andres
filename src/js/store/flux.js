const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agendaList: [],
			currentAgendaSlug: "astrid",
			selectedContact: {},
			newContact: {
				full_name: '',
				email: '',
				phone: '',
				address: '',
				agenda_slug: ''
			},
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			//Get al contact from user
			getContactList: () => {
				const {currentAgendaSlug} = getStore();
				fetch(`https://assets.breatheco.de/apis/fake/contact/agenda/${currentAgendaSlug}`, {
				method: "GET",
				headers: {
					'Content-Type' : "application]/json"
				}
				})
				.then(res => {
					if(!res.ok) {
						throw new Error(res.statusText);
					}

					return res.json();
				})
				.then(data => {
					let store = getStore();
					store.agendaList = data;
					setStore(store);
				})
				.catch(error => console.log(error));
			},
			addContact: async (contact) => {
				console.log("contact received in flux: " + JSON.stringify(contact));

				fetch("https://assets.breatheco.de/apis/fake/contact/", {
				method: "POST",
				body: JSON.stringify(contact),
				headers: {
					'Content-Type' : "application/json"
				}
				})
				.then(res => {
					if(!res.ok) {
						throw new Error(res.statusText);
					}

					return res.json();
				})
				.then(data => {
					return data;
				})
				.catch(error => console.log(error));
			},
			editContact: async (contact) => {
				console.log("contact received in editcontact flux: " + JSON.stringify(contact));
				const {selectedContact} = getStore();
				console.log("STORE: " + JSON.stringify(selectedContact));

				fetch(`https://assets.breatheco.de/apis/fake/contact/${selectedContact[0].id}`, {
				method: "PUT",
				body: JSON.stringify(contact),
				headers: {
					'Content-Type' : "application/json"
				}
				})
				.then(res => {
					if(!res.ok) {
						throw new Error(res.statusText);
					}
					let store = getStore();
					setStore({...store, selectedContact: {}});
					return res.json();
				})
				.then(data => {
					return data;
				})
				.catch(error => console.log(error));
			},
			deleteContact: async () => {
				const {selectedContact} = getStore();
				console.log("STORE: " + JSON.stringify(selectedContact));

				fetch(`https://assets.breatheco.de/apis/fake/contact/${selectedContact[0].id}`, {
				method: "DELETE",
				headers: {
					'Content-Type' : "application/json"
				}
				}).then(res => {
					let store = getStore();
					setStore({...store, selectedContact: {}});
				})
				.catch(error => console.log(error));
			},
			setSelectedContact: (contact) => {
				const store = getStore();
				console.log("asignando contacto seleccionado: " + JSON.stringify(contact));
				setStore({...store, selectedContact: contact});
			},
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
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
