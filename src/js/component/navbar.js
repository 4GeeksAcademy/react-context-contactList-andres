import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const openModal = () => {
		const modal = document.getElementById('contactFormModal');
		const bootstrapModal = new window.bootstrap.Modal(modal);
		bootstrapModal.show();
	};

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Contact Lis App</span>
			</Link>
			<div className="ml-auto">
				{/*<Link to="/demo">*/}
					<button className="btn btn-success" onClick={openModal}>Add new contact</button>
				{/*</Link>*/}
			</div>
		</nav>
	);
};
