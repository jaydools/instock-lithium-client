import React from "react";
import "./InventoryItemDelete.scss";
import close from "../../Assets/Images/close-24px.svg";
import { Link } from "react-router-dom";

function InventoryItemDelete(/* maybe pass prop here "onClose" */) {
    return (
        <div className="delete-container">
            <div className="close">
                <Link to="/inventory-list" className="close__link">
                    <button className="close__button">
                        <img className="close__img" src={close} alt="Close" />
                    </button>
                </Link>
            </div>
            <div className="main">
                <div className="delete-item">
                    <h1 className="delete-item__title">Delete **Television** inventory item?</h1>
                    <p className="delete-item__body">
                        Please confirm that you’d like to delete **Television** from the inventory
                        list. You won’t be able to undo this action.
                    </p>
                </div>
                <div className="delete-button">
                    <Link to="/inventory-list" className="delete-button__link">
                        <button className="delete-button__cancel">Cancel</button>
                    </Link>
                    <Link to="/inventory-list" className="delete-button__link">
                        {/*  SEND DELETE REQUEST */}
                        <button className="delete-button__delete">Delete</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default InventoryItemDelete;
