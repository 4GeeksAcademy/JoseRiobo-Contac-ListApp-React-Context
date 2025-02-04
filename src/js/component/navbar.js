import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 ms-5 mt-3 h1"></span>
			</Link>
			<div className="ml-auto">
				<Link to="/NewContact">
					<button className="btn btn-primary me-5 mt-3">Add New Contact</button>
				</Link>
			</div>
		</nav>
	);
};
