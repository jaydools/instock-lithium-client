import React from "react";
import "./WarehouseDelete.scss";
import close from "../../Assets/Images/close-24px.svg";
import { Link } from "react-router-dom";

function WarehouseDelete(/* maybe pass prop here "onClose" */) {
    return (
        <div className="delete-container">
            <div className="close">
                <Link to="/warehouses" className="close__link">
                    <button className="close__button">
                        <img className="close__img" src={close} alt="Close" />
                    </button>
                </Link>
            </div>
            <div className="main">
                <div className="delete-item">
                    <h1 className="delete-item__title">Delete **Television** inventory item?</h1>
                    <p className="delete-item__body">
                        Please confirm that you’d like to delete the **Washington** from the list of
                        **warehouses**. You won’t be able to undo this action.
                    </p>
                </div>
                <div className="delete-button">
                    <Link to="/warehouses" className="delete-button__link">
                        <button className="delete-button__cancel">Cancel</button>
                    </Link>
                    <Link to="/warehouses" className="delete-button__link">
                        {/*  SEND DELETE REQUEST */}
                        <button className="delete-button__delete">Delete</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WarehouseDelete;
