

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    let data = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate("/login");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); 
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">
  AL-L@ZEEZ
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={toggleDropdown} aria-expanded={isDropdownOpen} aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isDropdownOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {localStorage.getItem("authToken") && (
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                            )}
                        </ul>

                        <div className="d-flex flex-column flex-lg-row align-items-lg-center">
                            {(!localStorage.getItem("authToken")) ? (
                                <>
                                
                                    <Link className="btn bg-white text-success mx-1 d-none d-lg-block" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1 d-none d-lg-block" to="/signup">Signup</Link>

                                   
                                    <Link className="nav-link text-white hover-link d-lg-none" to="/login">Login</Link>
                                    <Link className="nav-link text-white hover-link d-lg-none" to="/signup">Signup</Link>
                                </>
                            ) : (
                                <>
                                    <div className="btn bg-white text-success mx-2 d-none d-lg-block " onClick={() => { setCartView(true); }}>
                                    My Cart {" "}
                                        <Badge pill bg="danger">{data.length}</Badge>
                                    </div>
                                    {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}

                                    <div className="btn bg-white text-danger mx-1 d-none d-lg-block" onClick={handleLogout}>
                                        Logout
                                    </div>
                                    <Link className="nav-link fs-5 text-white hover-link d-lg-none" onClick={() => { setCartView(true); }}>
                    My Cart <Badge  pill bg="danger">{data.length}</Badge>
                                    </Link>
                                    <Link className="nav-link fs-5 text-white hover-link d-lg-none" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

