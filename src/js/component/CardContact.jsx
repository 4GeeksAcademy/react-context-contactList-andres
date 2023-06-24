import React, { useContext } from "react";
import { Context } from "../store/appContext";

const CardContact = ({id, full_name, email, agenda_slug, address, phone}) => {
    const randomNum = Math.random();
    const imageUrl = `https://picsum.photos/180/180?random=${randomNum}`;
    const {store, actions} = useContext(Context);

    const openModal = (obj) => {
        console.log("id selected: " + obj['id']);
        let id = obj['id'];

        let contactSelected = store.agendaList.filter(item => item.id == id);
        actions.setSelectedContact(contactSelected);

		const modal = document.getElementById('contactFormModal');
		const bootstrapModal = new window.bootstrap.Modal(modal);
		bootstrapModal.show();
	};

    const deleteContact = async(obj) => {
        console.log("id selected: " + obj['id']);
        let id = obj['id'];

        let contactSelected = store.agendaList.filter(item => item.id == id);
        actions.setSelectedContact(contactSelected);
        try {
            result = await actions.deleteContact();
        } catch(error) {
            console.log("error: " + error);
        } finally {
            actions.getContactList();
        }
        
    }

    return(

        <div className="w-100">
            <div className="row border p-3">
                <div className="col-4">
                    <img className="rounded-circle" src={imageUrl} alt="image random" />
                </div>
                <div className="col-7 d-flex flex-column">
                    <div className="h3 font-weigth-bold">{full_name}</div>
                    <div className="h6 text-muted"><i className="fa-solid fa-envelope"></i>&nbsp;{email}</div>
                    <div className="h6 text-muted"><i className="fa-solid fa-location-dot"></i>&nbsp;{address}</div>
                    <div className="h6 text-muted"><i className="fa-solid fa-phone-flip"></i>&nbsp;{phone}</div>
                </div>
                <div className="col-1 d-flex mr-1 justify-content-between">
                    <i className="fa-solid fa-pen" onClick={() => openModal({id})}></i>
                    <i className="fa-solid fa-trash" onClick={() => deleteContact({id})}></i>
                </div>
            </div>
        </div>

    );

}

export default CardContact;