import React from "react";
import "./InventoryItemDelete.scss";
import close from "../../Assets/Images/close-24px.svg";

function InventoryItemDelete() {
    return (
        <div className="delete-container">
            <div className="close">
                <img className="close__img" src={close} />
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
                    <button className="delete-button__cancel">Cancel</button>
                    <button className="delete-button__delete">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default InventoryItemDelete;
