import React from "react";
import "../Header/Header.scss";
import logo from "../../Assets/Images/InStock-Logo.svg";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header__background">
            <img src={logo} className="header__img"></img>
            <div className="header__categories">
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending
                            ? "header__links"
                            : isActive
                            ? "header__links--active"
                            : "header__links"
                    }
                >
                    Warehouses
                </NavLink>
                <NavLink
                    to="/inventory"
                    className={({ isActive, isPending }) =>
                        isPending
                            ? "header__links"
                            : isActive
                            ? "header__links--active"
                            : "header__links"
                    }
                >
                    Inventory
                </NavLink>
            </div>
        </header>
    );
}

export default Header;
