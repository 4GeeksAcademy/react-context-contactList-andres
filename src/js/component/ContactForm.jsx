import React, { useContext, useState, useRef, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ContactForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const { store, actions } = useContext(Context);
    const contactFormRef = useRef(null);

    const addContact = async () => {
        console.log("Adding contact from ContactForm");
        let result;

        if(Object.keys(store.selectedContact).length !== 0) {
            result = await actions.editContact({
                "full_name" : fullName,
                "email": email,
                "phone": phone,
                "address": address,
                "agenda_slug": store.currentAgendaSlug
            });
        } else {
            result = await actions.addContact({
                "full_name" : fullName,
                "email": email,
                "phone": phone,
                "address": address,
                "agenda_slug": store.currentAgendaSlug
            });
        }

        
        console.log(result);

        setStatusMsg( "Contacto agregado satisfactoriamente");

    }
    
    const handleCloseModal = () => {
        if (contactFormRef.current) {
            console.log("closing modal");
            setFullName('');
            setEmail('');
            setAddress('');
            setPhone('');
            window.$(contactFormRef.current).modal('hide');
            actions.getContactList();
        }
    }

    return (
        <div>

            <div className="modal" tabIndex="-1" role="dialog" id="contactFormModal" ref={contactFormRef}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add new Contact</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Full name:</label>
                            <input type="text" className="form-control" placeholder="Enter full name"
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                                <input type="email" className="form-control" placeholder="Enter email" 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" className="form-control" placeholder="Enter phone" 
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="address" className="form-control" placeholder="Enter address" 
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                        </div>
                    </div>
                    <div className="modal-footer d-flex flex-column">
                        <button type="button" className="btn btn-primary form-control" onClick={() => addContact()}>
                            Save changes
                        </button>
                        <Link to="/" onClick={() => handleCloseModal()}>Volver a inicio</Link>
                        <p>{statusMsg}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm;