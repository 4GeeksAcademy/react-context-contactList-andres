import React,{useContext, useEffect} from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import CardContact from "../component/CardContact.jsx";
import { Context } from "../store/appContext";
import ContactForm from "../component/ContactForm.jsx";

const Home = () => {
	const { store, setStore, actions } = useContext(Context);

	useEffect( () => {
		getContactList();
	}, []);

	const getContactList = () => {
		actions.getContactList();
	}
	
	return(
		<div className="container">
			<div className="d-flex flex-column align-items-center">
				{
					store['agendaList'].map((item, index) => (
						<CardContact key={index} {...item} />
					))
				}
			</div>
			<ContactForm />
		</div>
	)
};

export default Home;